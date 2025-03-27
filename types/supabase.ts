export type Team = {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export type TeamMember = {
  id: string
  team_id: string
  user_id: string
  role: 'admin' | 'member'
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  first_name?: string
  last_name?: string
  phone_number?: string
  company_name?: string
  role?: string
  created_at: string
  updated_at: string
}

export type TeamWithMembers = Team & {
  members: (TeamMember & { profile: Profile })[]
} 