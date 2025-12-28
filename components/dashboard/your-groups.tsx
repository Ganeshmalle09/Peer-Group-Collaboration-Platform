import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ChevronRight, Users } from 'lucide-react'
import Link from 'next/link'

const groups = [
  {
    id: 1,
    name: 'Web Dev Masters',
    memberCount: 12,
    progress: 75,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Startup Founders',
    memberCount: 8,
    progress: 40,
    color: 'bg-purple-500',
  },
  {
    id: 3,
    name: 'Design Thinkers',
    memberCount: 15,
    progress: 90,
    color: 'bg-green-500',
  },
  {
    id: 4,
    name: 'Data Science',
    memberCount: 10,
    progress: 60,
    color: 'bg-amber-500',
  },
]

export default function YourGroups() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Groups</CardTitle>
        <Link href="/dashboard/groups">
          <Button variant="ghost" size="sm">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className={group.color}>
                  <AvatarFallback className="text-white">
                    {group.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{group.name}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-3 w-3 mr-1" />
                    {group.memberCount} members
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{group.progress}%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
