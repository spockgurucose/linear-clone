'use client'

import { useStore, useFilteredIssues } from '@/lib/store'
import { IssueRow } from './IssueRow'
import { statusConfig } from '@/lib/utils'
import { IssueStatus } from '@/types'

const statusOrder: IssueStatus[] = ['backlog', 'todo', 'in_progress', 'in_review', 'done', 'cancelled']

export function IssueList() {
  const { groupBy } = useStore()
  const filteredIssues = useFilteredIssues()

  if (groupBy === 'status') {
    return (
      <div className="p-4">
        {statusOrder.map((status) => {
          const statusIssues = filteredIssues.filter((i) => i.status === status)
          if (statusIssues.length === 0) return null

          return (
            <div key={status} className="mb-6">
              <div className="flex items-center gap-2 mb-2 px-2">
                <div className={`status-dot status-dot-${status}`} />
                <span className="text-sm font-medium">{statusConfig[status].label}</span>
                <span className="text-2xs text-linear-text-tertiary">{statusIssues.length}</span>
              </div>
              <div className="space-y-0.5">
                {statusIssues.map((issue) => (
                  <IssueRow key={issue.id} issue={issue} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Flat list view
  return (
    <div className="p-4">
      <div className="space-y-0.5">
        {filteredIssues.map((issue) => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  )
}
