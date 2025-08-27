'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="h-full">
        <h2 className="text-2xl font-semibold mb-4">Kanban Board</h2>
        {/* Board will go here in next step */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-gray-500">Board components will be added here...</p>
        </div>
      </div>
    </DashboardLayout>
  );
}