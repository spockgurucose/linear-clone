'use client'

import { useEffect } from 'react'
import { useStore, useFilteredIssues } from '@/lib/store'

export function useKeyboardShortcuts() {
  const {
    toggleCommandPalette,
    toggleSidebar,
    setViewType,
    selectedIssueId,
    setSelectedIssue,
    setIssueDetailOpen,
    updateIssue,
    issues,
  } = useStore()
  const filteredIssues = useFilteredIssues()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      // Command palette: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
        return
      }

      // Toggle sidebar: Cmd/Ctrl + B
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault()
        toggleSidebar()
        return
      }

      // View shortcuts
      if (e.key === '1' && !e.metaKey && !e.ctrlKey) {
        setViewType('list')
        return
      }
      if (e.key === '2' && !e.metaKey && !e.ctrlKey) {
        setViewType('board')
        return
      }

      // Issue navigation: j/k
      if (e.key === 'j') {
        const currentIndex = filteredIssues.findIndex((i) => i.id === selectedIssueId)
        const nextIndex = currentIndex + 1
        if (nextIndex < filteredIssues.length) {
          setSelectedIssue(filteredIssues[nextIndex].id)
        } else if (filteredIssues.length > 0 && currentIndex === -1) {
          setSelectedIssue(filteredIssues[0].id)
        }
        return
      }
      if (e.key === 'k') {
        const currentIndex = filteredIssues.findIndex((i) => i.id === selectedIssueId)
        const prevIndex = currentIndex - 1
        if (prevIndex >= 0) {
          setSelectedIssue(filteredIssues[prevIndex].id)
        }
        return
      }

      // Close issue detail: Escape
      if (e.key === 'Escape') {
        setIssueDetailOpen(false)
        return
      }

      // Quick status change when issue is selected
      if (selectedIssueId) {
        const statusMap: Record<string, string> = {
          b: 'backlog',
          t: 'todo',
          i: 'in_progress',
          r: 'in_review',
          d: 'done',
        }

        if (statusMap[e.key]) {
          e.preventDefault()
          updateIssue(selectedIssueId, { status: statusMap[e.key] as any })
          return
        }

        // Priority change: 0-4
        const priorityMap: Record<string, string> = {
          '0': 'no_priority',
          '4': 'urgent',
          '3': 'high',
          '2': 'medium',
          '1': 'low',
        }

        if (priorityMap[e.key]) {
          e.preventDefault()
          updateIssue(selectedIssueId, { priority: priorityMap[e.key] as any })
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    toggleCommandPalette,
    toggleSidebar,
    setViewType,
    selectedIssueId,
    setSelectedIssue,
    setIssueDetailOpen,
    updateIssue,
    filteredIssues,
  ])
}
