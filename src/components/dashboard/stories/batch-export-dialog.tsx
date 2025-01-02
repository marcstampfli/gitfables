/**
 * @module components/dashboard/stories/batch-export-dialog
 * @description Dialog for batch exporting multiple stories
 */

'use client'

import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { FileJson, FileText, FileType, Archive } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useActivity } from '@/hooks/use-activity'
import { jsPDF } from 'jspdf'
import JSZip from 'jszip'
import type { Story } from '@/types/stories'
import { logError } from '@/lib/utils/logger'

interface BatchExportDialogProps {
  stories: Story[]
}

type ExportFormat = 'markdown' | 'json' | 'pdf'

const FORMAT_LABELS: Record<ExportFormat, string> = {
  markdown: 'Markdown',
  json: 'JSON',
  pdf: 'PDF'
}

export function BatchExportDialog({ stories }: BatchExportDialogProps) {
  const [format, setFormat] = React.useState<ExportFormat>('markdown')
  const [loading, setLoading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [selectedStories, setSelectedStories] = React.useState<Set<string>>(new Set())
  const { toast } = useToast()
  const { trackActivity } = useActivity()

  // Toggle story selection
  const toggleStory = (id: string) => {
    const newSelected = new Set(selectedStories)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedStories(newSelected)
  }

  // Toggle all stories
  const toggleAll = () => {
    if (selectedStories.size === stories.length) {
      setSelectedStories(new Set())
    } else {
      setSelectedStories(new Set(stories.map(s => s.id)))
    }
  }

  // Generate PDF for a story
  function generatePDF(story: Story): ArrayBuffer {
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
    
    return doc.output('arraybuffer')
  }

  // Handle batch export
  async function handleExport() {
    if (selectedStories.size === 0) {
      toast({
        title: 'No Stories Selected',
        description: 'Please select at least one story to export.',
        variant: 'destructive'
      })
      return
    }

    try {
      setLoading(true)
      const zip = new JSZip()
      const selectedStoryList = stories.filter(s => selectedStories.has(s.id))
      let completed = 0

      for (const story of selectedStoryList) {
        try {
          const filename = story.title.toLowerCase().replace(/\s+/g, '-')
          let content: string | ArrayBuffer
          
          if (format === 'markdown') {
            content = `# ${story.title}\n\n${story.content}\n\nRepository: ${story.repository_url}\nCommit: ${story.commit_hash}`
            zip.file(`${filename}.md`, content)
          } else if (format === 'json') {
            content = JSON.stringify(story, null, 2)
            zip.file(`${filename}.json`, content)
          } else if (format === 'pdf') {
            content = generatePDF(story)
            zip.file(`${filename}.pdf`, content)
          }

          completed++
          setProgress((completed / selectedStoryList.length) * 100)
        } catch (error) {
          logError('Failed to process story for export', { 
            metadata: { 
              error,
              storyId: story.id,
              format 
            }
          })
          toast({
            title: 'Warning',
            description: `Failed to process "${story.title}". Continuing with remaining stories.`,
            variant: 'destructive'
          })
        }
      }

      // Generate zip file
      const content = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = `stories-export-${format}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      // Track activity
      await trackActivity('story_batch_exported', {
        format,
        count: selectedStories.size
      })

      // Show success message
      toast({
        title: 'Stories Exported',
        description: `Successfully exported ${completed} out of ${selectedStories.size} stories as ${FORMAT_LABELS[format]}`
      })

      // Close dialog
      setOpen(false)
    } catch (error) {
      logError('Failed to export stories', { 
        metadata: { 
          error,
          format,
          selectedStoryCount: selectedStories.size 
        }
      })
      toast({
        title: 'Export Failed',
        description: error instanceof Error ? error.message : 'Failed to export stories. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          icon={<Archive className="h-4 w-4" />}
          iconPosition="left"
        >
          Batch Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Batch Export Stories</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select value={format} onValueChange={(value) => setFormat(value as ExportFormat)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="markdown" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Markdown
                </SelectItem>
                <SelectItem value="json" className="flex items-center gap-2">
                  <FileJson className="h-4 w-4" />
                  JSON
                </SelectItem>
                <SelectItem value="pdf" className="flex items-center gap-2">
                  <FileType className="h-4 w-4" />
                  PDF
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Select Stories</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAll}
              >
                {selectedStories.size === stories.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            <div className="max-h-60 space-y-2 overflow-y-auto rounded-md border p-4">
              {stories.map(story => (
                <div key={story.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedStories.has(story.id)}
                    onCheckedChange={() => toggleStory(story.id)}
                  />
                  <span className="text-sm">{story.title}</span>
                </div>
              ))}
            </div>
          </div>

          {loading && (
            <div className="space-y-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Exporting stories... {Math.round(progress)}%
              </p>
            </div>
          )}

          <Button 
            onClick={handleExport} 
            disabled={loading || selectedStories.size === 0}
            loading={loading}
            icon={<Archive className="h-4 w-4" />}
            iconPosition="left"
          >
            Export Selected Stories
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 