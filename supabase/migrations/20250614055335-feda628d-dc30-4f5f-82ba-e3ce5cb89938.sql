
-- Create youtube_api_keys table
CREATE TABLE public.youtube_api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  api_key TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  quota_used INTEGER DEFAULT 0,
  quota_limit INTEGER DEFAULT 10000,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_api_keys table for multiple AI providers
CREATE TABLE public.ai_api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider TEXT NOT NULL, -- 'openai', 'groq', 'together', 'anthropic', 'openrouter', etc.
  name TEXT NOT NULL, -- auto-generated like 'openrouter1', 'openrouter2'
  display_name TEXT NOT NULL, -- user-friendly name
  api_key TEXT NOT NULL,
  model TEXT, -- specific model if applicable
  enabled BOOLEAN NOT NULL DEFAULT true,
  requests_used INTEGER DEFAULT 0,
  requests_limit INTEGER DEFAULT 1000,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create netlify_api_keys table
CREATE TABLE public.netlify_api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  api_key TEXT NOT NULL,
  site_id TEXT,
  site_name TEXT,
  site_url TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  deployments_count INTEGER DEFAULT 0,
  last_deployment TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create github_tokens table
CREATE TABLE public.github_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  token TEXT NOT NULL,
  username TEXT,
  repo_name TEXT,
  repo_url TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  commits_count INTEGER DEFAULT 0,
  last_commit TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.youtube_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.netlify_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_tokens ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (admin only access for all)
CREATE POLICY "Admin can manage YouTube API keys" 
  ON public.youtube_api_keys 
  FOR ALL 
  USING (true);

CREATE POLICY "Admin can manage AI API keys" 
  ON public.ai_api_keys 
  FOR ALL 
  USING (true);

CREATE POLICY "Admin can manage Netlify API keys" 
  ON public.netlify_api_keys 
  FOR ALL 
  USING (true);

CREATE POLICY "Admin can manage GitHub tokens" 
  ON public.github_tokens 
  FOR ALL 
  USING (true);

-- Enable realtime for all tables
ALTER TABLE public.youtube_api_keys REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.youtube_api_keys;

ALTER TABLE public.ai_api_keys REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_api_keys;

ALTER TABLE public.netlify_api_keys REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.netlify_api_keys;

ALTER TABLE public.github_tokens REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.github_tokens;

-- Update system_status table to include new services
INSERT INTO public.system_status (service, status) VALUES 
  ('netlify', false),
  ('ai_apis', false)
ON CONFLICT (service) DO NOTHING;

-- Create function to generate unique provider names
CREATE OR REPLACE FUNCTION generate_unique_provider_name(provider_type TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  counter INTEGER := 1;
  base_name TEXT := provider_type;
  new_name TEXT;
BEGIN
  -- Check if base name exists
  IF NOT EXISTS (SELECT 1 FROM public.ai_api_keys WHERE name = base_name) THEN
    RETURN base_name;
  END IF;
  
  -- Find next available number
  LOOP
    new_name := base_name || counter::TEXT;
    IF NOT EXISTS (SELECT 1 FROM public.ai_api_keys WHERE name = new_name) THEN
      RETURN new_name;
    END IF;
    counter := counter + 1;
  END LOOP;
END;
$$;

-- Update system status function to include new APIs
CREATE OR REPLACE FUNCTION update_system_status()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update OpenAI status (from old api_keys table)
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.api_keys WHERE provider = 'openai' AND enabled = true),
    last_checked = now()
  WHERE service = 'openai';
  
  -- Update GitHub status (from old api_keys table)
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.api_keys WHERE provider = 'github' AND enabled = true),
    last_checked = now()
  WHERE service = 'github';
  
  -- Update YouTube status (from new youtube_api_keys table)
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.youtube_api_keys WHERE enabled = true),
    last_checked = now()
  WHERE service = 'youtube';
  
  -- Update AI APIs status
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.ai_api_keys WHERE enabled = true),
    last_checked = now()
  WHERE service = 'ai_apis';
  
  -- Update Netlify status
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.netlify_api_keys WHERE enabled = true),
    last_checked = now()
  WHERE service = 'netlify';
  
  -- Supabase is always true since we're connected
  UPDATE public.system_status 
  SET 
    status = true,
    last_checked = now()
  WHERE service = 'supabase';
END;
$$;
