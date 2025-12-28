import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, CheckCircle, UserPlus, FileText } from 'lucide-react'

const activities = [
  {
    id: 1,
    user: {
      name: 'Alex Johnson',
      avatar: 'AJ',
      color: 'bg-blue-500',
    },
    action: 'commented on',
    target: 'Project Roadmap',
    time: '2 hours ago',
    icon: MessageSquare,
    iconColor: 'text-blue-500',
  },
  {
    id: 2,
    user: {
      name: 'Sarah Miller',
      avatar: 'SM',
      color: 'bg-purple-500',
    },
    action: 'completed task',
    target: 'User Authentication',
    time: '4 hours ago',
    icon: CheckCircle,
    iconColor: 'text-green-500',
  },
  {
    id: 3,
    user: {
      name: 'Mike Chen',
      avatar: 'MC',
      color: 'bg-amber-500',
    },
    action: 'joined group',
    target: 'Web Dev Masters',
    time: 'Yesterday',
    icon: UserPlus,
    iconColor: 'text-amber-500',
  },
  {
    id: 4,
    user: {
      name: 'Emma Wilson',
      avatar: 'EW',
      color: 'bg-pink-500',
    },
    action: 'shared resource',
    target: 'Design System Guide',
    time: '2 days ago',
    icon: FileText,
    iconColor: 'text-pink-500',
  },
]

export default function RecentActivity() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <Avatar className={activity.user.color}>
                  <AvatarFallback className="text-white">
                    {activity.user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-muted-foreground">
                      {activity.action}
                    </span>
                    <span className="font-medium">{activity.target}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                    <span className="text-sm text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
                <Badge variant="outline">Group</Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
