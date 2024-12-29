/**
 * @module components/dashboard/settings/api-keys-tab
 * @description API keys management tab with key generation and usage tracking
 */

'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Plus, Trash, Copy } from 'lucide-react'
import { toast } from 'sonner'
import type { SettingsTabProps } from './types'

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  last_used: string | null
}

export function ApiKeysTab({ settings: _settings }: SettingsTabProps) {
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = React.useState('')

  const handleCreateKey = () => {
    if (!newKeyName) {
      toast.error('Please enter a name for the API key')
      return
    }

    const newKey: ApiKey = {
      id: Math.random().toString(36).substring(7),
      name: newKeyName,
      key: `gf_${Math.random().toString(36).substring(7)}`,
      created: new Date().toISOString(),
      last_used: null
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName('')
    toast.success('API key created successfully')
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success('API key copied to clipboard')
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
    toast.success('API key deleted successfully')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">API Keys</h3>
        <p className="text-sm text-muted-foreground">
          Manage your API keys for accessing GitFables programmatically
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Create New API Key</Label>
              <p className="text-sm text-muted-foreground">
                Generate a new API key for accessing GitFables
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex space-x-2">
            <Input
              placeholder="Enter key name"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
            <Button onClick={handleCreateKey}>
              <Plus className="mr-2 h-4 w-4" />
              Generate Key
            </Button>
          </div>
        </div>
      </Card>

      {apiKeys.length > 0 && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-0.5">
              <h4 className="font-medium">Active API Keys</h4>
              <p className="text-sm text-muted-foreground">
                Your active API keys and their usage
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{key.name}</p>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <p>Created: {new Date(key.created).toLocaleDateString()}</p>
                      {key.last_used && (
                        <p>Last used: {new Date(key.last_used).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyKey(key.key)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteKey(key.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
} 