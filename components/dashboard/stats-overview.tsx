import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FolderKanban, CheckCircle, Clock } from 'lucide-react'

const stats = [
  {
    title: 'Active Groups',
    value: '12',
    icon: Users,
    change: '+2 this month',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Ongoing Projects',
    value: '8',
    icon: FolderKanban,
    change: '+1 this week',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Completed Tasks',
    value: '142',
    icon: CheckCircle,
    change: '+24 today',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Pending Reviews',
    value: '6',
    icon: Clock,
    change: '-2 from yesterday',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
]

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
