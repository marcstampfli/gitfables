/**
 * @module components/docs/doc-page-header
 * @description A component for displaying documentation page headers
 */

interface DocPageHeaderProps {
  title: string
  description: string
}

export function DocPageHeader({ title, description }: DocPageHeaderProps) {
  return (
    <div className="space-y-4 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-12">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-muted-foreground md:text-xl">
          {description}
        </p>
      )}
    </div>
  )
} 