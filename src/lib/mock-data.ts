import { User, Team, Project, Issue, Label, Cycle } from '@/types'

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Chen',
  email: 'alex@company.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
}

export const users: User[] = [
  currentUser,
  { id: 'user-2', name: 'Sarah Kim', email: 'sarah@company.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
  { id: 'user-3', name: 'Mike Johnson', email: 'mike@company.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike' },
  { id: 'user-4', name: 'Emily Davis', email: 'emily@company.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily' },
]

export const teams: Team[] = [
  { id: 'team-1', name: 'Engineering', slug: 'eng', icon: '⚙️' },
  { id: 'team-2', name: 'Design', slug: 'design', icon: '🎨' },
]

export const projects: Project[] = [
  { id: 'proj-1', teamId: 'team-1', name: 'Frontend', key: 'FE', color: '#5E6AD2', icon: '🖥️' },
  { id: 'proj-2', teamId: 'team-1', name: 'Backend', key: 'BE', color: '#22C55E', icon: '⚡' },
  { id: 'proj-3', teamId: 'team-1', name: 'Infrastructure', key: 'INF', color: '#F97316', icon: '🏗️' },
  { id: 'proj-4', teamId: 'team-2', name: 'Design System', key: 'DS', color: '#8B5CF6', icon: '🎨' },
]

export const labels: Label[] = [
  { id: 'label-1', name: 'Bug', color: '#EF4444' },
  { id: 'label-2', name: 'Feature', color: '#22C55E' },
  { id: 'label-3', name: 'Enhancement', color: '#3B82F6' },
  { id: 'label-4', name: 'Documentation', color: '#8B5CF6' },
  { id: 'label-5', name: 'Tech Debt', color: '#F97316' },
]

export const cycles: Cycle[] = [
  { id: 'cycle-1', projectId: 'proj-1', name: 'Sprint 24', startsAt: '2024-02-01', endsAt: '2024-02-14', status: 'active' },
  { id: 'cycle-2', projectId: 'proj-1', name: 'Sprint 25', startsAt: '2024-02-15', endsAt: '2024-02-28', status: 'draft' },
]

export const issues: Issue[] = [
  {
    id: 'issue-1',
    projectId: 'proj-1',
    key: 'FE-101',
    title: 'Implement command palette with keyboard shortcuts',
    description: 'Add a command palette (Cmd+K) for quick navigation and actions',
    status: 'in_progress',
    priority: 'high',
    assignee: users[0],
    reporter: users[1],
    labels: [labels[1]],
    cycle: cycles[0],
    estimate: 5,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-03T14:30:00Z',
  },
  {
    id: 'issue-2',
    projectId: 'proj-1',
    key: 'FE-102',
    title: 'Fix sidebar collapse animation jank',
    description: 'The sidebar has a slight stutter when collapsing on slower devices',
    status: 'todo',
    priority: 'medium',
    assignee: users[2],
    reporter: users[0],
    labels: [labels[0]],
    estimate: 2,
    createdAt: '2024-02-02T09:00:00Z',
    updatedAt: '2024-02-02T09:00:00Z',
  },
  {
    id: 'issue-3',
    projectId: 'proj-1',
    key: 'FE-103',
    title: 'Add dark mode toggle',
    description: 'Allow users to switch between light and dark themes',
    status: 'backlog',
    priority: 'low',
    reporter: users[3],
    labels: [labels[2]],
    createdAt: '2024-02-01T11:00:00Z',
    updatedAt: '2024-02-01T11:00:00Z',
  },
  {
    id: 'issue-4',
    projectId: 'proj-1',
    key: 'FE-104',
    title: 'Implement drag and drop for kanban board',
    description: 'Users should be able to drag issues between columns',
    status: 'in_review',
    priority: 'high',
    assignee: users[1],
    reporter: users[0],
    labels: [labels[1]],
    cycle: cycles[0],
    estimate: 8,
    createdAt: '2024-01-28T10:00:00Z',
    updatedAt: '2024-02-04T16:00:00Z',
  },
  {
    id: 'issue-5',
    projectId: 'proj-1',
    key: 'FE-105',
    title: 'Add keyboard navigation to issue list',
    status: 'done',
    priority: 'medium',
    assignee: users[0],
    reporter: users[1],
    labels: [labels[2]],
    cycle: cycles[0],
    estimate: 3,
    createdAt: '2024-01-25T09:00:00Z',
    updatedAt: '2024-02-01T11:00:00Z',
  },
  {
    id: 'issue-6',
    projectId: 'proj-2',
    key: 'BE-201',
    title: 'Optimize database queries for issue list',
    description: 'Add proper indexes and pagination',
    status: 'in_progress',
    priority: 'urgent',
    assignee: users[2],
    reporter: users[0],
    labels: [labels[4]],
    estimate: 5,
    createdAt: '2024-02-03T08:00:00Z',
    updatedAt: '2024-02-04T10:00:00Z',
  },
  {
    id: 'issue-7',
    projectId: 'proj-2',
    key: 'BE-202',
    title: 'Add real-time WebSocket updates',
    description: 'Implement Socket.io for live issue updates',
    status: 'todo',
    priority: 'high',
    assignee: users[3],
    reporter: users[2],
    labels: [labels[1]],
    estimate: 13,
    createdAt: '2024-02-02T14:00:00Z',
    updatedAt: '2024-02-02T14:00:00Z',
  },
  {
    id: 'issue-8',
    projectId: 'proj-3',
    key: 'INF-301',
    title: 'Set up CI/CD pipeline',
    status: 'backlog',
    priority: 'high',
    reporter: users[0],
    labels: [labels[4]],
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'issue-9',
    projectId: 'proj-4',
    key: 'DS-401',
    title: 'Create button component variants',
    description: 'Primary, secondary, ghost, danger variants',
    status: 'done',
    priority: 'medium',
    assignee: users[1],
    reporter: users[3],
    labels: [labels[1]],
    estimate: 3,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-25T14:00:00Z',
  },
  {
    id: 'issue-10',
    projectId: 'proj-1',
    key: 'FE-106',
    title: 'Implement issue filters and saved views',
    status: 'todo',
    priority: 'medium',
    assignee: users[0],
    reporter: users[1],
    labels: [labels[1], labels[2]],
    estimate: 8,
    createdAt: '2024-02-04T09:00:00Z',
    updatedAt: '2024-02-04T09:00:00Z',
  },
]

// Helper to get issues by status
export const getIssuesByStatus = (status: Issue['status']) =>
  issues.filter((i) => i.status === status)

// Helper to get issues by project
export const getIssuesByProject = (projectId: string) =>
  issues.filter((i) => i.projectId === projectId)
