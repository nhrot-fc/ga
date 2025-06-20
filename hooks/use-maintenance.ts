import { useState, useEffect, useCallback } from 'react'
import { maintenanceApi, type Maintenance } from '@/lib/api-client'
import { useToast } from '@/components/ui/use-toast'

export function useMaintenance() {
  const [maintenance, setMaintenance] = useState<Maintenance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchMaintenance = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await maintenanceApi.getAllMaintenance()
      setMaintenance(Array.isArray(response.data) ? response.data : [response.data].filter(Boolean))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar mantenimientos'
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
    fetchMaintenance()
  }, [fetchMaintenance])

  const createMaintenance = async (maintenanceData: Partial<Maintenance>) => {
    try {
      const response = await maintenanceApi.createMaintenance(maintenanceData as Maintenance)
      await fetchMaintenance()
      toast({
        title: 'Éxito',
        description: 'Mantenimiento creado exitosamente',
      })
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear mantenimiento'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    }
  }

  const scheduleMaintenance = async (vehicleId: string, startDate: string, type: 'PREVENTIVE' | 'CORRECTIVE') => {
    try {
      await maintenanceApi.scheduleMaintenance(vehicleId, startDate, type)
      await fetchMaintenance()
      toast({
        title: 'Éxito',
        description: 'Mantenimiento programado exitosamente',
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al programar mantenimiento'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    }
  }

  // const completeMaintenance = async (id: number) => {
  //   try {
  //     await maintenanceApi.completeMaintenance(id)
  //     await fetchMaintenance()
  //     toast({
  //       title: 'Éxito',
  //       description: 'Mantenimiento completado exitosamente',
  //     })
  //   } catch (err) {
  //     const errorMessage = err instanceof Error ? err.message : 'Error al completar mantenimiento'
  //     toast({
  //       title: 'Error',
  //       description: errorMessage,
  //       variant: 'destructive',
  //     })
  //     throw err
  //   }
  // }

  // const deleteMaintenance = async (id: number) => {
  //   try {
  //     // await maintenanceApi.deleteMaintenance(id) // This method does not exist in the API
  //     await fetchMaintenance()
  //     toast({
  //       title: 'Éxito',
  //       description: 'Mantenimiento eliminado exitosamente (simulado)',
  //     })
  //   } catch (err) {
  //     const errorMessage = err instanceof Error ? err.message : 'Error al eliminar mantenimiento'
  //     toast({
  //       title: 'Error',
  //       description: errorMessage,
  //       variant: 'destructive',
  //     })
  //     throw err
  //   }
  // }

  return {
    maintenance,
    loading,
    error,
    refetch: fetchMaintenance,
    createMaintenance,
    scheduleMaintenance,
    // completeMaintenance,
    // deleteMaintenance, // Commented out as it's not available in the API
  }
}

export function useActiveMaintenance() {
  const [maintenance, setMaintenance] = useState<Maintenance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchActiveMaintenance = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await maintenanceApi.getActiveMaintenance()
        setMaintenance(Array.isArray(response.data) ? response.data : [response.data].filter(Boolean))
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar mantenimientos activos'
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

    fetchActiveMaintenance()
  }, [toast])

  return { maintenance, loading, error }
}

export function useMaintenanceByVehicle(vehicleId: string) {
  const [maintenance, setMaintenance] = useState<Maintenance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchMaintenanceByVehicle = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await maintenanceApi.getMaintenanceByVehicle(vehicleId)
        setMaintenance(Array.isArray(response.data) ? response.data : [response.data].filter(Boolean))
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar mantenimientos del vehículo'
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

    if (vehicleId) {
      fetchMaintenanceByVehicle()
    }
  }, [vehicleId, toast])

  return { maintenance, loading, error }
}
