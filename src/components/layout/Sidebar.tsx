'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { teams, projects, currentUser } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Inbox', icon: '📥', count: 3 },
  { name: 'My Issues', icon: '👤', count: 5 },
  { name: 'Views', icon: '📊' },
]

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, filter, setFilter } = useStore()
  const [expandedTeams, setExpandedTeams] = useState<string[]>(['team-1'])

  const toggleTeam = (teamId: string) => {
    setExpandedTeams((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId]
    )
  }

  const selectProject = (projectId: string) => {
    const current = filter.project || []
    const updated = current.includes(projectId)
      ? current.filter((id) => id !== projectId)
      : [...current, projectId]
    setFilter({ ...filter, project: updated.length ? updated : undefined })
  }

  if (sidebarCollapsed) {
    return (
      <aside className="w-14 bg-linear-bg-secondary border-r border-linear-border flex flex-col">
        <button
          onClick={toggleSidebar}
          className="p-4 hover:bg-linear-bg-hover transition-colors"
        >
          <span className="text-lg">☰</span>
        </button>
      </aside>
    )
  }

  return (
    <aside className="w-60 bg-linear-bg-secondary border-r border-linear-border flex flex-col">
      {/* Workspace header */}
      <div className="p-3 border-b border-linear-border">
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-linear-bg-hover transition-colors">
          <div className="w-6 h-6 rounded bg-linear-accent flex items-center justify-center text-xs font-semibold">
            A
          </div>
          <span className="font-medium text-sm">Acme Inc</span>
          <span className="ml-auto text-linear-text-tertiary">⌄</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {/* Quick links */}
        <div className="px-2 mb-4">
          {navigation.map((item) => (
            <button
              key={item.name}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-linear-text-secondary hover:text-linear-text hover:bg-linear-bg-hover transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
              {item.count && (
                <span className="ml-auto text-2xs bg-linear-bg-active px-1.5 py-0.5 rounded">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Teams & Projects */}
        <div className="px-2">
          <div className="flex items-center justify-between px-2 py-1 text-2xs font-medium text-linear-text-tertiary uppercase tracking-wider">
            <span>Teams</span>
            <button className="hover:text-linear-text">+</button>
          </div>

          {teams.map((team) => (
            <div key={team.id} className="mt-1">
              <button
                onClick={() => toggleTeam(team.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-linear-bg-hover transition-colors"
              >
                <span
                  className={cn(
                    'text-2xs transition-transform',
                    expandedTeams.includes(team.id) ? 'rotate-90' : ''
                  )}
                >
                  ▶
                </span>
                <span>{team.icon}</span>
                <span>{team.name}</span>
              </button>

              {expandedTeams.includes(team.id) && (
                <div className="ml-4 mt-0.5 space-y-0.5">
                  {projects
                    .filter((p) => p.teamId === team.id)
                    .map((project) => (
                      <button
                        key={project.id}
                        onClick={() => selectProject(project.id)}
                        className={cn(
                          'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
                          filter.project?.includes(project.id)
                            ? 'bg-linear-bg-active text-linear-text'
                            : 'text-linear-text-secondary hover:text-linear-text hover:bg-linear-bg-hover'
                        )}
                      >
                        <span
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: project.color }}
                        />
                        <span>{project.name}</span>
                        <span className="ml-auto text-2xs text-linear-text-tertiary">
                          {project.key}
                        </span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-linear-border">
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-linear-bg-hover transition-colors">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm">{currentUser.name}</span>
        </button>
      </div>
    </aside>
  )
}
