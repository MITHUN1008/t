
-- Create a function to execute SQL queries safely
CREATE OR REPLACE FUNCTION public.execute_sql(sql_query text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  -- Execute the query and return results as JSON
  EXECUTE 'SELECT array_to_json(array_agg(row_to_json(t))) FROM (' || sql_query || ') t' INTO result;
  RETURN COALESCE(result, '[]'::json);
EXCEPTION
  WHEN OTHERS THEN
    -- Return error information
    RETURN json_build_object('error', SQLERRM, 'code', SQLSTATE);
END;
$$;
