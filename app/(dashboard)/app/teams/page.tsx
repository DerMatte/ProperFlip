import { Suspense } from 'react'
import TeamsList from './teams-list'
import CreateTeamButton from './create-team-button'

export default function TeamsPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Teams</h1>
        <CreateTeamButton />
      </div>
      <Suspense fallback={<div>Loading teams...</div>}>
        <TeamsList />
      </Suspense>
    </div>
  )
} 