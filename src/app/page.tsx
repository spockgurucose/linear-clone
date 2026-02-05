'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { IssueList } from '@/components/issues/IssueList'
import { IssueDetail } from '@/components/issues/IssueDetail'
import { CommandPalette } from '@/components/common/CommandPalette'
import { KanbanBoard } from '@/components/board/KanbanBoard'
import { useStore } from '@/lib/store'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

export default function Home() {
  const { viewType, issueDetailOpen, selectedIssueId } = useStore()
  useKeyboardShortcuts()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-auto">
            {viewType === 'list' ? <IssueList /> : <KanbanBoard />}
          </div>

          {issueDetailOpen && selectedIssueId && (
            <IssueDetail issueId={selectedIssueId} />
          )}
        </main>
      </div>

      <CommandPalette />
    </div>
  )
}
