'use client';

import React, { useEffect, useState } from 'react';
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import BoardColumn from './BoardColumn';
import TaskCard from './TaskCard';
import useTaskStore from '@/store/useTaskStore';
import { Task, TaskStatus } from '@/types';
import { getTasksByStatus } from '@/lib/utils';
import LoadingState from '@/components/ui/LoadingState';

const KanbanBoard = () => {
  const { 
    filteredTasks, 
    users, 
    updateTaskStatus, 
    reorderTasks,
    initializeTasks,
    isLoading,
    error
  } = useTaskStore();
  
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const statuses: TaskStatus[] = ['todo', 'inprogress', 'approved', 'reject'];

  useEffect(() => {
    initializeTasks();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const task = filteredTasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const overId = over.id as string;

    if (statuses.includes(overId as TaskStatus)) {
      await updateTaskStatus(taskId, overId as TaskStatus);
    } else {
      const activeTask = filteredTasks.find(t => t.id === taskId);
      const overTask = filteredTasks.find(t => t.id === overId);
      
      if (activeTask && overTask) {
        if (activeTask.status === overTask.status) {
          const columnTasks = getTasksByStatus(filteredTasks, activeTask.status);
          const activeIndex = columnTasks.findIndex(t => t.id === taskId);
          const overIndex = columnTasks.findIndex(t => t.id === overId);
          
          if (activeIndex !== overIndex) {
            const reorderedColumnTasks = arrayMove(columnTasks, activeIndex, overIndex);
            const updatedTasks = filteredTasks.map(task => {
              const reorderedTask = reorderedColumnTasks.find(t => t.id === task.id);
              return reorderedTask || task;
            });
            await reorderTasks(updatedTasks);
          }
        } else {
          await updateTaskStatus(taskId, overTask.status);
        }
      }
    }
    
    setActiveTask(null);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">⚠️ {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 px-2">
        {statuses.map((status) => (
          <BoardColumn
            key={status}
            status={status}
            tasks={getTasksByStatus(filteredTasks, status)}
            users={users}
          />
        ))}
      </div>
      
      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} users={users} />}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;