'use client'

/**
 * @module components/dashboard/stories/export-analytics-client
 * @description Client component for displaying story export history
 */

import { formatDistanceToNow } from 'date-fns'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FileText, Download } from 'lucide-react'
import type { ExportRecord } from '@/lib/actions/exports'

interface ExportAnalyticsClientProps {
  exports: ExportRecord[]
}

export function ExportAnalyticsClient({ exports }: ExportAnalyticsClientProps) {
  return (
    <ScrollArea className="h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Story</TableHead>
            <TableHead>Format</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exports.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {exp.storyTitle}
              </TableCell>
              <TableCell>{exp.format}</TableCell>
              <TableCell>{formatDistanceToNow(new Date(exp.createdAt), { addSuffix: true })}</TableCell>
              <TableCell className="flex items-center gap-2">
                {exp.status === 'completed' ? (
                  <>
                    <Download className="h-4 w-4 text-green-500" />
                    Completed
                  </>
                ) : exp.status === 'failed' ? (
                  <span className="text-red-500">Failed</span>
                ) : (
                  <span className="text-yellow-500">Processing</span>
                )}
              </TableCell>
            </TableRow>
          ))}
          {exports.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No exports found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
} 