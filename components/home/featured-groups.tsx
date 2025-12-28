import GroupCard from '@/components/groups/group-card'

const featuredGroups = [
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
]

export default function FeaturedGroups() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Groups
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thriving communities of like-minded peers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGroups.map((group) => (
            <GroupCard key={group.id} {...group} />
          ))}
        </div>
      </div>
    </div>
  )
}
