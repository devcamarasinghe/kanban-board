'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import KanbanBoard from '@/components/board/KanbanBoard';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="h-full">
        <KanbanBoard />
      </div>
    </DashboardLayout>
  );
}