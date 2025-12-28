import DashboardSidebar from '@/components/dashboard/sidebar'
import ProjectKanban from '@/components/projects/project-kanban'
import ProjectHeader from '@/components/projects/project-header'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth')
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <ProjectHeader projectId={id} />
        <ProjectKanban />
      </main>
    </div>
  )
}
