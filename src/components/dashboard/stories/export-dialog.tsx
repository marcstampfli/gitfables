/**
 * @module components/dashboard/stories/export-dialog
 * @description Dialog for exporting stories
 */

'use client'

import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, FileJson, FileText, FileType } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useActivity } from '@/hooks/use-activity'
import { jsPDF } from 'jspdf'
import type { Story } from '@/types/stories'
import { logError } from '@/lib/utils/logger'

interface ExportDialogProps {
  story: Story
}

type ExportFormat = 'markdown' | 'json' | 'pdf'

const FORMAT_LABELS: Record<ExportFormat, string> = {
  markdown: 'Markdown',
  json: 'JSON',
  pdf: 'PDF'
}

export function ExportDialog({ story }: ExportDialogProps) {
  const [format, setFormat] = React.useState<ExportFormat>('markdown')
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const { toast } = useToast()
  const { trackActivity } = useActivity()

  // Generate PDF
  function generatePDF(): void {
    try {
      const doc = new jsPDF()
      const margin = 20
      const pageWidth = doc.internal.pageSize.getWidth()
      
      // Title
      doc.setFontSize(24)
      doc.text(story.title, margin, margin)
      
      // Content
      doc.setFontSize(12)
      const contentLines = doc.splitTextToSize(
        story.content,
        pageWidth - (margin * 2)
      )
      doc.text(contentLines, margin, margin + 20)
      
      // Metadata
      const metaY = margin + 30 + (contentLines.length * 7)
      doc.setFontSize(10)
      doc.text(`Repository: ${story.repository_url}`, margin, metaY)
      doc.text(`Commit: ${story.commit_hash}`, margin, metaY + 7)
      doc.text(`Created: ${new Date(story.created_at).toLocaleDateString()}`, margin, metaY + 14)
      
      // Save
      doc.save(`${story.title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
    } catch (error) {
      logError('Failed to generate PDF', { 
        metadata: { 
          error,
          storyId: story.id,
          title: story.title 
        }
      })
      throw new Error('Failed to generate PDF')
    }
  }

  // Handle export
  async function handleExport() {
    try {
      setLoading(true)

      if (format === 'pdf') {
        generatePDF()
      } else {
        let content: string
        let filename: string
        let type: string

        switch (format) {
          case 'markdown':
            content = `# ${story.title}\n\n${story.content}\n\nRepository: ${story.repository_url}\nCommit: ${story.commit_hash}`
            filename = `${story.title.toLowerCase().replace(/\s+/g, '-')}.md`
            type = 'text/markdown'
            break
          case 'json':
            content = JSON.stringify(story, null, 2)
            filename = `${story.title.toLowerCase().replace(/\s+/g, '-')}.json`
            type = 'application/json'
            break
          default:
            return
        }

        // Create and download file
        const blob = new Blob([content], { type })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }

      // Track activity
      await trackActivity('story_exported', {
        title: story.title,
        format
      })

      // Show success message
      toast({
        title: 'Story Exported',
        description: `Successfully exported story as ${FORMAT_LABELS[format]}`
      })

      // Close dialog
      setOpen(false)
    } catch (error) {
      logError('Failed to export story', { 
        metadata: { 
          error,
          storyId: story.id,
          title: story.title,
          format 
        }
      })
      toast({
        title: 'Export Failed',
        description: error instanceof Error ? error.message : 'Failed to export story. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Story</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select
              value={format}
              onValueChange={(value: ExportFormat) => setFormat(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="markdown" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Markdown (.md)
                </SelectItem>
                <SelectItem value="json" className="flex items-center">
                  <FileJson className="mr-2 h-4 w-4" />
                  JSON (.json)
                </SelectItem>
                <SelectItem value="pdf" className="flex items-center">
                  <FileType className="mr-2 h-4 w-4" />
                  PDF Document
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            onClick={handleExport}
            disabled={loading}
          >
            {loading ? 'Exporting...' : 'Export Story'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 