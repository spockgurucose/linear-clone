'use client'

import { useStore, useFilteredIssues } from '@/lib/store'
import { cn } from '@/lib/utils'
import { ViewType } from '@/types'

const viewOptions: { type: ViewType; label: string; icon: string }[] = [
  { type: 'list', label: 'List', icon: '☰' },
  { type: 'board', label: 'Board', icon: '▦' },
]

export function Header() {
  const {
    viewType,
    setViewType,
    searchQuery,
    setSearchQuery,
    toggleCommandPalette,
    filter,
    setFilter,
  } = useStore()
  const filteredIssues = useFilteredIssues()

  const clearFilters = () => {
    setFilter({})
    setSearchQuery('')
  }

  const hasFilters = Object.keys(filter).length > 0 || searchQuery

  return (
    <header className="h-12 border-b border-linear-border flex items-center px-4 gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-linear-text-secondary">All Issues</span>
        <span className="text-linear-text-tertiary">/</span>
        <span className="text-linear-text">{filteredIssues.length} issues</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <button
          onClick={toggleCommandPalette}
          className="w-full flex items-center gap-2 px-3 py-1.5 bg-linear-bg-secondary border border-linear-border rounded-md text-sm text-linear-text-secondary hover:border-linear-border-hover transition-colors"
        >
          <span>🔍</span>
          <span className="flex-1 text-left">Search issues...</span>
          <kbd className="kbd">⌘K</kbd>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-2 py-1 text-xs text-linear-text-secondary hover:text-linear-text"
          >
            Clear filters
          </button>
        )}

        <select
          value={filter.status?.[0] || ''}
          onChange={(e) =>
            setFilter({ ...filter, status: e.target.value ? [e.target.value as any] : undefined })
          }
          className="px-2 py-1 text-sm bg-linear-bg-secondary border border-linear-border rounded-md text-linear-text-secondary hover:border-linear-border-hover"
        >
          <option value="">All Status</option>
          <option value="backlog">Backlog</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="in_review">In Review</option>
          <option value="done">Done</option>
        </select>

        <select
          value={filter.priority?.[0] || ''}
          onChange={(e) =>
            setFilter({ ...filter, priority: e.target.value ? [e.target.value as any] : undefined })
          }
          className="px-2 py-1 text-sm bg-linear-bg-secondary border border-linear-border rounded-md text-linear-text-secondary hover:border-linear-border-hover"
        >
          <option value="">All Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* View toggle */}
      <div className="flex items-center bg-linear-bg-secondary border border-linear-border rounded-md">
        {viewOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => setViewType(option.type)}
            className={cn(
              'px-3 py-1 text-sm transition-colors',
              viewType === option.type
                ? 'bg-linear-bg-active text-linear-text'
                : 'text-linear-text-secondary hover:text-linear-text'
            )}
          >
            <span className="mr-1">{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>

      {/* Create issue */}
      <button className="px-3 py-1.5 bg-linear-accent hover:bg-linear-accent-hover text-white text-sm font-medium rounded-md transition-colors">
        + Create
      </button>
    </header>
  )
}
