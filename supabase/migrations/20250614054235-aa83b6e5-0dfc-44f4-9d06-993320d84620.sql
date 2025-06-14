
-- Create API keys table for storing various service credentials
CREATE TABLE public.api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider TEXT NOT NULL, -- 'openai', 'groq', 'together', 'anthropic', 'google', 'github'
  name TEXT NOT NULL,
  key_value TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table for user projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  channel_url TEXT,
  channel_name TEXT,
  channel_logo TEXT,
  website_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'building', 'deployed', 'error'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create deployments table for tracking deployments
CREATE TABLE public.deployments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'building', 'deployed', 'failed'
  url TEXT,
  commit_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system_status table for real-time service monitoring
CREATE TABLE public.system_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service TEXT NOT NULL UNIQUE, -- 'youtube', 'openai', 'github', 'supabase'
  status BOOLEAN NOT NULL DEFAULT false,
  last_checked TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  error_message TEXT,
  response_time INTEGER -- in milliseconds
);

-- Create user_sessions table for tracking active sessions
CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create audit_logs table for developer portal logging
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT, -- 'api_key', 'project', 'deployment', 'user'
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for api_keys (admin only access)
CREATE POLICY "Admin can manage API keys" 
  ON public.api_keys 
  FOR ALL 
  USING (true); -- Will be restricted by application logic

-- Create RLS policies for projects (users can see their own)
CREATE POLICY "Users can view their own projects" 
  ON public.projects 
  FOR SELECT 
  USING (user_id::text = auth.jwt() ->> 'sub');

CREATE POLICY "Users can create their own projects" 
  ON public.projects 
  FOR INSERT 
  WITH CHECK (user_id::text = auth.jwt() ->> 'sub');

CREATE POLICY "Users can update their own projects" 
  ON public.projects 
  FOR UPDATE 
  USING (user_id::text = auth.jwt() ->> 'sub');

-- Create RLS policies for deployments
CREATE POLICY "Users can view deployments of their projects" 
  ON public.deployments 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = deployments.project_id 
      AND projects.user_id::text = auth.jwt() ->> 'sub'
    )
  );

-- Create RLS policies for system_status (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view system status" 
  ON public.system_status 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create RLS policies for user_sessions
CREATE POLICY "Users can view their own sessions" 
  ON public.user_sessions 
  FOR SELECT 
  USING (user_id::text = auth.jwt() ->> 'sub');

-- Create RLS policies for audit_logs (admin only)
CREATE POLICY "Admin can view audit logs" 
  ON public.audit_logs 
  FOR SELECT 
  USING (true); -- Will be restricted by application logic

-- Insert initial system status records
INSERT INTO public.system_status (service, status) VALUES 
  ('youtube', false),
  ('openai', false),
  ('github', false),
  ('supabase', true);

-- Enable realtime for system_status table
ALTER TABLE public.system_status REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.system_status;

-- Enable realtime for projects table
ALTER TABLE public.projects REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;

-- Create function to update system status based on API keys
CREATE OR REPLACE FUNCTION update_system_status()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update OpenAI status
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.api_keys WHERE provider = 'openai' AND enabled = true),
    last_checked = now()
  WHERE service = 'openai';
  
  -- Update GitHub status  
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.api_keys WHERE provider = 'github' AND enabled = true),
    last_checked = now()
  WHERE service = 'github';
  
  -- Update YouTube status
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.api_keys WHERE provider = 'youtube' AND enabled = true),
    last_checked = now()
  WHERE service = 'youtube';
  
  -- Supabase is always true since we're connected
  UPDATE public.system_status 
  SET 
    status = true,
    last_checked = now()
  WHERE service = 'supabase';
END;
$$;

-- Create trigger to update system status when API keys change
CREATE OR REPLACE FUNCTION trigger_update_system_status()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM update_system_status();
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER api_keys_status_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.api_keys
  FOR EACH ROW EXECUTE FUNCTION trigger_update_system_status();
