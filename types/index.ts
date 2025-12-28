export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  skills: string[]
}

export interface Group {
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

export interface GroupMember {
  id: string
  group_id: string
  user_id: string
  role: 'admin' | 'moderator' | 'member'
  joined_at: string
}

export interface Project {
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

export interface Task {
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

export interface Message {
  id: string
  group_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
}
