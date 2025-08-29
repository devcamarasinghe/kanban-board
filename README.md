# Kanban Board Dashboard

A modern, responsive Kanban board application built with Next.js and TypeScript, featuring drag-and-drop functionality for task management.

## 🚀 Live Demo

[https://kanban-board-one-rho.vercel.app/](https://kanban-board-one-rho.vercel.app/)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Drag & Drop:** @dnd-kit
- **Deployment:** Vercel

## ✨ Features

- **Drag and Drop:** Seamlessly move tasks between different status columns
- **Four Swimlanes:** To Do, In Progress, Approved, and Reject
- **Real-time Search:** Filter tasks dynamically as you type
- **Data Persistence:** All changes are saved to localStorage
- **Mock API Integration:** Simulates real API calls with loading states
- **Responsive Design:** Works perfectly on tablets and desktops (768px+)
- **Task Management:** Update task status by dragging between columns

## 📦 Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/devcamarasinghe/kanban-board.git
cd kanban-board
```
2. **Install dependencies:**
```bash
npm install
```
3. **Run the development server:**
```bash
npm run dev
```
4. **Open your browser:**
Navigate to http://localhost:3000

```
src/
├── app/                 # Next.js app router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── board/         # Kanban board components
│   │   ├── KanbanBoard.tsx
│   │   ├── BoardColumn.tsx
│   │   └── TaskCard.tsx
│   ├── layout/        # Layout components
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   └── ui/            # Reusable UI components
│       └── Icons.tsx
├── services/          # API services
│   ├── api.ts        # Mock API implementation
│   └── index.ts      # Service exports
├── store/            # State management
│   └── useTaskStore.ts # Zustand store
├── types/            # TypeScript definitions
│   └── index.ts      # Type interfaces
├── data/             # Mock data
│   └── mockData.json # Sample tasks and users
└── lib/              # Utility functions
    └── utils.ts      # Helper functions
```

## Key Features Explained

### Drag and Drop
- Powered by @dnd-kit for smooth, accessible drag-and-drop
- Visual feedback during dragging
- Tasks can be moved between any columns

### State Management
- Centralized state using Zustand
- Optimistic updates for better UX
- Automatic localStorage synchronization

### Mock API
- Simulates real API behavior with delays
- Loading states while fetching data
- Error handling and retry logic

### Search Functionality
- Real-time filtering as you type
- Searches through task titles and descriptions
- Maintains search state during interactions
