export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_api_keys: {
        Row: {
          api_key: string
          created_at: string
          display_name: string
          enabled: boolean
          id: string
          model: string | null
          name: string
          provider: string
          requests_limit: number | null
          requests_used: number | null
          updated_at: string
        }
        Insert: {
          api_key: string
          created_at?: string
          display_name: string
          enabled?: boolean
          id?: string
          model?: string | null
          name: string
          provider: string
          requests_limit?: number | null
          requests_used?: number | null
          updated_at?: string
        }
        Update: {
          api_key?: string
          created_at?: string
          display_name?: string
          enabled?: boolean
          id?: string
          model?: string | null
          name?: string
          provider?: string
          requests_limit?: number | null
          requests_used?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string
          enabled: boolean
          id: string
          key_value: string
          name: string
          provider: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          id?: string
          key_value: string
          name: string
          provider: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          id?: string
          key_value?: string
          name?: string
          provider?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      deployments: {
        Row: {
          commit_hash: string | null
          created_at: string
          id: string
          project_id: string | null
          status: string
          updated_at: string
          url: string | null
        }
        Insert: {
          commit_hash?: string | null
          created_at?: string
          id?: string
          project_id?: string | null
          status?: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          commit_hash?: string | null
          created_at?: string
          id?: string
          project_id?: string | null
          status?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deployments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      github_tokens: {
        Row: {
          commits_count: number | null
          created_at: string
          enabled: boolean
          id: string
          last_commit: string | null
          name: string
          repo_name: string | null
          repo_url: string | null
          token: string
          updated_at: string
          username: string | null
        }
        Insert: {
          commits_count?: number | null
          created_at?: string
          enabled?: boolean
          id?: string
          last_commit?: string | null
          name: string
          repo_name?: string | null
          repo_url?: string | null
          token: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          commits_count?: number | null
          created_at?: string
          enabled?: boolean
          id?: string
          last_commit?: string | null
          name?: string
          repo_name?: string | null
          repo_url?: string | null
          token?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      netlify_api_keys: {
        Row: {
          api_key: string
          created_at: string
          deployments_count: number | null
          enabled: boolean
          id: string
          last_deployment: string | null
          name: string
          site_id: string | null
          site_name: string | null
          site_url: string | null
          updated_at: string
        }
        Insert: {
          api_key: string
          created_at?: string
          deployments_count?: number | null
          enabled?: boolean
          id?: string
          last_deployment?: string | null
          name: string
          site_id?: string | null
          site_name?: string | null
          site_url?: string | null
          updated_at?: string
        }
        Update: {
          api_key?: string
          created_at?: string
          deployments_count?: number | null
          enabled?: boolean
          id?: string
          last_deployment?: string | null
          name?: string
          site_id?: string | null
          site_name?: string | null
          site_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          channel_logo: string | null
          channel_name: string | null
          channel_url: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          status: string
          updated_at: string
          user_id: string
          website_url: string | null
        }
        Insert: {
          channel_logo?: string | null
          channel_name?: string | null
          channel_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
          user_id: string
          website_url?: string | null
        }
        Update: {
          channel_logo?: string | null
          channel_name?: string | null
          channel_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
          user_id?: string
          website_url?: string | null
        }
        Relationships: []
      }
      system_status: {
        Row: {
          error_message: string | null
          id: string
          last_checked: string
          response_time: number | null
          service: string
          status: boolean
        }
        Insert: {
          error_message?: string | null
          id?: string
          last_checked?: string
          response_time?: number | null
          service: string
          status?: boolean
        }
        Update: {
          error_message?: string | null
          id?: string
          last_checked?: string
          response_time?: number | null
          service?: string
          status?: boolean
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          session_token: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          session_token: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          session_token?: string
          user_id?: string
        }
        Relationships: []
      }
      youtube_api_keys: {
        Row: {
          api_key: string
          created_at: string
          enabled: boolean
          id: string
          name: string
          quota_limit: number | null
          quota_used: number | null
          updated_at: string
        }
        Insert: {
          api_key: string
          created_at?: string
          enabled?: boolean
          id?: string
          name: string
          quota_limit?: number | null
          quota_used?: number | null
          updated_at?: string
        }
        Update: {
          api_key?: string
          created_at?: string
          enabled?: boolean
          id?: string
          name?: string
          quota_limit?: number | null
          quota_used?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      execute_sql: {
        Args: { sql_query: string }
        Returns: Json
      }
      generate_unique_provider_name: {
        Args: { provider_type: string }
        Returns: string
      }
      update_system_status: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
