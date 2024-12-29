/**
 * @module hooks/use-api-keys
 * @description Hook for managing API keys
 */

'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { ApiKey, ApiKeyWithToken, CreateApiKeyRequest, ApiKeyUsageStats } from '@/types/api/api-keys'
import { logError } from '@/lib/utils/logger'

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [usageStats, setUsageStats] = useState<Record<string, ApiKeyUsageStats[]>>({})
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadApiKeys()
  }, [])

  async function loadApiKeys() {
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
  }

  async function loadKeyUsageStats(keyId: string) {
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
  }

  async function createApiKey(request: CreateApiKeyRequest): Promise<string | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      // Calculate expiration date if provided
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

      // Refresh the list
      loadApiKeys()

      // Return the token
      return (data as ApiKeyWithToken).token
    } catch (error) {
      logError('Failed to create API key', error)
      return null
    }
  }

  async function deleteApiKey(id: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error

      // Remove usage stats
      setUsageStats(prev => {
        const newStats = { ...prev }
        delete newStats[id]
        return newStats
      })

      // Refresh the list
      loadApiKeys()
    } catch (error) {
      logError('Failed to delete API key', error)
    }
  }

  async function renewApiKey(id: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Extend expiration by 30 days from now
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

      // Refresh the list
      loadApiKeys()
    } catch (error) {
      logError('Failed to renew API key', error)
      throw error
    }
  }

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