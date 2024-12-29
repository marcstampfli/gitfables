/**
 * @module components/dashboard/settings/api-keys-tab
 * @description Tab component for managing API keys
 */

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { Plus, Loader2, Copy, Trash2 } from 'lucide-react'
import { logError } from '@/lib/utils/logger'

type ApiScope = 'read:stories' | 'write:stories' | 'read:profile' | 'write:profile'

const API_SCOPES: Record<ApiScope, { description: string; example: string }> = {
  'read:stories': {
    description: 'Read access to stories and their metadata',
    example: 'GET /api/stories'
  },
  'write:stories': {
    description: 'Create, update, and delete stories',
    example: 'POST /api/stories'
  },
  'read:profile': {
    description: 'Read access to user profile information',
    example: 'GET /api/profile'
  },
  'write:profile': {
    description: 'Update user profile information',
    example: 'PUT /api/profile'
  }
}

export function ApiKeysTab() {
  const [newKeyName, setNewKeyName] = useState('')
  const [expiresInDays, setExpiresInDays] = useState('never')
  const [rateLimit, setRateLimit] = useState('1000')
  const [selectedScopes, setSelectedScopes] = useState<ApiScope[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [apiKeys, setApiKeys] = useState<any[]>([])
  const { toast } = useToast()
  const supabase = createClient()

  const handleCreateKey = async () => {
    try {
      setIsCreating(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No authenticated user')

      const { data: key, error } = await supabase
        .from('api_keys')
        .insert({
          user_id: user.id,
          name: newKeyName,
          scopes: selectedScopes,
          expires_in: expiresInDays === 'never' ? null : parseInt(expiresInDays),
          rate_limit: parseInt(rateLimit)
        })
        .select()
        .single()

      if (error) throw error

      setApiKeys(prev => [...prev, key])
      toast({
        title: 'API Key Created',
        description: 'Your new API key has been created successfully.'
      })
    } catch (error) {
      logError('Failed to create API key', error, {
        context: 'api_keys',
        metadata: {
          action: 'create',
          name: newKeyName,
          scopes: selectedScopes
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to create API key. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsCreating(false)
      setNewKeyName('')
      setSelectedScopes([])
      setExpiresInDays('never')
      setRateLimit('1000')
    }
  }

  const handleDeleteKey = async (keyId: string) => {
    try {
      setIsDeleting(true)
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', keyId)

      if (error) throw error

      setApiKeys(prev => prev.filter(key => key.id !== keyId))
      toast({
        title: 'API Key Deleted',
        description: 'The API key has been deleted successfully.'
      })
    } catch (error) {
      logError('Failed to delete API key', error, {
        context: 'api_keys',
        metadata: {
          action: 'delete',
          keyId
        }
      })
      toast({
        title: 'Error',
        description: 'Failed to delete API key. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: 'Copied',
      description: 'API key copied to clipboard'
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">API Keys</h2>
        <p className="text-muted-foreground">
          Manage API keys for accessing the GitFables API
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Create New Key */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key with specific access scopes
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name">Key Name</Label>
                  <Input
                    id="key-name"
                    placeholder="e.g., Development Key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expires">Expires In</Label>
                  <Select value={expiresInDays} onValueChange={setExpiresInDays}>
                    <SelectTrigger id="expires">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate-limit">Rate Limit (requests per hour)</Label>
                  <Select value={rateLimit} onValueChange={setRateLimit}>
                    <SelectTrigger id="rate-limit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="1000">1,000</SelectItem>
                      <SelectItem value="5000">5,000</SelectItem>
                      <SelectItem value="10000">10,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Access Scopes</Label>
                  {Object.entries(API_SCOPES).map(([scope, { description, example }]) => (
                    <div key={scope} className="flex items-center justify-between space-x-2">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center">
                          <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">
                            {scope}
                          </code>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {description}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          Example: {example}
                        </p>
                      </div>
                      <Switch
                        checked={selectedScopes.includes(scope as ApiScope)}
                        onCheckedChange={(checked) => {
                          setSelectedScopes(prev =>
                            checked
                              ? [...prev, scope as ApiScope]
                              : prev.filter(s => s !== scope)
                          )
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreateKey}
                  disabled={!newKeyName || selectedScopes.length === 0 || isCreating}
                >
                  {isCreating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Create Key'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Existing Keys */}
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <Card key={key.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{key.name}</h3>
                    <div className="flex gap-2">
                      {key.scopes.map((scope: string) => (
                        <code
                          key={scope}
                          className="text-xs font-mono bg-muted px-1 py-0.5 rounded"
                        >
                          {scope}
                        </code>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyKey(key.key)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteKey(key.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
} 