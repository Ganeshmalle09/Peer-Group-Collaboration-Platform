'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, Lock, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface GroupCardProps {
  id: string
  name: string
  description: string
  memberCount: number
  maxMembers?: number
  isPublic: boolean
  coverImage?: string
}

export default function GroupCard({
  id,
  name,
  description,
  memberCount,
  maxMembers,
  isPublic,
  coverImage,
}: GroupCardProps) {
  const router = useRouter()

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg relative">
          {coverImage && (
            <img
              src={coverImage}
              alt={name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}
          <div className="absolute top-3 right-3">
            <div className="bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
              {isPublic ? (
                <>
                  <Globe className="h-3 w-3" />
                  <span className="text-xs">Public</span>
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3" />
                  <span className="text-xs">Private</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {memberCount}
              {maxMembers && ` / ${maxMembers}`} members
            </span>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <Avatar key={i} className="border-2 border-background">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => router.push(`/dashboard/groups/${id}`)}
        >
          Enter Group
        </Button>
      </CardFooter>
    </Card>
  )
}
