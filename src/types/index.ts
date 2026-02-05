export type IssueStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
export type IssuePriority = 'no_priority' | 'urgent' | 'high' | 'medium' | 'low'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Team {
  id: string
  name: string
  slug: string
  icon?: string
}

export interface Project {
  id: string
  teamId: string
  name: string
  key: string
  description?: string
  color: string
  icon?: string
}

export interface Label {
  id: string
  name: string
  color: string
}

export interface Cycle {
  id: string
  projectId: string
  name: string
  startsAt: string
  endsAt: string
  status: 'draft' | 'active' | 'completed'
}

export interface Issue {
  id: string
  projectId: string
  key: string
  title: string
  description?: string
  status: IssueStatus
  priority: IssuePriority
  assignee?: User
  reporter: User
  labels: Label[]
  cycle?: Cycle
  estimate?: number
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  issueId: string
  author: User
  content: string
  createdAt: string
}

export interface Activity {
  id: string
  issueId: string
  user: User
  action: string
  changes?: Record<string, { from: unknown; to: unknown }>
  createdAt: string
}

// View types
export type ViewType = 'list' | 'board' | 'timeline'
export type GroupBy = 'status' | 'priority' | 'assignee' | 'project' | 'none'

export interface Filter {
  status?: IssueStatus[]
  priority?: IssuePriority[]
  assignee?: string[]
  label?: string[]
  project?: string[]
}
