// Generated with: Supabase MCP `generate_typescript_types` (project bpobzcipxjlolkbcovgi).
// Regenerate after schema changes instead of editing by hand.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.18'
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          height_cm: number | null
          id: string
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          height_cm?: number | null
          id: string
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          height_cm?: number | null
          id?: string
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      workout_schemas: {
        Row: {
          badge: string
          callout_kind: string
          callout_text: string
          code: string
          created_at: string
          day_label: string
          day_of_week: number
          duration: string
          exercises: Json
          id: string
          sort_order: number
          subtitle: string
          updated_at: string
          user_id: string
        }
        Insert: {
          badge: string
          callout_kind: string
          callout_text: string
          code: string
          created_at?: string
          day_label: string
          day_of_week: number
          duration: string
          exercises?: Json
          id?: string
          sort_order?: number
          subtitle: string
          updated_at?: string
          user_id: string
        }
        Update: {
          badge?: string
          callout_kind?: string
          callout_text?: string
          code?: string
          created_at?: string
          day_label?: string
          day_of_week?: number
          duration?: string
          exercises?: Json
          id?: string
          sort_order?: number
          subtitle?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export const Constants = {
  public: {
    Enums: {},
  },
} as const
