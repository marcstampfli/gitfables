/**
 * @module types/ui
 * @description Type definitions for UI components and interactions
 */

import type { Story, StorySettings } from './story'
import type { VCSPlatform } from './vcs'

/**
 * Theme configuration
 */
export interface ThemeConfig {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  isDark: boolean
}

/**
 * Navigation item
 */
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType
  isExternal?: boolean
}

/**
 * Modal configuration
 */
export interface ModalConfig {
  isOpen: boolean
  title: string
  content: React.ReactNode
  onClose: () => void
  onConfirm?: () => void
  confirmLabel?: string
  cancelLabel?: string
}

/**
 * Toast notification
 */
export interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

/**
 * Story visualization options
 */
export interface VisualizationOptions {
  view: 'calendar' | 'timeline' | 'graph'
  groupBy: 'day' | 'week' | 'month'
  colorBy: 'commits' | 'additions' | 'deletions'
  showLabels: boolean
  showTooltips: boolean
  animate: boolean
}

/**
 * Repository selector props
 */
export interface RepoSelectorProps {
  platform: VCSPlatform
  onSelect: (repo: {
    name: string
    owner: string
    url: string
  }) => void
  filter?: {
    owner?: string
    language?: string
    isPrivate?: boolean
  }
}

/**
 * Story generator props
 */
export interface StoryGeneratorProps {
  settings: StorySettings
  onSettingsChange: (settings: StorySettings) => void
  onGenerate: () => void
  isGenerating: boolean
}

/**
 * Story viewer props
 */
export interface StoryViewerProps {
  story: Story
  visualization: VisualizationOptions
  onVisualizationChange: (options: VisualizationOptions) => void
  onShare?: () => void
  onExport?: () => void
} 