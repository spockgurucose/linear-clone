import { clsx, type ClassValue } from 'clsx'
import { IssueStatus, IssuePriority } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const statusConfig: Record<IssueStatus, { label: string; color: string; bgColor: string }> = {
  backlog: { label: 'Backlog', color: 'text-linear-text-tertiary', bgColor: 'bg-linear-bg-hover' },
  todo: { label: 'Todo', color: 'text-linear-text-secondary', bgColor: 'bg-linear-bg-active' },
  in_progress: { label: 'In Progress', color: 'text-linear-yellow', bgColor: 'bg-yellow-500/10' },
  in_review: { label: 'In Review', color: 'text-linear-blue', bgColor: 'bg-blue-500/10' },
  done: { label: 'Done', color: 'text-linear-green', bgColor: 'bg-green-500/10' },
  cancelled: { label: 'Cancelled', color: 'text-linear-text-tertiary', bgColor: 'bg-linear-bg-hover' },
}

export const priorityConfig: Record<IssuePriority, { label: string; color: string; icon: string }> = {
  no_priority: { label: 'No priority', color: 'text-linear-text-tertiary', icon: '⊘' },
  urgent: { label: 'Urgent', color: 'text-linear-red', icon: '🔴' },
  high: { label: 'High', color: 'text-linear-orange', icon: '🟠' },
  medium: { label: 'Medium', color: 'text-linear-yellow', icon: '🟡' },
  low: { label: 'Low', color: 'text-linear-green', icon: '🟢' },
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function groupIssues<T extends { [key: string]: unknown }>(
  issues: T[],
  key: keyof T
): Map<string, T[]> {
  const groups = new Map<string, T[]>()

  for (const issue of issues) {
    const value = String(issue[key] ?? 'none')
    const existing = groups.get(value) || []
    groups.set(value, [...existing, issue])
  }

  return groups
}
