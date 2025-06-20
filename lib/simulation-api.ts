import axios from 'axios';

// API types
export interface Position {
  x: number;
  y: number;
}

export interface Vehicle {
  id: string;
  type: string;
  status: string;
  position: Position;
  fuel: number;
  glp: number;
  path?: Position[];
}

export interface Order {
  id: string;
  position: Position;
  glpRequest: number;
  delivered: boolean;
  overdue: boolean;
}

export interface Blockage {
  active: boolean;
  points: Position[];
}

export interface Depot {
  id: string;
  position: Position;
  isMain: boolean;
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
    return response.data;
  },

  // Fetch orders only
  getOrders: async (): Promise<Order[]> => {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data;
  },

  // Fetch blockages only
  getBlockages: async (): Promise<Blockage[]> => {
    const response = await axios.get(`${BASE_URL}/blockages`);
    return response.data;
  },

  // Get simulation status
  getSimulationStatus: async (): Promise<SimulationStatus> => {
    const response = await axios.get(`${BASE_URL}/simulation/status`);
    return response.data;
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
