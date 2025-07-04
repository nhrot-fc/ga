import axios from 'axios';

// API types
export interface Position {
  x: number;
  y: number;
}

// Resource level type for fuel and GLP
export interface ResourceLevel {
  current: number;
  capacity: number;
  percentage: number;
}

export interface Vehicle {
  id: string;
  type: string;
  status: string;
  position: Position;
  fuel: ResourceLevel;
  glp: ResourceLevel;
  currentPath?: {
    actionType: string;
    startTime: string;
    endTime: string;
    path: Position[];
  };
}

export interface Order {
  id: string;
  position: Position;
  arriveTime?: string;
  dueTime?: string;
  glp?: {
    requested: number;
    remaining: number;
  };
  isOverdue: boolean;
}

export interface Blockage {
  id: string;
  startTime: string;
  endTime: string;
  positions: Position[];
}

export interface Depot {
  id: string;
  position: Position;
  isMain: boolean;
  canRefuel: boolean;
  glp: {
    current: number;
    capacity: number;
  };
}

export interface EnvironmentResponse {
  timestamp: string;
  simulationTime: string;
  simulationRunning: boolean;
  vehicles: Vehicle[];
  orders: Order[];
  blockages: Blockage[];
  depots: Depot[];
}

export interface SimulationStatus {
  running: boolean;
  speed: number;
  currentTime: string;
  elapsedTime: string;
}

// Interface for vehicle breakdown request
export interface VehicleBreakdownRequest {
  vehicleId: string;
  reason?: string;
  estimatedRepairHours?: number;
}

// Interface for vehicle repair request
export interface VehicleRepairRequest {
  vehicleId: string;
}

// Interface for vehicle breakdown response
export interface VehicleBreakdownResponse {
  status: string;
  message: string;
  vehicleId: string;
  reason: string;
  incidentType: string;
  breakdownTime: string;
  estimatedRepairTime: string;
  vehicleStatus: string;
}

// Interface for vehicle repair response
export interface VehicleRepairResponse {
  status: string;
  message: string;
  vehicleId: string;
  repairTime: string;
  resolvedIncidents: number;
  vehicleStatus: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// API Client for simulation endpoints
export const simulationApi = {
  // Fetch complete environment
  getEnvironment: async (): Promise<EnvironmentResponse> => {
    const response = await axios.get(`${BASE_URL}/environment`);
    return response.data;
  },

  // Fetch vehicles only
  getVehicles: async (): Promise<Vehicle[]> => {
    const response = await axios.get(`${BASE_URL}/vehicles`);
    return response.data.vehicles;
  },

  // Fetch orders only
  getOrders: async (): Promise<Order[]> => {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data.orders;
  },

  // Fetch blockages only
  getBlockages: async (): Promise<Blockage[]> => {
    const response = await axios.get(`${BASE_URL}/blockages`);
    return response.data.blockages;
  },

  // Get simulation status
  getSimulationStatus: async (): Promise<SimulationStatus> => {
    const response = await axios.get(`${BASE_URL}/simulation/status`);
    return response.data.status;
  },

  // Start or resume simulation
  startSimulation: async (): Promise<void> => {
    await axios.post(`${BASE_URL}/simulation/start`);
  },

  // Pause simulation
  pauseSimulation: async (): Promise<void> => {
    await axios.post(`${BASE_URL}/simulation/pause`);
  },
  
  // Set simulation speed
  setSimulationSpeed: async (speed: number): Promise<void> => {
    await axios.post(`${BASE_URL}/simulation/speed`, { speed });
  },
  
  // Reset simulation
  resetSimulation: async (): Promise<void> => {
    await axios.post(`${BASE_URL}/simulation/reset`);
  },

  // Mark vehicle as broken down
  breakdownVehicle: async (request: VehicleBreakdownRequest): Promise<VehicleBreakdownResponse> => {
    const response = await axios.post(`${BASE_URL}/vehicle/breakdown`, request);
    return response.data;
  },
  
  // Repair a broken down vehicle
  repairVehicle: async (request: VehicleRepairRequest): Promise<VehicleRepairResponse> => {
    const response = await axios.post(`${BASE_URL}/vehicle/repair`, request);
    return response.data;
  },

  // Check server health
  checkHealth: async (): Promise<boolean> => {
    try {
      const response = await axios.get(`${BASE_URL}/health`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
};

export default simulationApi;
