'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  FolderKanban,
  MessageSquare,
  BookOpen,
  Settings,
  Bell,
  Search,
  Plus,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Groups', href: '/dashboard/groups', icon: Users },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Resources', href: '/dashboard/resources', icon: BookOpen },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="flex flex-col w-64 h-screen bg-background border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold">PeerCollab</h1>
        <p className="text-sm text-muted-foreground">Collaborate & Achieve</p>
      </div>

      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <Link href="/dashboard/groups/new">
            <Button className="w-full" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-accent">
              <Avatar>
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
              <Bell className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
