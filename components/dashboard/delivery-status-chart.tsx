"use client"

import { useState, useEffect } from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart } from "recharts"
import { ordersApi } from '@/lib/api-client'

export function DeliveryStatusChart() {
  const [data, setData] = useState([
    { name: "Entregados", value: 0, color: "hsl(var(--chart-1))" },
    { name: "En Ruta", value: 0, color: "hsl(var(--chart-2))" },
    { name: "Pendientes", value: 0, color: "hsl(var(--chart-3))" },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch all types of orders in parallel
        const [completedResponse, pendingResponse, allResponse] = await Promise.all([
          ordersApi.getCompletedOrders(),
          ordersApi.getPendingOrders(),
          ordersApi.getAllOrders(),
        ])
        
        const completed = Array.isArray(completedResponse.data) ? completedResponse.data.length : 0
        const pending = Array.isArray(pendingResponse.data) ? pendingResponse.data.length : 0
        const total = Array.isArray(allResponse.data) ? allResponse.data.length : 0
        
        // In progress = total - (completed + pending)
        const inProgress = Math.max(0, total - (completed + pending))
        
        setData([
          { name: "Entregados", value: completed, color: "hsl(var(--chart-1))" },
          { name: "En Ruta", value: inProgress, color: "hsl(var(--chart-2))" },
          { name: "Pendientes", value: pending, color: "hsl(var(--chart-3))" },
        ])
      } catch (err) {
        setError('Error al cargar datos de entregas')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Cargando...</div>
  }

  if (error) {
    return <div className="h-[300px] flex items-center justify-center text-red-500">{error}</div>
  }

  return (
    <ChartContainer
      config={{
        Entregados: {
          label: "Entregados",
          color: "hsl(var(--chart-1))",
        },
        "En Ruta": {
          label: "En Ruta",
          color: "hsl(var(--chart-2))",
        },
        Pendientes: {
          label: "Pendientes",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}
