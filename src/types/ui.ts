/**
 * @module types/ui
 * @description Type definitions for UI components and interactions.
 * Includes types for theming, navigation, modals, notifications, and story visualization.
 * These types are used throughout the application to ensure consistent UI behavior.
 * 
 * @example
 * ```tsx
 * import type { ThemeConfig, Toast } from '@/types/ui'
 * 
 * const theme: ThemeConfig = {
 *   primary: '#0070f3',
 *   secondary: '#ff0080',
 *   accent: '#7928ca',
 *   background: '#ffffff',
 *   text: '#000000',
 *   isDark: false
 * }
 * ```
 */

import type { Story, StorySettings } from './story'
import type { VCSPlatform } from '@/types'

/**
 * Theme configuration for the application
 * 
 * @interface ThemeConfig
 * @property {string} primary - Primary brand color
 * @property {string} secondary - Secondary brand color
 * @property {string} accent - Accent color for highlights
 * @property {string} background - Background color
 * @property {string} text - Text color
 * @property {boolean} isDark - Whether the theme is dark mode
 * 
 * @example
 * ```ts
 * const darkTheme: ThemeConfig = {
 *   primary: '#0070f3',
 *   secondary: '#ff0080',
 *   accent: '#7928ca',
 *   background: '#000000',
 *   text: '#ffffff',
 *   isDark: true
 * }
 * ```
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
 * Navigation item for menus and sidebars
 * 
 * @interface NavItem
 * @property {string} label - Display text for the item
 * @property {string} href - URL or route path
 * @property {React.ComponentType} [icon] - Optional icon component
 * @property {boolean} [isExternal] - Whether the link opens in a new tab
 * 
 * @example
 * ```tsx
 * const navItems: NavItem[] = [{
 *   label: 'Dashboard',
 *   href: '/dashboard',
 *   icon: DashboardIcon
 * }, {
 *   label: 'GitHub',
 *   href: 'https://github.com',
 *   icon: GitHubIcon,
 *   isExternal: true
 * }]
 * ```
 */
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType
  isExternal?: boolean
}

/**
 * Modal dialog configuration
 * 
 * @interface ModalConfig
 * @property {boolean} isOpen - Whether the modal is visible
 * @property {string} title - Modal title
 * @property {React.ReactNode} content - Modal content
 * @property {() => void} onClose - Close handler
 * @property {() => void} [onConfirm] - Optional confirm handler
 * @property {string} [confirmLabel] - Custom confirm button text
 * @property {string} [cancelLabel] - Custom cancel button text
 * 
 * @example
 * ```tsx
 * const modal: ModalConfig = {
 *   isOpen: true,
 *   title: 'Delete Repository',
 *   content: 'Are you sure you want to delete this repository?',
 *   onClose: () => setIsOpen(false),
 *   onConfirm: () => deleteRepo(),
 *   confirmLabel: 'Delete',
 *   cancelLabel: 'Cancel'
 * }
 * ```
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
 * Toast notification configuration
 * 
 * @interface Toast
 * @property {string} id - Unique identifier
 * @property {'success' | 'error' | 'info' | 'warning'} type - Toast type
 * @property {string} title - Toast title
 * @property {string} message - Toast message
 * @property {number} [duration] - Display duration in milliseconds
 * @property {object} [action] - Optional action button
 * @property {string} action.label - Action button text
 * @property {() => void} action.onClick - Action click handler
 * 
 * @example
 * ```ts
 * const toast: Toast = {
 *   id: 'success-1',
 *   type: 'success',
 *   title: 'Success',
 *   message: 'Repository created successfully',
 *   duration: 5000,
 *   action: {
 *     label: 'View',
 *     onClick: () => navigate('/repos/new-repo')
 *   }
 * }
 * ```
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
 * Story visualization configuration options
 * 
 * @interface VisualizationOptions
 * @property {'calendar' | 'timeline' | 'graph'} view - Visualization type
 * @property {'day' | 'week' | 'month'} groupBy - Data grouping interval
 * @property {'commits' | 'additions' | 'deletions'} colorBy - Color coding metric
 * @property {boolean} showLabels - Whether to show data labels
 * @property {boolean} showTooltips - Whether to show tooltips
 * @property {boolean} animate - Whether to animate transitions
 * 
 * @example
 * ```ts
 * const options: VisualizationOptions = {
 *   view: 'calendar',
 *   groupBy: 'week',
 *   colorBy: 'commits',
 *   showLabels: true,
 *   showTooltips: true,
 *   animate: true
 * }
 * ```
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
 * Props for the repository selector component
 * 
 * @interface RepoSelectorProps
 * @property {VCSPlatform} platform - VCS platform (e.g., 'github', 'gitlab')
 * @property {function} onSelect - Repository selection handler
 * @property {object} [filter] - Optional repository filters
 * @property {string} [filter.owner] - Filter by owner
 * @property {string} [filter.language] - Filter by language
 * @property {boolean} [filter.isPrivate] - Filter by visibility
 * 
 * @example
 * ```tsx
 * const selector: RepoSelectorProps = {
 *   platform: 'github',
 *   onSelect: (repo) => setSelectedRepo(repo),
 *   filter: {
 *     owner: 'octocat',
 *     language: 'TypeScript',
 *     isPrivate: false
 *   }
 * }
 * ```
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
 * Props for the story generator component
 * 
 * @interface StoryGeneratorProps
 * @property {StorySettings} settings - Story generation settings
 * @property {function} onSettingsChange - Settings change handler
 * @property {function} onGenerate - Story generation trigger
 * @property {boolean} isGenerating - Whether generation is in progress
 * 
 * @example
 * ```tsx
 * const generator: StoryGeneratorProps = {
 *   settings: {
 *     timeframe: 'last-month',
 *     includeStats: true
 *   },
 *   onSettingsChange: (settings) => updateSettings(settings),
 *   onGenerate: () => generateStory(),
 *   isGenerating: false
 * }
 * ```
 */
export interface StoryGeneratorProps {
  settings: StorySettings
  onSettingsChange: (settings: StorySettings) => void
  onGenerate: () => void
  isGenerating: boolean
}

/**
 * Props for the story viewer component
 * 
 * @interface StoryViewerProps
 * @property {Story} story - Story data to display
 * @property {VisualizationOptions} visualization - Visualization options
 * @property {function} onVisualizationChange - Visualization options change handler
 * @property {function} [onShare] - Optional share handler
 * @property {function} [onExport] - Optional export handler
 * 
 * @example
 * ```tsx
 * const viewer: StoryViewerProps = {
 *   story: {
 *     title: 'My Coding Story',
 *     commits: [],
 *     stats: {}
 *   },
 *   visualization: {
 *     view: 'calendar',
 *     groupBy: 'week',
 *     colorBy: 'commits',
 *     showLabels: true,
 *     showTooltips: true,
 *     animate: true
 *   },
 *   onVisualizationChange: (options) => updateOptions(options),
 *   onShare: () => shareStory(),
 *   onExport: () => exportToPDF()
 * }
 * ```
 */
export interface StoryViewerProps {
  story: Story
  visualization: VisualizationOptions
  onVisualizationChange: (options: VisualizationOptions) => void
  onShare?: () => void
  onExport?: () => void
} 