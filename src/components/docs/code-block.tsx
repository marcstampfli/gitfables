'use client'

/**
 * @module components/docs/code-block
 * @description Code block component with syntax highlighting and copy functionality
 */

import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { CopyButton } from '@/components/docs/copy-button'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-http'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
  fileName?: string
  caption?: string
}

const languageNames: Record<string, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  bash: 'Bash',
  json: 'JSON',
  yaml: 'YAML',
  markdown: 'Markdown',
  graphql: 'GraphQL',
  http: 'HTTP'
}

function LineNumbers({ count }: { count: number }) {
  return (
    <div 
      aria-hidden="true"
      className="select-none absolute left-0 top-0 h-full w-[3.5rem] flex flex-col pt-4 pb-4 text-muted-foreground/40 text-sm bg-muted/5 border-r border-muted/10"
    >
      {Array.from({ length: count }, (_, i) => (
        <div 
          key={i + 1} 
          className="text-right pr-4 font-mono"
          style={{ 
            height: '1.5rem',
            lineHeight: '1.5rem'
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  )
}

export function CodeBlock({
  code,
  language = 'typescript',
  showLineNumbers = false,
  className,
  fileName,
  caption
}: CodeBlockProps) {
  const [lineCount] = useState(() => code.split('\n').length)
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector('code')
      if (codeElement) {
        Prism.highlightElement(codeElement)
      }
    }
  }, [code, language])

  return (
    <div className="relative space-y-2">
      {(fileName || language) && (
        <div className="flex items-center justify-between text-sm mb-3">
          {fileName && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-medium">{fileName}</span>
            </div>
          )}
          {language && (
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                {languageNames[language] || language}
              </span>
            </div>
          )}
        </div>
      )}
      
      <Card className={cn("overflow-hidden relative bg-zinc-950 shadow-md", className)}>
        <div className="relative">
          <div className={cn(
            'rounded-lg',
            showLineNumbers ? 'pl-[4.5rem] pr-4' : 'px-4',
            'py-4'
          )}>
            <pre
              ref={preRef}
              className="m-0 bg-transparent overflow-x-auto"
            >
              <code 
                className={`text-sm block font-mono language-${language}`} 
                style={{ 
                  lineHeight: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  tabSize: 2
                }}
              >
                {code}
              </code>
            </pre>
          </div>
          {showLineNumbers && <LineNumbers count={lineCount} />}
        </div>

        <div className="absolute right-3 top-3 opacity-70 hover:opacity-100 transition-opacity">
          <CopyButton 
            text={code}
            className="h-8 w-8 p-0 bg-transparent hover:bg-white/10 text-white hover:text-white"
          />
        </div>
      </Card>

      {caption && (
        <p className="text-sm text-muted-foreground text-center mt-3">
          {caption}
        </p>
      )}
    </div>
  )
} 