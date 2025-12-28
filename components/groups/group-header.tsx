'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Users, Calendar, Settings, Share2 } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface GroupHeaderProps {
  groupId: string
}

interface Group {
  id: string
  name: string
  description: string | null
  created_at: string
}

export default function GroupHeader({ groupId }: GroupHeaderProps) {
  const [group, setGroup] = useState<Group | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchGroup()
  }, [groupId])

  const fetchGroup = async () => {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', groupId)
      .single()

    if (!error && data) {
      setGroup(data)
    }
    setLoading(false)
  }

  if (loading || !group) {
    return <div>Loading...</div>
  }

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">{group.name}</h1>
          <p className="text-muted-foreground mt-2">{group.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>12 members</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Created {new Date(group.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}
