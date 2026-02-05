'use client'

import { Issue } from '@/types'
import { useStore } from '@/lib/store'
import { priorityConfig, formatDate, cn } from '@/lib/utils'
import { projects } from '@/lib/mock-data'

interface IssueRowProps {
  issue: Issue
}

export function IssueRow({ issue }: IssueRowProps) {
  const { selectedIssueId, setSelectedIssue } = useStore()
  const isSelected = selectedIssueId === issue.id
  const project = projects.find((p) => p.id === issue.projectId)
  const priority = priorityConfig[issue.priority]

  return (
    <div
      onClick={() => setSelectedIssue(issue.id)}
      className={cn(
        'issue-row group flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors',
        isSelected && 'bg-linear-bg-active'
      )}
    >
      {/* Priority indicator */}
      <button
        className="w-5 h-5 flex items-center justify-center text-xs hover:bg-linear-bg-active rounded"
        title={priority.label}
      >
        {priority.icon}
      </button>

      {/* Issue key */}
      <span className="text-2xs text-linear-text-tertiary font-mono w-16 shrink-0">
        {issue.key}
      </span>

      {/* Status dot */}
      <div className={`status-dot status-dot-${issue.status} shrink-0`} />

      {/* Title */}
      <span className="flex-1 text-sm truncate">{issue.title}</span>

      {/* Labels */}
      {issue.labels.length > 0 && (
        <div className="flex gap-1 shrink-0">
          {issue.labels.slice(0, 2).map((label) => (
            <span
              key={label.id}
              className="px-1.5 py-0.5 text-2xs rounded"
              style={{ backgroundColor: `${label.color}20`, color: label.color }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Project */}
      {project && (
        <span
          className="px-1.5 py-0.5 text-2xs rounded shrink-0"
          style={{ backgroundColor: `${project.color}20`, color: project.color }}
        >
          {project.key}
        </span>
      )}

      {/* Estimate */}
      {issue.estimate && (
        <span className="text-2xs text-linear-text-tertiary w-6 text-center shrink-0">
          {issue.estimate}
        </span>
      )}

      {/* Assignee */}
      <div className="w-6 h-6 shrink-0">
        {issue.assignee ? (
          <img
            src={issue.assignee.avatar}
            alt={issue.assignee.name}
            className="w-6 h-6 rounded-full"
            title={issue.assignee.name}
          />
        ) : (
          <div className="w-6 h-6 rounded-full border border-dashed border-linear-border flex items-center justify-center text-2xs text-linear-text-tertiary">
            +
          </div>
        )}
      </div>

      {/* Date */}
      <span className="text-2xs text-linear-text-tertiary w-16 text-right shrink-0">
        {formatDate(issue.updatedAt)}
      </span>
    </div>
  )
}
