import { useState, useEffect, useCallback } from 'react'
import { vehiclesApi, type Vehicle } from '@/lib/api-client'
import { useToast } from '@/components/ui/use-toast'

export function useVehicles(filter?: string) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      let response
      if (filter) {
        // Map Spanish filter names to API status values
        const statusMap: Record<string, string> = {
          'disponible': 'AVAILABLE',
          'en-ruta': 'IN_TRANSIT',
          'mantenimiento': 'MAINTENANCE',
          'averiado': 'BROKEN_DOWN'
        }
        
        const apiStatus = statusMap[filter]
        if (apiStatus) {
          response = await vehiclesApi.getVehiclesByStatus(apiStatus as any)
        } else {
          response = await vehiclesApi.getAllVehicles()
        }
      } else {
        response = await vehiclesApi.getAllVehicles()
      }
      
      setVehicles(Array.isArray(response.data) ? response.data : [response.data].filter(Boolean))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar vehículos'
      setError(errorMessage)
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [filter, toast])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  const createVehicle = async (vehicleData: Partial<Vehicle>) => {
    try {
      const response = await vehiclesApi.createVehicle(vehicleData as Vehicle)
      await fetchVehicles() // Refresh the list
      toast({
        title: 'Éxito',
        description: 'Vehículo creado exitosamente',
      })
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear vehículo'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    }
  }

  const updateVehicleStatus = async (id: string, status: string) => {
    try {
      await vehiclesApi.updateVehicleStatus(id, status as any)
      await fetchVehicles() // Refresh the list
      toast({
        title: 'Éxito',
        description: 'Estado del vehículo actualizado',
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar estado'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    }
  }

  const deleteVehicle = async (id: string) => {
    try {
      await vehiclesApi.deleteVehicle(id)
      await fetchVehicles() // Refresh the list
      toast({
        title: 'Éxito',
        description: 'Vehículo eliminado exitosamente',
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar vehículo'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    }
  }

  return {
    vehicles,
    loading,
    error,
    refetch: fetchVehicles,
    createVehicle,
    updateVehicleStatus,
    deleteVehicle,
  }
}

export function useVehicle(id: string) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await vehiclesApi.getVehicleById(id)
        setVehicle(response.data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar vehículo'
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

    if (id) {
      fetchVehicle()
    }
  }, [id, toast])

  return { vehicle, loading, error }
}
