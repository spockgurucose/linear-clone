import { create } from 'zustand'
import { Issue, IssueStatus, Filter, ViewType, GroupBy } from '@/types'
import { issues as mockIssues } from './mock-data'

interface AppState {
  // Issues
  issues: Issue[]
  selectedIssueId: string | null

  // View state
  viewType: ViewType
  groupBy: GroupBy
  filter: Filter
  searchQuery: string

  // UI state
  sidebarCollapsed: boolean
  commandPaletteOpen: boolean
  issueDetailOpen: boolean

  // Actions
  setSelectedIssue: (id: string | null) => void
  setViewType: (type: ViewType) => void
  setGroupBy: (groupBy: GroupBy) => void
  setFilter: (filter: Filter) => void
  setSearchQuery: (query: string) => void
  toggleSidebar: () => void
  toggleCommandPalette: () => void
  setIssueDetailOpen: (open: boolean) => void

  // Issue mutations
  updateIssueStatus: (issueId: string, status: IssueStatus) => void
  updateIssue: (issueId: string, updates: Partial<Issue>) => void
  createIssue: (issue: Omit<Issue, 'id' | 'key' | 'createdAt' | 'updatedAt'>) => void
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  issues: mockIssues,
  selectedIssueId: null,
  viewType: 'list',
  groupBy: 'status',
  filter: {},
  searchQuery: '',
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  issueDetailOpen: false,

  // Actions
  setSelectedIssue: (id) => set({ selectedIssueId: id, issueDetailOpen: id !== null }),
  setViewType: (viewType) => set({ viewType }),
  setGroupBy: (groupBy) => set({ groupBy }),
  setFilter: (filter) => set({ filter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  setIssueDetailOpen: (open) => set({ issueDetailOpen: open, selectedIssueId: open ? undefined : null }),

  // Issue mutations
  updateIssueStatus: (issueId, status) =>
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === issueId
          ? { ...issue, status, updatedAt: new Date().toISOString() }
          : issue
      ),
    })),

  updateIssue: (issueId, updates) =>
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === issueId
          ? { ...issue, ...updates, updatedAt: new Date().toISOString() }
          : issue
      ),
    })),

  createIssue: (issueData) =>
    set((state) => {
      const projectIssues = state.issues.filter((i) => i.projectId === issueData.projectId)
      const maxNumber = Math.max(...projectIssues.map((i) => parseInt(i.key.split('-')[1]) || 0), 0)
      const project = issueData.projectId === 'proj-1' ? 'FE' : 'BE'
      const newIssue: Issue = {
        ...issueData,
        id: `issue-${Date.now()}`,
        key: `${project}-${maxNumber + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return { issues: [...state.issues, newIssue] }
    }),
}))

// Selectors
export const useFilteredIssues = () => {
  const { issues, filter, searchQuery } = useStore()

  return issues.filter((issue) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        issue.title.toLowerCase().includes(query) ||
        issue.key.toLowerCase().includes(query) ||
        issue.description?.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Status filter
    if (filter.status?.length && !filter.status.includes(issue.status)) {
      return false
    }

    // Priority filter
    if (filter.priority?.length && !filter.priority.includes(issue.priority)) {
      return false
    }

    // Assignee filter
    if (filter.assignee?.length && (!issue.assignee || !filter.assignee.includes(issue.assignee.id))) {
      return false
    }

    // Project filter
    if (filter.project?.length && !filter.project.includes(issue.projectId)) {
      return false
    }

    return true
  })
}
