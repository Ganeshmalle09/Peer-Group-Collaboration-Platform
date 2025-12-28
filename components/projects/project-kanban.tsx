'use client'

import { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Design homepage', description: 'Create mockups' },
      { id: '2', title: 'Setup database', description: 'Configure schemas' },
    ],
  },
  in_progress: {
    id: 'in_progress',
    title: 'In Progress',
    tasks: [
      { id: '3', title: 'Implement auth', description: 'Add login flow' },
    ],
  },
  review: {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: '4', title: 'API documentation', description: 'Write docs' },
    ],
  },
  done: {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '5', title: 'Initial setup', description: 'Project bootstrap' },
    ],
  },
}

export default function ProjectKanban() {
  const [columns, setColumns] = useState(initialColumns)
  const [newTask, setNewTask] = useState('')

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const sourceColumn = columns[source.droppableId as keyof typeof columns]
    const destColumn = columns[destination.droppableId as keyof typeof columns]
    const task = sourceColumn.tasks.find(t => t.id === draggableId)

    if (!task) return

    if (source.droppableId === destination.droppableId) {
      const newTasks = Array.from(sourceColumn.tasks)
      newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, task)

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: newTasks,
        },
      })
    } else {
      const sourceTasks = Array.from(sourceColumn.tasks)
      sourceTasks.splice(source.index, 1)
      const destTasks = Array.from(destColumn.tasks)
      destTasks.splice(destination.index, 0, task)

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks,
        },
      })
    }
  }

  const addTask = (columnId: string) => {
    if (!newTask.trim()) return

    const column = columns[columnId as keyof typeof columns]
    const newTaskObj = {
      id: Date.now().toString(),
      title: newTask,
      description: '',
    }

    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        tasks: [...column.tasks, newTaskObj],
      },
    })
    setNewTask('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Tasks</h2>
        <div className="flex gap-3">
          <Input
            placeholder="Add new task..."
            className="w-64"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={() => addTask('todo')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{column.title}</h3>
                <span className="text-sm text-muted-foreground">
                  {column.tasks.length} tasks
                </span>
              </div>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3 min-h-[200px] p-2 rounded-lg bg-muted/50"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="cursor-move"
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{task.title}</h4>
                                  {task.description && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {task.description}
                                    </p>
                                  )}
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Assign</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
