import Link from 'next/link'
import { getTeams } from '@/utils/teams'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function TeamsList() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/sign-in")
  }
  
  const { data, error } = await supabase
  .from('teams')
  .select(`
    *,
    team_members!inner(user_id)
  `)
  .eq('team_members.user_id', user.id)

  if (error) {
    console.error("Error fetching teams:", error)
    throw new Error("Failed to fetch teams")
  }
  
  if (data.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">No teams yet</h3>
        <p className="text-gray-500 mb-4">Create your first team to start collaborating</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((team) => (
        <Link 
          key={team.id} 
          href={`/app/teams/${team.id}`}
          className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
          {team.description && (
            <p className="text-gray-600 mb-4">{team.description}</p>
          )}
          <div className="text-sm text-gray-500">
            Created {new Date(team.created_at).toLocaleDateString()}
          </div>
        </Link>
      ))}
    </div>
  )
} 