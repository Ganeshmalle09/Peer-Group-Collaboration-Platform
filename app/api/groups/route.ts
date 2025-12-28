import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: groups, error } = await supabase
      .from('groups')
      .select(`
        *,
        group_members(count),
        profiles!groups_created_by_fkey(full_name, avatar_url)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(groups)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    const { data: group, error } = await supabase
      .from('groups')
      .insert({
        ...body,
        created_by: session.user.id,
      })
      .select()
      .single()

    if (error) throw error

    await supabase.from('group_members').insert({
      group_id: group.id,
      user_id: session.user.id,
      role: 'admin',
    })

    return NextResponse.json(group)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
