
-- First, let's add triggers to automatically update system status when API keys change

-- Create triggers for ai_api_keys table
CREATE OR REPLACE TRIGGER trigger_ai_api_keys_status_update
  AFTER INSERT OR UPDATE OR DELETE ON public.ai_api_keys
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.trigger_update_system_status();

-- Create triggers for youtube_api_keys table  
CREATE OR REPLACE TRIGGER trigger_youtube_api_keys_status_update
  AFTER INSERT OR UPDATE OR DELETE ON public.youtube_api_keys
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.trigger_update_system_status();

-- Create triggers for netlify_api_keys table
CREATE OR REPLACE TRIGGER trigger_netlify_api_keys_status_update
  AFTER INSERT OR UPDATE OR DELETE ON public.netlify_api_keys
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.trigger_update_system_status();

-- Create triggers for github_tokens table
CREATE OR REPLACE TRIGGER trigger_github_tokens_status_update
  AFTER INSERT OR UPDATE OR DELETE ON public.github_tokens
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.trigger_update_system_status();

-- Create triggers for api_keys table (legacy)
CREATE OR REPLACE TRIGGER trigger_api_keys_status_update
  AFTER INSERT OR UPDATE OR DELETE ON public.api_keys
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.trigger_update_system_status();

-- Update the system_status function to properly handle the new table structures
CREATE OR REPLACE FUNCTION public.update_system_status()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update OpenAI status (from ai_api_keys table for OpenAI provider)
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.ai_api_keys WHERE provider = 'openai' AND enabled = true),
    last_checked = now()
  WHERE service = 'openai';
  
  -- Update GitHub status (from github_tokens table)
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.github_tokens WHERE enabled = true),
    last_checked = now()
  WHERE service = 'github';
  
  -- Update YouTube status (from youtube_api_keys table)
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.youtube_api_keys WHERE enabled = true),
    last_checked = now()
  WHERE service = 'youtube';
  
  -- Update AI APIs status (from ai_api_keys table)
  UPDATE public.system_status 
  SET 
    status = EXISTS(SELECT 1 FROM public.ai_api_keys WHERE enabled = true),
    last_checked = now()
  WHERE service = 'ai_apis';
  
  -- Update Netlify status (from netlify_api_keys table)
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
  
  -- Insert missing services if they don't exist
  INSERT INTO public.system_status (service, status, last_checked)
  VALUES 
    ('openai', EXISTS(SELECT 1 FROM public.ai_api_keys WHERE provider = 'openai' AND enabled = true), now()),
    ('github', EXISTS(SELECT 1 FROM public.github_tokens WHERE enabled = true), now()),
    ('youtube', EXISTS(SELECT 1 FROM public.youtube_api_keys WHERE enabled = true), now()),
    ('ai_apis', EXISTS(SELECT 1 FROM public.ai_api_keys WHERE enabled = true), now()),
    ('netlify', EXISTS(SELECT 1 FROM public.netlify_api_keys WHERE enabled = true), now()),
    ('supabase', true, now())
  ON CONFLICT (service) DO NOTHING;
END;
$$;

-- Run the function once to initialize the status
SELECT public.update_system_status();
