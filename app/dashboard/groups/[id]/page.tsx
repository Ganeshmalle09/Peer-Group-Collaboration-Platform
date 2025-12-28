import DashboardSidebar from '@/components/dashboard/sidebar'
import GroupHeader from '@/components/groups/group-header'
import ChatRoom from '@/components/chat/chat-room'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface GroupPageProps {
  params: Promise<{ id: string }>
}

export default async function GroupPage({ params }: GroupPageProps) {
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
        <GroupHeader groupId={id} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <ChatRoom groupId={id} />
          </div>
          <div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Group Members</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
