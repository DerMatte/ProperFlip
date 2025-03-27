'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

interface InviteMemberButtonProps {
  teamId: string
}

export default function InviteMemberButton({ teamId }: InviteMemberButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isInviting, setIsInviting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    
    setIsInviting(true)
    setError('')
    
    try {
      const supabase = createClient()
      
      // First find if user exists
      const { data: existingUser, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.trim().toLowerCase())
        .single()
      
      if (userError && userError.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
        throw userError
      }
      
      if (!existingUser) {
        setError('This user is not registered in the system')
        return
      }
      
      // Check if already a member
      const { data: existingMember, error: memberCheckError } = await supabase
        .from('team_members')
        .select('id')
        .eq('team_id', teamId)
        .eq('user_id', existingUser.id)
        .single()
      
      if (memberCheckError && memberCheckError.code !== 'PGRST116') {
        throw memberCheckError
      }
      
      if (existingMember) {
        setError('This user is already a member of this team')
        return
      }
      
      // Add user to team
      const { error: addError } = await supabase
        .from('team_members')
        .insert({
          team_id: teamId,
          user_id: existingUser.id,
          role: 'member'
        })
      
      if (addError) throw addError
      
      setIsOpen(false)
      setEmail('')
      router.refresh()
    } catch (error: any) {
      console.error('Error inviting user:', error)
      setError(error.message || 'Failed to invite user. Please try again.')
    } finally {
      setIsInviting(false)
    }
  }
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Invite Member
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Invite Team Member</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="user-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              {error && (
                <div className="mb-4 p-2 bg-red-50 text-red-700 text-sm rounded">
                  {error}
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  disabled={isInviting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={isInviting}
                >
                  {isInviting ? 'Inviting...' : 'Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
} 