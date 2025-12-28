import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          skills: string[]
          created_at: string
          updated_at: string
        }
      }
      groups: {
        Row: {
          id: string
          name: string
          description: string | null
          cover_image: string | null
          is_public: boolean
          max_members: number | null
          created_by: string
          created_at: string
          updated_at: string
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: 'admin' | 'moderator' | 'member'
          joined_at: string
        }
      }
      projects: {
        Row: {
          id: string
          group_id: string
          name: string
          description: string | null
          status: 'planning' | 'active' | 'completed' | 'on_hold'
          due_date: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
      }
      tasks: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string | null
          status: 'todo' | 'in_progress' | 'review' | 'done'
          priority: 'low' | 'medium' | 'high'
          assigned_to: string | null
          due_date: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
      }
      resources: {
        Row: {
          id: string
          group_id: string
          title: string
          description: string | null
          url: string
          type: 'link' | 'document' | 'video' | 'other'
          created_by: string
          created_at: string
        }
      }
      messages: {
        Row: {
          id: string
          group_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
