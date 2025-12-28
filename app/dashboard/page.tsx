import DashboardSidebar from '@/components/dashboard/sidebar'
import DashboardHeader from '@/components/dashboard/header'
import StatsOverview from '@/components/dashboard/stats-overview'
import RecentActivity from '@/components/dashboard/recent-activity'
import YourGroups from '@/components/dashboard/your-groups'
import ActiveProjects from '@/components/dashboard/active-projects'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth')
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <DashboardHeader />
        <StatsOverview />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <ActiveProjects />
            <RecentActivity />
          </div>
          <div>
            <YourGroups />
          </div>
        </div>
      </main>
    </div>
  )
}
