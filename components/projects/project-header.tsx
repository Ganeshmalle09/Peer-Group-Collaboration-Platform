'use client'

import { Button } from '@/components/ui/button'
import { Calendar, Users, Settings, Share2 } from 'lucide-react'

export default function ProjectHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">Website Redesign Project</h1>
          <p className="text-muted-foreground mt-2">
            Complete overhaul of the company website with modern design and improved UX
          </p>
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
          <span>Web Dev Masters</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Due December 15, 2024</span>
        </div>
        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          Active
        </div>
      </div>
    </div>
  )
}
