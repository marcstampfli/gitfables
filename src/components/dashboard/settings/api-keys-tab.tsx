/**
 * @module components/dashboard/settings/api-keys-tab
 * @description Tab component for managing API keys
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Plus, Trash } from 'lucide-react'
import { useApiKeys } from '@/hooks/api/use-api-keys'
import { formatDistanceToNow } from 'date-fns'
import type { ApiKey, CreateApiKeyRequest, ApiScope } from '@/types/api/api-keys'

interface ApiKeyFormData {
  name: string
  description?: string
  expiresInDays?: number
}

const DEFAULT_SCOPES: ApiScope[] = ['stories:read', 'stories:write']

export function ApiKeysTab() {
  const { apiKeys, createApiKey, deleteApiKey, isLoading } = useApiKeys()
  const [formData, setFormData] = useState<ApiKeyFormData>({
    name: '',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const request: CreateApiKeyRequest = {
      name: formData.name,
      scopes: DEFAULT_SCOPES,
      expires_in_days: formData.expiresInDays,
    }
    await createApiKey(request)
    setFormData({ name: '', description: '' })
  }

  const handleDelete = async (id: string) => {
    await deleteApiKey(id)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ApiKeyFormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="API Key Name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="API Key Description"
              value={formData.description}
              onChange={(e) => handleInputChange(e, 'description')}
            />
          </div>
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create API Key
        </Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Active API Keys</h3>
        {apiKeys.length === 0 ? (
          <p className="text-sm text-muted-foreground">No API keys found.</p>
        ) : (
          <div className="space-y-4">
            {apiKeys.map((key: ApiKey) => (
              <Card key={key.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{key.name}</p>
                    <div className="flex flex-wrap gap-1">
                      {key.scopes.map((scope) => (
                        <code key={scope} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                          {scope}
                        </code>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Created {formatDistanceToNow(new Date(key.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(key.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 