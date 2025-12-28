'use client'

import { useState } from 'react'
import GroupCard from '@/components/groups/group-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Grid, List } from 'lucide-react'

const groups = [
  {
    id: '1',
    name: 'Web Dev Masters',
    description: 'A community of web developers sharing knowledge and building projects together.',
    memberCount: 245,
    maxMembers: 300,
    isPublic: true,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
  },
  {
    id: '2',
    name: 'Data Science Learners',
    description: 'Learn and apply data science concepts through collaborative projects.',
    memberCount: 180,
    maxMembers: 250,
    isPublic: true,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
  },
  {
    id: '3',
    name: 'Startup Founders',
    description: 'Exclusive group for startup founders to share experiences and advice.',
    memberCount: 50,
    maxMembers: 100,
    isPublic: false,
    coverImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600',
  },
  {
    id: '4',
    name: 'UI/UX Designers',
    description: 'Discuss design trends, share resources, and collaborate on design projects.',
    memberCount: 120,
    maxMembers: 200,
    isPublic: true,
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
  },
  {
    id: '5',
    name: 'Mobile Development',
    description: 'iOS and Android developers sharing knowledge and building apps together.',
    memberCount: 95,
    maxMembers: 150,
    isPublic: true,
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
  },
  {
    id: '6',
    name: 'AI & Machine Learning',
    description: 'Exploring artificial intelligence and machine learning technologies.',
    memberCount: 210,
    maxMembers: 300,
    isPublic: true,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
  },
]

export default function GroupsList() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(search.toLowerCase()) ||
    group.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search groups..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setViewMode('grid')}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setViewMode('list')}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard key={group.id} {...group} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500" />
              <div className="flex-1">
                <h3 className="font-semibold">{group.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {group.description}
                </p>
              </div>
              <div className="text-right">
                <div className="font-medium">{group.memberCount} members</div>
                <div className="text-sm text-muted-foreground">
                  {group.isPublic ? 'Public' : 'Private'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
