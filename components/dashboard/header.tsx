'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardHeader() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your groups and projects
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline">Invite Members</Button>
        <Button onClick={() => router.push('/dashboard/groups/new')}>
          <Plus className="h-4 w-4 mr-2" />
          New Group
        </Button>
      </div>
    </div>
  )
}
