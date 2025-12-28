import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete website overhaul with modern design',
    group: 'Web Dev Masters',
    status: 'active',
    tasks: 24,
    completed: 18,
    dueDate: '2024-12-15',
  },
  {
    id: 2,
    name: 'Mobile App MVP',
    description: 'Minimum viable product for mobile application',
    group: 'Startup Founders',
    status: 'planning',
    tasks: 15,
    completed: 3,
    dueDate: '2025-01-30',
  },
  {
    id: 3,
    name: 'Data Dashboard',
    description: 'Analytics dashboard for business metrics',
    group: 'Data Science',
    status: 'active',
    tasks: 32,
    completed: 28,
    dueDate: '2024-11-30',
  },
  {
    id: 4,
    name: 'Marketing Campaign',
    description: 'Q1 marketing campaign launch',
    group: 'Growth Hackers',
    status: 'on_hold',
    tasks: 20,
    completed: 5,
    dueDate: '2025-02-15',
  },
]

export default function ProjectsList() {
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search projects..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/dashboard/projects/${project.id}`}
            className="block"
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>{project.name}</CardTitle>
                  <Badge
                    className={`${getStatusColor(
                      project.status
                    )} text-white capitalize`}
                  >
                    {project.status.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <div className="font-medium">{project.group}</div>
                    <div className="text-muted-foreground">
                      Due {new Date(project.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {project.completed}/{project.tasks} tasks
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${(project.completed / project.tasks) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
