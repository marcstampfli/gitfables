/**
 * @module hooks/use-toast
 * @description React hook for managing toast notifications
 */

import { useToast as useToastUI } from '@/components/ui/use-toast'

export function useToast() {
  const { toast } = useToastUI()

  return {
    success: (message: string) => {
      toast({
        title: 'Success',
        description: message,
      })
    },
    error: (message: string) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
    },
    info: (message: string) => {
      toast({
        title: 'Info',
        description: message,
      })
    },
  }
} 