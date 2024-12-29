/**
 * @module lib/utils/export
 * @description Utilities for exporting data in different formats
 */

import { saveAs } from 'file-saver'
import type { APIKeyUsage } from '@/hooks/api/use-api-key-usage'

/**
 * Convert API key usage stats to CSV format
 */
function statsToCSV(stats: APIKeyUsage): string {
  const lines: string[] = []

  // Add summary stats
  lines.push('Summary Statistics')
  lines.push('Total Requests,Average Response Time (ms),Success Rate (%)')
  lines.push(`${stats.total_requests},${stats.avg_response_time},${stats.success_rate}`)
  lines.push('')

  // Add requests by endpoint
  lines.push('Requests by Endpoint')
  lines.push('Endpoint,Count')
  Object.entries(stats.requests_by_endpoint).forEach(([endpoint, count]) => {
    lines.push(`${endpoint},${count}`)
  })
  lines.push('')

  // Add status codes
  lines.push('Status Codes')
  lines.push('Status,Count')
  Object.entries(stats.requests_by_status).forEach(([status, count]) => {
    lines.push(`${status},${count}`)
  })
  lines.push('')

  // Add time series data
  lines.push('Requests Over Time')
  lines.push('Timestamp,Count')
  stats.requests_over_time.forEach(({ timestamp, count }) => {
    lines.push(`${timestamp},${count}`)
  })
  lines.push('')

  // Add response times
  lines.push('Response Times')
  lines.push('Timestamp,Response Time (ms)')
  stats.response_times_over_time.forEach(({ timestamp, value }) => {
    lines.push(`${timestamp},${value}`)
  })

  return lines.join('\n')
}

/**
 * Convert API key usage stats to JSON format
 */
function statsToJSON(stats: APIKeyUsage): string {
  return JSON.stringify(stats, null, 2)
}

/**
 * Export API key usage stats
 */
export function exportStats(
  stats: APIKeyUsage,
  format: 'csv' | 'json',
  filename: string
) {
  const timestamp = new Date().toISOString().split('T')[0]
  const data = format === 'csv' ? statsToCSV(stats) : statsToJSON(stats)
  const blob = new Blob([data], { type: `text/${format}` })
  saveAs(blob, `${filename}-${timestamp}.${format}`)
} 