import { Configuration, BlockagesApi, DashboardApi, DepotsApi, IncidentsApi, MaintenanceApi, OrdersApi, VehiclesApi } from '@/src/shared/api/generated'
import axios from 'axios'

// Configure axios with base URL and default settings
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

// Create axios instance with common configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for authentication if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Create API configuration
const configuration = new Configuration({
  basePath: BASE_URL,
})

// Export API instances
export const vehiclesApi = new VehiclesApi(configuration, BASE_URL, axiosInstance)
export const ordersApi = new OrdersApi(configuration, BASE_URL, axiosInstance)
export const maintenanceApi = new MaintenanceApi(configuration, BASE_URL, axiosInstance)
export const incidentsApi = new IncidentsApi(configuration, BASE_URL, axiosInstance)
export const blockagesApi = new BlockagesApi(configuration, BASE_URL, axiosInstance)
export const depotsApi = new DepotsApi(configuration, BASE_URL, axiosInstance)
export const dashboardApi = new DashboardApi(configuration, BASE_URL, axiosInstance)

// Export types for use in components
export type {
  Vehicle,
  Order,
  Maintenance,
  Incident,
  Blockage,
  Depot,
  Position,
} from '@/src/shared/api/generated'

// Export enums
export {
  VehicleTypeEnum,
  VehicleStatusEnum,
  MaintenanceTypeEnum,
  IncidentTypeEnum,
} from '@/src/shared/api/generated'
