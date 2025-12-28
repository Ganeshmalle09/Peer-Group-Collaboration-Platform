'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CreateGroupForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    isPublic: true,
    maxMembers: '',
  })
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: group, error } = await supabase
        .from('groups')
        .insert({
          name: form.name,
          description: form.description,
          is_public: form.isPublic,
          max_members: form.maxMembers ? parseInt(form.maxMembers) : null,
          created_by: user.id,
        })
        .select()
        .single()

      if (error) throw error

      await supabase.from('group_members').insert({
        group_id: group.id,
        user_id: user.id,
        role: 'admin',
      })

      toast.success('Group created successfully!')
      router.push(`/dashboard/groups/${group.id}`)
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Group Name *</Label>
          <Input
            id="name"
            placeholder="e.g., React Developers"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="What is this group about? What will members do here?"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxMembers">Maximum Members (optional)</Label>
            <Input
              id="maxMembers"
              type="number"
              placeholder="Leave empty for unlimited"
              value={form.maxMembers}
              onChange={(e) => setForm({ ...form, maxMembers: e.target.value })}
              min="2"
              max="1000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="isPublic">Group Type</Label>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">
                  {form.isPublic ? 'Public Group' : 'Private Group'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {form.isPublic
                    ? 'Anyone can find and join'
                    : 'Invite only'}
                </div>
              </div>
              <Switch
                checked={form.isPublic}
                onCheckedChange={(checked) =>
                  setForm({ ...form, isPublic: checked })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Group'}
        </Button>
      </div>
    </form>
  )
}
