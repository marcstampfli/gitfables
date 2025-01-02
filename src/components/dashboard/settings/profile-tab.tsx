/**
 * @module components/dashboard/settings/profile-tab
 * @description Profile settings tab
 */

'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { useProfile } from '@/hooks/use-profile'
import { Card } from '@/components/ui/card'
import { Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  })
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileTab() {
  const router = useRouter()
  const { profile, isLoading, error, updateProfile } = useProfile()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  })

  // Update form values when profile data is loaded
  React.useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name || '',
        email: profile.email || ''
      })
    }
  }, [profile, form])

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsSubmitting(true)
      const result = await updateProfile(data)

      if (result.error) {
        toast({
          title: 'Error',
          description: result.error.message || 'Failed to update profile. Please try again.',
          variant: 'destructive'
        })
        return
      }

      toast({
        title: 'Success',
        description: 'Your profile has been updated.'
      })
    } catch (err) {
      console.error('Error submitting form:', err)
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center space-x-4">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Loading profile...</p>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message || 'Failed to load profile'}
          </AlertDescription>
        </Alert>
        <div className="flex justify-end space-x-4">
          <Button onClick={() => router.refresh()}>
            Retry
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormDescription>
                  This is the email associated with your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update profile
          </Button>
        </Card>
      </form>
    </Form>
  )
} 