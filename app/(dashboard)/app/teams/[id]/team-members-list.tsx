'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { TeamMember } from '@/types/supabase'

interface TeamMembersListProps {
  teamId: string
  members: (TeamMember & { profile: { first_name?: string; last_name?: string; email?: string } })[]
  currentUserId: string
  isAdmin: boolean
}

export default function TeamMembersList({ 
  teamId, 
  members, 
  currentUserId,
  isAdmin 
}: TeamMembersListProps) {
  const [isRemoving, setIsRemoving] = useState<string | null>(null)
  const [isChangingRole, setIsChangingRole] = useState<string | null>(null)
  const router = useRouter()
  
  const handleRemoveMember = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this member from the team?')) {
      return
    }
    
    setIsRemoving(userId)
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId)
        .eq('user_id', userId)
      
      if (error) throw error
      
      router.refresh()
    } catch (error) {
      console.error('Error removing team member:', error)
      alert('Failed to remove team member. Please try again.')
    } finally {
      setIsRemoving(null)
    }
  }
  
  const handleRoleChange = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'member' : 'admin'
    
    setIsChangingRole(userId)
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('team_members')
        .update({ role: newRole })
        .eq('team_id', teamId)
        .eq('user_id', userId)
      
      if (error) throw error
      
      router.refresh()
    } catch (error) {
      console.error('Error changing role:', error)
      alert('Failed to change role. Please try again.')
    } finally {
      setIsChangingRole(null)
    }
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            {isAdmin && (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => {
            const isCurrentUser = member.user_id === currentUserId
            const displayName = 
              member.profile.first_name && member.profile.last_name
                ? `${member.profile.first_name} ${member.profile.last_name}`
                : member.profile.email || 'Unknown user'
            
            return (
              <tr key={member.id} className={isCurrentUser ? 'bg-blue-50' : undefined}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {displayName} {isCurrentUser && '(You)'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    member.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {member.role}
                  </span>
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {!isCurrentUser && (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleRoleChange(member.user_id, member.role)}
                          disabled={isChangingRole === member.user_id}
                          className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50"
                        >
                          {isChangingRole === member.user_id 
                            ? 'Changing...' 
                            : member.role === 'admin' ? 'Make Member' : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => handleRemoveMember(member.user_id)}
                          disabled={isRemoving === member.user_id}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50 ml-4"
                        >
                          {isRemoving === member.user_id ? 'Removing...' : 'Remove'}
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
} 