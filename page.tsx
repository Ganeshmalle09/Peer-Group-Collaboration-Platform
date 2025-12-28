import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import HeroSection from '@/components/home/hero-section'
import FeaturedGroups from '@/components/home/featured-groups'
import HowItWorks from '@/components/home/how-it-works'

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <FeaturedGroups />
    </div>
  )
}
