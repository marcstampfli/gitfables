/**
 * @module lib/utils/export
 * @description Utility functions for exporting data in various formats
 */

type ExportableValue = string | number | boolean | null | undefined
type ExportableObject = Record<string, ExportableValue>
type ExportableData = ExportableObject | ExportableObject[]

/**
 * Export statistics data to a file in CSV or JSON format
 * 
 * @param data - The data to export
 * @param format - The format to export to ('csv' or 'json')
 * @param filename - The name of the file (without extension)
 */
export function exportStats(data: ExportableData, format: 'csv' | 'json', filename: string) {
  const blob = format === 'csv' 
    ? new Blob([convertToCSV(data)], { type: 'text/csv;charset=utf-8;' })
    : new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}.${format}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Convert an object to CSV format
 * 
 * @param data - The data to convert
 * @returns The CSV string
 */
function convertToCSV(data: ExportableData): string {
  if (!data) return ''

  // If data is an array of objects
  if (Array.isArray(data)) {
    const headers = Object.keys(data[0])
    const rows = data.map(item => 
      headers.map(header => JSON.stringify(item[header])).join(',')
    )
    return [headers.join(','), ...rows].join('\n')
  }

  // If data is a single object
  const entries = Object.entries(data)
  const rows = entries.map(([key, value]) => `${key},${JSON.stringify(value)}`)
  return rows.join('\n')
} 