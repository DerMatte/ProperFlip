import { createClient } from '@/utils/supabase/server'
import { Team, TeamMember, TeamWithMembers } from '@/types/supabase'

export async function createTeam(name: string, description?: string, userId?: string) {
  const supabase = await createClient()
  
  // Create the team
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .insert({ name, description })
    .select('*')
    .single()
  
  if (teamError) throw teamError
  
  // If userId is provided, add the user as an admin
  if (userId) {
    const { error: memberError } = await supabase
      .from('team_members')
      .insert({
        team_id: team.id,
        user_id: userId,
        role: 'admin',
      })
    
    if (memberError) throw memberError
  }
  
  return team
}

export async function getTeams(userId: string): Promise<Team[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('teams')
    .select(`
      *,
      team_members!inner(user_id)
    `)
    .eq('team_members.user_id', userId)
  
  if (error) throw error
  return data || []
}

export async function getTeamWithMembers(teamId: string): Promise<TeamWithMembers | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('teams')
    .select(`
      *,
      members:team_members(
        *,
        profile:profiles(*)
      )
    `)
    .eq('id', teamId)
    .single()
  
  if (error) throw error
  return data
}

export async function addTeamMember(teamId: string, userId: string, role: 'admin' | 'member' = 'member') {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('team_members')
    .insert({
      team_id: teamId,
      user_id: userId,
      role,
    })
    .select('*')
    .single()
  
  if (error) throw error
  return data
}

export async function removeTeamMember(teamId: string, userId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('team_id', teamId)
    .eq('user_id', userId)
  
  if (error) throw error
  return true
}

export async function updateTeamMemberRole(teamId: string, userId: string, role: 'admin' | 'member') {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('team_members')
    .update({ role })
    .eq('team_id', teamId)
    .eq('user_id', userId)
    .select('*')
    .single()
  
  if (error) throw error
  return data
}

export async function updateTeam(teamId: string, updates: Partial<Pick<Team, 'name' | 'description'>>) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('teams')
    .update(updates)
    .eq('id', teamId)
    .select('*')
    .single()
  
  if (error) throw error
  return data
}

export async function deleteTeam(teamId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('id', teamId)
  
  if (error) throw error
  return true
} 