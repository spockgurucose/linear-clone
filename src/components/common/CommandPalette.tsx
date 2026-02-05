'use client'

import { useState, useEffect, useRef } from 'react'
import { useStore, useFilteredIssues } from '@/lib/store'
import { projects, users } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface Command {
  id: string
  label: string
  icon: string
  shortcut?: string
  action: () => void
  category: 'navigation' | 'actions' | 'issues'
}

export function CommandPalette() {
  const { commandPaletteOpen, toggleCommandPalette, setViewType, setSelectedIssue, issues } = useStore()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const filteredIssues = useFilteredIssues()

  // Commands
  const commands: Command[] = [
    { id: 'view-list', label: 'Switch to List View', icon: '☰', shortcut: '1', action: () => setViewType('list'), category: 'navigation' },
    { id: 'view-board', label: 'Switch to Board View', icon: '▦', shortcut: '2', action: () => setViewType('board'), category: 'navigation' },
    { id: 'create-issue', label: 'Create New Issue', icon: '+', shortcut: 'C', action: () => console.log('create'), category: 'actions' },
    { id: 'my-issues', label: 'Show My Issues', icon: '👤', action: () => console.log('my issues'), category: 'navigation' },
  ]

  // Filter commands and issues based on query
  const matchingCommands = query
    ? commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  const matchingIssues = query
    ? filteredIssues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(query.toLowerCase()) ||
          issue.key.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : []

  const allItems = [
    ...matchingCommands.map((cmd) => ({ type: 'command' as const, item: cmd })),
    ...matchingIssues.map((issue) => ({ type: 'issue' as const, item: issue })),
  ]

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      inputRef.current?.focus()
      setQuery('')
      setSelectedIndex(0)
    }
  }, [commandPaletteOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!commandPaletteOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((i) => Math.min(i + 1, allItems.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((i) => Math.max(i - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          const selected = allItems[selectedIndex]
          if (selected) {
            if (selected.type === 'command') {
              selected.item.action()
            } else {
              setSelectedIssue(selected.item.id)
            }
            toggleCommandPalette()
          }
          break
        case 'Escape':
          toggleCommandPalette()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen, selectedIndex, allItems, toggleCommandPalette, setSelectedIssue])

  if (!commandPaletteOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={toggleCommandPalette}
      />

      {/* Modal */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl animate-slide-down">
        <div className="bg-linear-bg-secondary border border-linear-border rounded-xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-linear-border">
            <span className="text-linear-text-secondary">🔍</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedIndex(0)
              }}
              placeholder="Search for issues, commands, or projects..."
              className="flex-1 bg-transparent text-sm outline-none placeholder-linear-text-tertiary"
            />
            <kbd className="kbd">ESC</kbd>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto py-2">
            {allItems.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-linear-text-tertiary">
                No results found for "{query}"
              </div>
            ) : (
              <>
                {/* Commands */}
                {matchingCommands.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-1 text-2xs font-medium text-linear-text-tertiary uppercase">
                      Commands
                    </div>
                    {matchingCommands.map((cmd, index) => (
                      <button
                        key={cmd.id}
                        onClick={() => {
                          cmd.action()
                          toggleCommandPalette()
                        }}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors',
                          selectedIndex === index
                            ? 'bg-linear-bg-active'
                            : 'hover:bg-linear-bg-hover'
                        )}
                      >
                        <span className="w-5 text-center">{cmd.icon}</span>
                        <span className="flex-1 text-left">{cmd.label}</span>
                        {cmd.shortcut && <kbd className="kbd">{cmd.shortcut}</kbd>}
                      </button>
                    ))}
                  </div>
                )}

                {/* Issues */}
                {matchingIssues.length > 0 && (
                  <div>
                    <div className="px-4 py-1 text-2xs font-medium text-linear-text-tertiary uppercase">
                      Issues
                    </div>
                    {matchingIssues.map((issue, index) => {
                      const itemIndex = matchingCommands.length + index
                      return (
                        <button
                          key={issue.id}
                          onClick={() => {
                            setSelectedIssue(issue.id)
                            toggleCommandPalette()
                          }}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors',
                            selectedIndex === itemIndex
                              ? 'bg-linear-bg-active'
                              : 'hover:bg-linear-bg-hover'
                          )}
                        >
                          <span className="text-2xs font-mono text-linear-text-tertiary w-12">
                            {issue.key}
                          </span>
                          <span className="flex-1 text-left truncate">{issue.title}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-linear-border flex items-center gap-4 text-2xs text-linear-text-tertiary">
            <span>
              <kbd className="kbd mr-1">↑</kbd>
              <kbd className="kbd">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="kbd">↵</kbd> to select
            </span>
            <span>
              <kbd className="kbd">esc</kbd> to close
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
