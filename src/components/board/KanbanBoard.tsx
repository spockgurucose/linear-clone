'use client'

import { useStore, useFilteredIssues } from '@/lib/store'
import { statusConfig, priorityConfig, cn } from '@/lib/utils'
import { IssueStatus, Issue } from '@/types'
import { projects } from '@/lib/mock-data'

const columns: IssueStatus[] = ['backlog', 'todo', 'in_progress', 'in_review', 'done']

export function KanbanBoard() {
  const { setSelectedIssue, updateIssueStatus } = useStore()
  const filteredIssues = useFilteredIssues()

  const handleDragStart = (e: React.DragEvent, issue: Issue) => {
    e.dataTransfer.setData('issueId', issue.id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, status: IssueStatus) => {
    e.preventDefault()
    const issueId = e.dataTransfer.getData('issueId')
    if (issueId) {
      updateIssueStatus(issueId, status)
    }
  }

  return (
    <div className="h-full flex gap-4 p-4 overflow-x-auto">
      {columns.map((status) => {
        const columnIssues = filteredIssues.filter((i) => i.status === status)
        const config = statusConfig[status]

        return (
          <div
            key={status}
            className="w-72 shrink-0 flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            {/* Column header */}
            <div className="flex items-center gap-2 mb-3 px-2">
              <div className={`status-dot status-dot-${status}`} />
              <span className="text-sm font-medium">{config.label}</span>
              <span className="text-2xs text-linear-text-tertiary bg-linear-bg-secondary px-1.5 py-0.5 rounded">
                {columnIssues.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex-1 space-y-2 overflow-y-auto">
              {columnIssues.map((issue) => (
                <KanbanCard
                  key={issue.id}
                  issue={issue}
                  onDragStart={handleDragStart}
                  onClick={() => setSelectedIssue(issue.id)}
                />
              ))}

              {/* Empty state / drop zone */}
              {columnIssues.length === 0 && (
                <div className="h-24 border-2 border-dashed border-linear-border rounded-lg flex items-center justify-center text-sm text-linear-text-tertiary">
                  Drop issues here
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface KanbanCardProps {
  issue: Issue
  onDragStart: (e: React.DragEvent, issue: Issue) => void
  onClick: () => void
}

function KanbanCard({ issue, onDragStart, onClick }: KanbanCardProps) {
  const project = projects.find((p) => p.id === issue.projectId)
  const priority = priorityConfig[issue.priority]

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, issue)}
      onClick={onClick}
      className="bg-linear-bg-secondary border border-linear-border rounded-lg p-3 cursor-pointer hover:border-linear-border-hover transition-colors"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xs font-mono text-linear-text-tertiary">{issue.key}</span>
        {project && (
          <span
            className="px-1 py-0.5 text-2xs rounded"
            style={{ backgroundColor: `${project.color}20`, color: project.color }}
          >
            {project.key}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-sm mb-3 line-clamp-2">{issue.title}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs" title={priority.label}>
            {priority.icon}
          </span>

          {issue.labels.slice(0, 1).map((label) => (
            <span
              key={label.id}
              className="px-1.5 py-0.5 text-2xs rounded"
              style={{ backgroundColor: `${label.color}20`, color: label.color }}
            >
              {label.name}
            </span>
          ))}

          {issue.estimate && (
            <span className="text-2xs text-linear-text-tertiary bg-linear-bg-active px-1.5 py-0.5 rounded">
              {issue.estimate}
            </span>
          )}
        </div>

        {issue.assignee && (
          <img
            src={issue.assignee.avatar}
            alt={issue.assignee.name}
            className="w-5 h-5 rounded-full"
            title={issue.assignee.name}
          />
        )}
      </div>
    </div>
  )
}
