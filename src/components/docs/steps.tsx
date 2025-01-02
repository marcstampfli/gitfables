/**
 * @module components/docs/steps
 * @description A component for displaying numbered steps in documentation
 */

interface Step {
  title: string
  description: string
}

interface StepsProps {
  items: Step[]
}

export function Steps({ items }: StepsProps) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">{index + 1}</span>
          </div>
          <div>
            <h3 className="font-semibold mb-1">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
} 