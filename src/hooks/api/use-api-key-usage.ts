/**
 * @module hooks/use-api-key-usage
 * @description Hook for fetching API key usage statistics
 */

'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface APIKeyUsage {
  total_requests: number
  avg_response_time: number
  success_rate: number
  requests_by_endpoint: Record<string, number>
  requests_by_status: Record<string, number>
  requests_over_time: Array<{ timestamp: string; count: number }>
  response_times_over_time: Array<{ timestamp: string; value: number }>
}

interface APIKeyUsageRecord {
  id: string
  api_key_id: string
  timestamp: string
  endpoint: string
  method: string
  status_code: number
  response_time: number
}

export function useAPIKeyUsage() {
  const [usage, setUsage] = useState<APIKeyUsageRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchUsage = useCallback(async (apiKeyId: string, startDate: Date) => {
    try {
      setIsLoading(true)
      const supabase = await createClient()

      const { data, error } = await supabase
        .from('api_key_usage')
        .select('*')
        .eq('api_key_id', apiKeyId)
        .gte('timestamp', startDate.toISOString())
        .order('timestamp', { ascending: false })

      if (error) throw error

      setUsage(data || [])
      return data
    } catch (err) {
      const error = err as Error
      setError(error)
      toast({
        title: 'Error',
        description: 'Failed to fetch API key usage',
        variant: 'destructive'
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  const getUsageStats = useCallback((records: APIKeyUsageRecord[]): APIKeyUsage => {
    const total = records.length
    const avgResponseTime = records.reduce((sum, r) => sum + r.response_time, 0) / total
    const successCount = records.filter(r => r.status_code >= 200 && r.status_code < 300).length
    const successRate = (successCount / total) * 100

    const byEndpoint: Record<string, number> = {}
    const byStatus: Record<string, number> = {}
    const overTime: Record<string, number> = {}
    const responseTimes: Record<string, number[]> = {}

    records.forEach(record => {
      // Group by endpoint
      byEndpoint[record.endpoint] = (byEndpoint[record.endpoint] || 0) + 1

      // Group by status code
      byStatus[record.status_code] = (byStatus[record.status_code] || 0) + 1

      // Group by hour
      const hour = record.timestamp.split(':')[0]
      overTime[hour] = (overTime[hour] || 0) + 1

      // Collect response times
      if (!responseTimes[hour]) {
        responseTimes[hour] = []
      }
      responseTimes[hour].push(record.response_time)
    })

    // Convert response times to averages
    const responseTimesOverTime = Object.entries(responseTimes).map(([timestamp, times]) => ({
      timestamp,
      value: times.reduce((sum, time) => sum + time, 0) / times.length
    }))

    return {
      total_requests: total,
      avg_response_time: avgResponseTime,
      success_rate: successRate,
      requests_by_endpoint: byEndpoint,
      requests_by_status: byStatus,
      requests_over_time: Object.entries(overTime).map(([timestamp, count]) => ({ timestamp, count })),
      response_times_over_time: responseTimesOverTime
    }
  }, [])

  return {
    usage,
    isLoading,
    error,
    fetchUsage,
    getUsageStats
  }
} 