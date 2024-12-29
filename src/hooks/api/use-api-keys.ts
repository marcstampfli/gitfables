/**
 * @module hooks/use-api-keys
 * @description Hook for managing API keys
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { ApiKey, ApiKeyWithToken, CreateApiKeyRequest, ApiKeyUsageStats } from '@/types/api/api-keys'
import { logError } from '@/lib/utils/logger'

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [usageStats, setUsageStats] = useState<Record<string, ApiKeyUsageStats[]>>({})
  const supabase = createClientComponentClient()

  const loadKeyUsageStats = useCallback(async (keyId: string) => {
    try {
      const { data, error } = await supabase
        .from('api_key_usage_stats')
        .select('*')
        .eq('api_key_id', keyId)
        .order('hour', { ascending: false })
        .limit(24) // Last 24 hours

      if (error) throw error

      setUsageStats(prev => ({
        ...prev,
        [keyId]: data || []
      }))
    } catch (error) {
      logError('Failed to load API key usage stats', error)
    }
  }, [supabase])

  const loadApiKeys = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setApiKeys(data || [])

      // Load usage stats for each key
      for (const key of data || []) {
        await loadKeyUsageStats(key.id)
      }
    } catch (error) {
      logError('Failed to load API keys', error)
    } finally {
      setIsLoading(false)
    }
  }, [supabase, loadKeyUsageStats])

  useEffect(() => {
    loadApiKeys()
  }, [loadApiKeys])

  const createApiKey = useCallback(async (request: CreateApiKeyRequest): Promise<string | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const expires_at = request.expires_in_days
        ? new Date(Date.now() + request.expires_in_days * 24 * 60 * 60 * 1000).toISOString()
        : null

      const { data, error } = await supabase
        .from('api_keys')
        .insert({
          user_id: user.id,
          name: request.name,
          scopes: request.scopes,
          expires_at,
          rate_limit: request.rate_limit || 1000,
          rate_interval: request.rate_interval || '1 hour'
        })
        .select()
        .single()

      if (error) throw error

      await loadApiKeys()
      return (data as ApiKeyWithToken).token
    } catch (error) {
      logError('Failed to create API key', error)
      return null
    }
  }, [supabase, loadApiKeys])

  const deleteApiKey = useCallback(async (id: string): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      setUsageStats(prev => {
        const newStats = { ...prev }
        delete newStats[id]
        return newStats
      })

      await loadApiKeys()
    } catch (error) {
      logError('Failed to delete API key', error)
    }
  }, [supabase, loadApiKeys])

  const renewApiKey = useCallback(async (id: string): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const newExpiryDate = new Date()
      newExpiryDate.setDate(newExpiryDate.getDate() + 30)

      const { error } = await supabase
        .from('api_keys')
        .update({
          expires_at: newExpiryDate.toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      await loadApiKeys()
    } catch (error) {
      logError('Failed to renew API key', error)
      throw error
    }
  }, [supabase, loadApiKeys])

  return {
    apiKeys,
    isLoading,
    usageStats,
    createApiKey,
    deleteApiKey,
    refreshUsageStats: loadKeyUsageStats,
    renewApiKey
  }
} 