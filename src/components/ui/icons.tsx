/**
 * @module Icons
 * @description A collection of commonly used icons from lucide-react library.
 * Provides a centralized way to access and use icons throughout the application.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * import { Icons } from '@/components/icons'
 * 
 * function MyComponent() {
 *   return <Icons.logo className="h-6 w-6" />
 * }
 * ```
 */

import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Command,
  Copy,
  CreditCard,
  File,
  FileText,
  Github,
  Gitlab,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LogOut,
  Menu,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  Share2,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
} from "lucide-react"

/**
 * Icon type representing all available icons
 * @type {typeof Icons}
 */
export type Icon = typeof Icons

/**
 * Collection of icons mapped to their respective components
 * @const
 */
export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: Github,
  gitLab: Gitlab,
  twitter: Twitter,
  check: Check,
  copy: Copy,
  share: Share2,
  menu: Menu,
  logout: LogOut,
  circle: Circle,
} as const 