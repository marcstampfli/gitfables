'use client'

interface Language {
  name: string
  percentage: number
  color?: string
}

interface LanguageChartProps {
  languages: Language[]
  width?: number
  height?: number
}

export function LanguageChart({
  languages,
  width = 340,
  height = 100,
}: LanguageChartProps) {
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Python: '#3572A5',
      Java: '#b07219',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      'C++': '#f34b7d',
      'C#': '#178600',
      PHP: '#4F5D95',
    }
    return colors[language] || '#6e7681'
  }

  const totalPercentage = languages.reduce((sum, lang) => sum + lang.percentage, 0)
  const scale = width / totalPercentage

  return (
    <div className="relative">
      <svg width={width} height={height}>
        {languages.map((lang, index) => {
          const x = languages
            .slice(0, index)
            .reduce((sum, l) => sum + l.percentage * scale, 0)
          const barWidth = lang.percentage * scale

          return (
            <g key={lang.name}>
              <rect
                x={x}
                y={0}
                width={barWidth}
                height={height}
                fill={lang.color || getLanguageColor(lang.name)}
                rx={2}
              />
              <title>{`${lang.name}: ${lang.percentage.toFixed(1)}%`}</title>
            </g>
          )
        })}
      </svg>
    </div>
  )
} 