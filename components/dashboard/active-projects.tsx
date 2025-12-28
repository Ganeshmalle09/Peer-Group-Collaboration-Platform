import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, Flag } from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    group: 'Web Dev Masters',
    progress: 75,
    dueDate: 'Dec 15, 2024',
    status: 'active',
    members: 5,
  },
  {
    id: 2,
    name: 'Mobile App MVP',
    group: 'Startup Founders',
    progress: 40,
    dueDate: 'Jan 30, 2025',
    status: 'planning',
    members: 3,
  },
  {
    id: 3,
    name: 'Data Dashboard',
    group: 'Data Science',
    progress: 90,
    dueDate: 'Nov 30, 2024',
    status: 'active',
    members: 4,
  },
  {
    id: 4,
    name: 'Marketing Campaign',
    group: 'Growth Hackers',
    progress: 25,
    dueDate: 'Feb 15, 2025',
    status: 'on_hold',
    members: 6,
  },
]

export default function ActiveProjects() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'planning':
        return 'bg-blue-500'
      case 'on_hold':
        return 'bg-amber-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="block p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.group}
                  </p>
                </div>
                <Badge
                  className={`${getStatusColor(
                    project.status
                  )} text-white capitalize`}
                >
                  {project.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{project.members} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due {project.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flag className="h-4 w-4 text-muted-foreground" />
                    <span>{project.progress}%</span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
