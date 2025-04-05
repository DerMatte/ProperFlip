import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getTeamWithMembers } from '@/utils/teams'
import { createClient } from '@/utils/supabase/server'
import TeamMembersList from './team-members-list'
import InviteMemberButton from './invite-member-button'

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p>You need to be signed in to view team details</p>
        </div>
      </div>
    )
  }
  
  const team = await getTeamWithMembers((await params).id)
  
  if (!team) {
    notFound()
  }
  
  // Check if current user is a member of this team
  const userIsTeamMember = team.members.some(member => member.user_id === user.id)
  
  if (!userIsTeamMember) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <p className="text-red-700">You do not have access to this team</p>
        </div>
      </div>
    )
  }
  
  const userIsAdmin = team.members.some(
    member => member.user_id === user.id && member.role === 'admin'
  )
  
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
        {team.description && (
          <p className="text-gray-600">{team.description}</p>
        )}
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Team Members</h2>
          {userIsAdmin && <InviteMemberButton teamId={team.id} />}
        </div>
        
        <Suspense fallback={<div>Loading team members...</div>}>
          <TeamMembersList 
            teamId={team.id} 
            members={team.members} 
            currentUserId={user.id}
            isAdmin={userIsAdmin}
          />
        </Suspense>
      </div>
    </div>
  )
} 