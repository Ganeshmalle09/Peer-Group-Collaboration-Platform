import DashboardSidebar from '@/components/dashboard/sidebar'
import CreateGroupForm from '@/components/groups/create-group-form'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function NewGroupPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth')
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create New Group</h1>
            <p className="text-muted-foreground mt-2">
              Start a new peer group for collaboration
            </p>
          </div>
          <CreateGroupForm />
        </div>
      </main>
    </div>
  )
}
