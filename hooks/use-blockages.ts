import { useState, useEffect, useCallback } from 'react'
import { blockagesApi, type Blockage } from '@/lib/api-client'
import { useToast } from '@/components/ui/use-toast'

export function useBlockages() {
  const [blockages, setBlockages] = useState<Blockage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchBlockages = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await blockagesApi.getAllBlockages()
      setBlockages(Array.isArray(response.data) ? response.data : [response.data].filter(Boolean))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar bloqueos'
      setError(errorMessage)
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchBlockages()
  }, [fetchBlockages])

  const createBlockage = async (blockageData: Partial<Blockage>) => {
    try {
      const response = await blockagesApi.createBlockage(blockageData as Blockage)
      await fetchBlockages()
      toast({
        title: 'Éxito',
        description: 'Bloqueo creado exitosamente',
      })
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear bloqueo'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    }
  }

  const deleteBlockage = async (id: number) => {
    try {
      await blockagesApi.deleteBlockage(id)
      await fetchBlockages()
      toast({
        title: 'Éxito',
        description: 'Bloqueo eliminado exitosamente',
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar bloqueo'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    }
  }

  return {
    blockages,
    loading,
    error,
    refetch: fetchBlockages,
    createBlockage,
    deleteBlockage,
  }
}

export function useActiveBlockages() {
  const [blockages, setBlockages] = useState<Blockage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchActiveBlockages = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await blockagesApi.getActiveBlockages()
        setBlockages(Array.isArray(response.data) ? response.data : [response.data].filter(Boolean))
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar bloqueos activos'
        setError(errorMessage)
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchActiveBlockages()
  }, [toast])

  return { blockages, loading, error }
}
