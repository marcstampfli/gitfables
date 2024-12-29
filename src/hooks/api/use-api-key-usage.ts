/**
 * @module hooks/use-api-key-usage
 * @description Hook for fetching API key usage statistics
 */

'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { logError } from '@/lib/utils/logger'

export interface APIKeyUsage {
  total_requests: number
  avg_response_time: number
  success_rate: number
  requests_over_time: Array<{
    timestamp: string
    count: number
  }>
  response_times_over_time: Array<{
    timestamp: string
    value: number
  }>
  requests_by_endpoint: Record<string, number>
  requests_by_status: Record<string, number>
}

interface APIKeyUsageRecord {
  created_at: string
  response_time?: number
  status_code: number
  endpoint: string
}

function processRequestsOverTime(data: APIKeyUsageRecord[]) {
  const timeGroups = data.reduce<Record<number, number>>((acc, curr) => {
    const hour = new Date(curr.created_at).setMinutes(0, 0, 0)
    acc[hour] = (acc[hour] || 0) + 1
    return acc
  }, {})

  return Object.entries(timeGroups).map(([timestamp, count]) => ({
    timestamp: new Date(parseInt(timestamp)).toISOString(),
    count
  }))
}

function processResponseTimesOverTime(data: APIKeyUsageRecord[]) {
  const timeGroups = data.reduce<Record<number, number[]>>((acc, curr) => {
    const hour = new Date(curr.created_at).setMinutes(0, 0, 0)
    if (!acc[hour]) {
      acc[hour] = []
    }
    acc[hour].push(curr.response_time || 0)
    return acc
  }, {})

  return Object.entries(timeGroups).map(([timestamp, values]) => ({
    timestamp: new Date(parseInt(timestamp)).toISOString(),
    value: values.reduce((a, b) => a + b, 0) / values.length
  }))
}

export function useAPIKeyUsage() {
  const [loading, setLoading] = useState(false)
  const [usage, setUsage] = useState<APIKeyUsage | null>(null)
  const { toast } = useToast()
  const supabase = await createClient()

  const getUsageStats = useCallback(async (apiKeyId: string, startDate: Date) => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('api_key_usage')
        .select('*')
        .eq('api_key_id', apiKeyId)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true })

      if (error) throw error

      const records = data as APIKeyUsageRecord[]

      // Process the raw data into the required format
      const stats: APIKeyUsage = {
        total_requests: records.length,
        avg_response_time: records.reduce((acc, curr) => acc + (curr.response_time || 0), 0) / records.length,
        success_rate: (records.filter(d => d.status_code < 400).length / records.length) * 100,
        requests_over_time: processRequestsOverTime(records),
        response_times_over_time: processResponseTimesOverTime(records),
        requests_by_endpoint: records.reduce((acc, curr) => {
          acc[curr.endpoint] = (acc[curr.endpoint] || 0) + 1
          return acc
        }, {} as Record<string, number>),
        requests_by_status: records.reduce((acc, curr) => {
          acc[curr.status_code] = (acc[curr.status_code] || 0) + 1
          return acc
        }, {} as Record<string, number>)
      }

      setUsage(stats)
      return stats
    } catch (error) {
      logError('Error fetching API key usage stats', {
        metadata: {
          error,
          apiKeyId,
          startDate
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to fetch API key usage statistics',
        variant: 'destructive'
      })
      return null
    } finally {
      setLoading(false)
    }
  }, [supabase, toast])

  return {
    loading,
    usage,
    getUsageStats
  }
} 