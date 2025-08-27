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

const KanbanBoard = () => {
  const { 
    filteredTasks, 
    users, 
    updateTaskStatus, 
    reorderTasks, 
    initializeTasks 
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
  }, [initializeTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = filteredTasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id as string;
    const overId = over.id as string;

    // Check if dropped on a column
    if (statuses.includes(overId as TaskStatus)) {
      updateTaskStatus(taskId, overId as TaskStatus);
    } else {
      // Dropped on another task - reorder within the same column
      const activeTask = filteredTasks.find(t => t.id === taskId);
      const overTask = filteredTasks.find(t => t.id === overId);
      
      if (activeTask && overTask && activeTask.status === overTask.status) {
        const columnTasks = getTasksByStatus(filteredTasks, activeTask.status);
        const activeIndex = columnTasks.findIndex(t => t.id === taskId);
        const overIndex = columnTasks.findIndex(t => t.id === overId);
        
        if (activeIndex !== overIndex) {
          const reorderedColumnTasks = arrayMove(columnTasks, activeIndex, overIndex);
          
          // Merge reordered tasks back into the full task list
          const updatedTasks = filteredTasks.map(task => {
            const reorderedTask = reorderedColumnTasks.find(t => t.id === task.id);
            return reorderedTask || task;
          });
          
          reorderTasks(updatedTasks);
        }
      } else if (activeTask && overTask) {
        // Dropped on a task in a different column
        updateTaskStatus(taskId, overTask.status);
      }
    }
    
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-4">
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