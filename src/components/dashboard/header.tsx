/**
 * @module DashboardHeader
 * @description A component that renders a consistent header layout for dashboard pages.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <DashboardHeader heading="Dashboard" />
 * 
 * // With subtext and children
 * <DashboardHeader 
 *   heading="Analytics" 
 *   text="View your repository statistics"
 * >
 *   <Button>Action</Button>
 * </DashboardHeader>
 * ```
 */

'use client'

/**
 * Props for the DashboardHeader component
 * @interface
 */
interface DashboardHeaderProps {
  /** The main heading text */
  heading: string
  /** Optional subtext displayed below the heading */
  text?: string
  /** Optional children to render in the right side of the header */
  children?: React.ReactNode
}

/**
 * DashboardHeader Component
 * 
 * @component
 * @description Renders a dashboard header with a main heading, optional subtext,
 * and optional children elements aligned to the right.
 * 
 * @param {Object} props - Component props
 * @param {string} props.heading - The main heading text
 * @param {string} [props.text] - Optional subtext displayed below the heading
 * @param {React.ReactNode} [props.children] - Optional children to render in the right side
 * @returns {JSX.Element} A header component for dashboard pages
 */
export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
} 