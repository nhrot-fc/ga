"use client"

import { useState, useEffect } from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { vehiclesApi, Vehicle } from '@/lib/api-client'

// Sample data structure for fuel consumption
interface FuelConsumptionData {
  day: string;
  combustible: number;
  glp: number;
}

// Map day number to day name
const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function FuelConsumptionChart() {
  const [data, setData] = useState<FuelConsumptionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFuelData = async () => {
      try {
        setLoading(true);
        // Fetch all vehicles to calculate fuel consumption
        const response = await vehiclesApi.getAllVehicles();
        
        if (response.data && Array.isArray(response.data)) {
          // Get current date and calculate dates for the past week
          const today = new Date();
          const lastWeekData: FuelConsumptionData[] = [];
          
          const vehicles = response.data as Vehicle[];
          
          // Get total current fuel and GLP across all vehicles
          const totalCurrentFuel = vehicles.reduce((sum, vehicle) => {
            return sum + (vehicle.currentFuel || 0);
          }, 0);
          
          const totalCurrentGLP = vehicles.reduce((sum, vehicle) => {
            return sum + (vehicle.currentGLP || 0);
          }, 0);
          
          // Create data for the past 7 days with variations
          for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            
            // Create a variation factor between 0.85 and 1.15 for visual diversity
            const variationFuel = 0.85 + Math.random() * 0.3;
            const variationGLP = 0.85 + Math.random() * 0.3;
            
            // Base consumption - in real app this would come from historical data
            const baseDailyFuelConsumption = Math.round(totalCurrentFuel / 7 * variationFuel);
            const baseDailyGLPConsumption = Math.round(totalCurrentGLP / 7 * variationGLP);
            
            lastWeekData.push({
              day: dayNames[date.getDay()],
              combustible: baseDailyFuelConsumption,
              glp: baseDailyGLPConsumption
            });
          }
          
          setData(lastWeekData);
        }
      } catch (err) {
        console.error("Error al cargar datos de consumo de combustible:", err);
        setError("Error al cargar los datos de consumo");
      } finally {
        setLoading(false);
      }
    };

    fetchFuelData();
  }, []);

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Cargando...</div>;
  }

  if (error) {
    return <div className="h-[300px] flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <ChartContainer
      config={{
        combustible: {
          label: "Combustible (L)",
          color: "hsl(var(--chart-4))",
        },
        glp: {
          label: "GLP (L)",
          color: "hsl(var(--chart-2))",
        }
      }}
      className="h-[300px]"
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" />
        <YAxis />
        <Bar dataKey="combustible" fill="var(--color-combustible)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="glp" fill="var(--color-glp)" radius={[4, 4, 0, 0]} />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  )
}
