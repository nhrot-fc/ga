import { useState, useEffect } from 'react'
import { dashboardApi, ordersApi, vehiclesApi, VehicleStatusEnum, Vehicle } from '@/lib/api-client'
import { useToast } from '@/components/ui/use-toast'

export function useDashboardOverview() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await dashboardApi.getDashboardOverview()
        setData(response.data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar datos del dashboard'
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

    fetchDashboardData()
  }, [toast])

  return { data, loading, error }
}

export function useVehicleStatusBreakdown() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchVehicleStatus = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await dashboardApi.getVehicleStatusBreakdown()
        setData(response.data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar estado de vehículos'
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

    fetchVehicleStatus()
  }, [toast])

  return { data, loading, error }
}

export function useSystemHealth() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSystemHealth = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await dashboardApi.getSystemHealth()
        setData(response.data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar salud del sistema'
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

    fetchSystemHealth()
  }, [toast])

  return { data, loading, error }
}

export interface DashboardMetrics {
  pendingOrders: {
    count: number;
    changePercent: number;
  };
  completedOrders: {
    count: number;
    changePercent: number;
  };
  activeVehicles: {
    active: number;
    total: number;
    inMaintenance: number;
  };
  fuelConsumption: {
    total: number;
    changePercent: number;
  };
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    pendingOrders: { count: 0, changePercent: 0 },
    completedOrders: { count: 0, changePercent: 0 },
    activeVehicles: { active: 0, total: 0, inMaintenance: 0 },
    fuelConsumption: { total: 0, changePercent: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        
        // Fetch data needed for the metrics in parallel
        const [pendingResponse, completedResponse, vehicleResponse] = await Promise.all([
          ordersApi.getPendingOrders(),
          ordersApi.getCompletedOrders(),
          vehiclesApi.getAllVehicles()
        ]);
        
        // Calculate pending orders metrics
        const pendingOrders = Array.isArray(pendingResponse.data) ? pendingResponse.data.length : 0;
        // In a real app, you would compare with historical data
        // Simulating a change percentage for visualization
        const pendingChangePercent = Math.round((Math.random() > 0.5 ? -1 : 1) * Math.random() * 15);
        
        // Calculate completed orders metrics
        const completedOrders = Array.isArray(completedResponse.data) ? completedResponse.data.length : 0;
        // Simulating a change percentage for visualization
        const completedChangePercent = Math.round((Math.random() > 0.5 ? -1 : 1) * Math.random() * 15);
        
        // Calculate vehicle metrics
        let totalVehicles = 0;
        let activeVehicles = 0;
        let inMaintenance = 0;
        let totalFuel = 0;
        
        if (Array.isArray(vehicleResponse.data)) {
          const vehicles = vehicleResponse.data as Vehicle[];
          totalVehicles = vehicles.length;
          
          vehicles.forEach(vehicle => {
            if (vehicle.status === VehicleStatusEnum.Available || vehicle.status === VehicleStatusEnum.InTransit) {
              activeVehicles++;
            }
            if (vehicle.status === VehicleStatusEnum.Maintenance) {
              inMaintenance++;
            }
            
            // Para el consumo de combustible podemos sumar el combustible actual
            if (vehicle.currentFuel !== undefined) {
              totalFuel += vehicle.currentFuel;
            }
          });
        }
        
        // Simulating a change percentage for fuel consumption
        const fuelChangePercent = Math.round((Math.random() > 0.5 ? -1 : 1) * Math.random() * 10);
        
        // Update metrics state
        setMetrics({
          pendingOrders: {
            count: pendingOrders,
            changePercent: pendingChangePercent
          },
          completedOrders: {
            count: completedOrders,
            changePercent: completedChangePercent
          },
          activeVehicles: {
            active: activeVehicles,
            total: totalVehicles,
            inMaintenance: inMaintenance
          },
          fuelConsumption: {
            total: Math.round(totalFuel),
            changePercent: fuelChangePercent
          }
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar métricas del dashboard';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [toast]);

  return { metrics, loading, error };
}
