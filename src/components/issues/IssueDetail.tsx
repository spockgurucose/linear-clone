'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { statusConfig, priorityConfig, formatDate } from '@/lib/utils'
import { projects, users } from '@/lib/mock-data'
import { IssueStatus, IssuePriority } from '@/types'

interface IssueDetailProps {
  issueId: string
}

export function IssueDetail({ issueId }: IssueDetailProps) {
  const { issues, setIssueDetailOpen, updateIssue } = useStore()
  const issue = issues.find((i) => i.id === issueId)
  const [description, setDescription] = useState(issue?.description || '')

  if (!issue) return null

  const project = projects.find((p) => p.id === issue.projectId)

  const handleStatusChange = (status: IssueStatus) => {
    updateIssue(issue.id, { status })
  }

  const handlePriorityChange = (priority: IssuePriority) => {
    updateIssue(issue.id, { priority })
  }

  const handleAssigneeChange = (userId: string | null) => {
    const assignee = userId ? users.find((u) => u.id === userId) : undefined
    updateIssue(issue.id, { assignee })
  }

  return (
    <div className="w-[500px] border-l border-linear-border bg-linear-bg flex flex-col overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-linear-border">
        <div className="flex items-center gap-2">
          {project && (
            <span
              className="px-1.5 py-0.5 text-2xs rounded"
              style={{ backgroundColor: `${project.color}20`, color: project.color }}
            >
              {project.key}
            </span>
          )}
          <span className="text-sm font-mono text-linear-text-secondary">{issue.key}</span>
        </div>
        <button
          onClick={() => setIssueDetailOpen(false)}
          className="p-1 hover:bg-linear-bg-hover rounded transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Title */}
          <h2 className="text-lg font-medium mb-4">{issue.title}</h2>

          {/* Properties grid */}
          <div className="grid grid-cols-[100px_1fr] gap-y-3 text-sm mb-6">
            {/* Status */}
            <span className="text-linear-text-secondary">Status</span>
            <select
              value={issue.status}
              onChange={(e) => handleStatusChange(e.target.value as IssueStatus)}
              className="bg-linear-bg-secondary border border-linear-border rounded px-2 py-1 text-sm"
            >
              {Object.entries(statusConfig).map(([value, config]) => (
                <option key={value} value={value}>
                  {config.label}
                </option>
              ))}
            </select>

            {/* Priority */}
            <span className="text-linear-text-secondary">Priority</span>
            <select
              value={issue.priority}
              onChange={(e) => handlePriorityChange(e.target.value as IssuePriority)}
              className="bg-linear-bg-secondary border border-linear-border rounded px-2 py-1 text-sm"
            >
              {Object.entries(priorityConfig).map(([value, config]) => (
                <option key={value} value={value}>
                  {config.icon} {config.label}
                </option>
              ))}
            </select>

            {/* Assignee */}
            <span className="text-linear-text-secondary">Assignee</span>
            <select
              value={issue.assignee?.id || ''}
              onChange={(e) => handleAssigneeChange(e.target.value || null)}
              className="bg-linear-bg-secondary border border-linear-border rounded px-2 py-1 text-sm"
            >
              <option value="">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {/* Estimate */}
            <span className="text-linear-text-secondary">Estimate</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 5, 8, 13].map((points) => (
                <button
                  key={points}
                  onClick={() => updateIssue(issue.id, { estimate: points })}
                  className={`w-7 h-7 text-xs rounded ${
                    issue.estimate === points
                      ? 'bg-linear-accent text-white'
                      : 'bg-linear-bg-secondary border border-linear-border hover:border-linear-border-hover'
                  }`}
                >
                  {points}
                </button>
              ))}
            </div>

            {/* Labels */}
            <span className="text-linear-text-secondary">Labels</span>
            <div className="flex flex-wrap gap-1">
              {issue.labels.map((label) => (
                <span
                  key={label.id}
                  className="px-2 py-0.5 text-xs rounded"
                  style={{ backgroundColor: `${label.color}20`, color: label.color }}
                >
                  {label.name}
                </span>
              ))}
              <button className="px-2 py-0.5 text-xs text-linear-text-tertiary hover:text-linear-text border border-dashed border-linear-border rounded">
                + Add
              </button>
            </div>

            {/* Reporter */}
            <span className="text-linear-text-secondary">Reporter</span>
            <div className="flex items-center gap-2">
              <img
                src={issue.reporter.avatar}
                alt={issue.reporter.name}
                className="w-5 h-5 rounded-full"
              />
              <span>{issue.reporter.name}</span>
            </div>

            {/* Created */}
            <span className="text-linear-text-secondary">Created</span>
            <span className="text-linear-text-secondary">{formatDate(issue.createdAt)}</span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm text-linear-text-secondary mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => updateIssue(issue.id, { description })}
              placeholder="Add a description..."
              className="w-full h-32 px-3 py-2 bg-linear-bg-secondary border border-linear-border rounded-md text-sm resize-none focus:border-linear-accent"
            />
          </div>

          {/* Activity */}
          <div>
            <h3 className="text-sm font-medium mb-3">Activity</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <img
                  src={issue.reporter.avatar}
                  alt={issue.reporter.name}
                  className="w-6 h-6 rounded-full mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{issue.reporter.name}</span>
                    <span className="text-2xs text-linear-text-tertiary">
                      {formatDate(issue.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-linear-text-secondary">Created this issue</p>
                </div>
              </div>
            </div>

            {/* Comment input */}
            <div className="mt-4">
              <textarea
                placeholder="Leave a comment..."
                className="w-full h-20 px-3 py-2 bg-linear-bg-secondary border border-linear-border rounded-md text-sm resize-none focus:border-linear-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
