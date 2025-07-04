"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimulationMap } from "@/components/simulation/simulation-map"
import { SimulationResults } from "@/components/simulation/simulation-results"
import { SimulationConfig } from "@/components/simulation/simulation-config"
import { SimulationController } from "@/components/simulation/simulation-controller"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function SimulacionPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState("00:00")
  const [scenario, setScenario] = useState("tiempo-real")
  const [apiStatus, setApiStatus] = useState<"loading" | "connected" | "error">("loading")
  
  // Fecha actual para operaciones en tiempo real
  const currentDate = new Date()
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`
  const currentRealTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`
  
  // Manejar actualización de tiempo desde el componente de mapa
  const handleTimeUpdate = (time: string, running: boolean) => {
    setCurrentTime(time);
    setIsRunning(running);
    setApiStatus("connected");
  }
  
  // Manejar cambios en la simulación
  const handleSimulationChange = (running: boolean) => {
    setIsRunning(running);
  }
  
  // Manejar errores de conexión
  const handleApiError = () => {
    setApiStatus("error");
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Visualizador</h2>
      </div>

      <Tabs defaultValue="mapa" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mapa">Mapa</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
          <TabsTrigger value="resultados">Resultados</TabsTrigger>
        </TabsList>

        <TabsContent value="mapa" className="space-y-4">
          <div className="flex flex-col space-y-4">
            {/* Tarjeta principal que contiene tanto el mapa como los controles compactos */}
            <Card>
              {/* Cabecera con título y selección de modo */}
              <CardHeader className="py-3 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center">
                    <CardTitle className="text-lg">Controles del Visualizador</CardTitle>
                    {scenario !== "tiempo-real" ? (
                      <Badge variant="secondary" className="ml-2 px-2 py-0 text-xs bg-blue-100 text-blue-800">
                        Modo simulación
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="ml-2 px-2 py-0 text-xs">
                        Tiempo real
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select value={scenario} onValueChange={(value) => setScenario(value)}>
                      <SelectTrigger className="w-[180px] h-8 text-sm">
                        <SelectValue placeholder="Seleccionar modo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tiempo-real">Tiempo real</SelectItem>
                        <SelectItem value="simulacion-semanal">Simulación semanal</SelectItem>
                        <SelectItem value="simulacion-continua">Simulación continua</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {scenario !== "tiempo-real" && (
                      <div className="flex items-center bg-slate-50 px-2 py-1 rounded-md">
                        <Clock className="h-3 w-3 mr-1 text-slate-500" />
                        <span className="text-sm font-medium">{currentTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {/* Contenido con el mapa y los controles horizontales */}
              <CardContent className="p-0">
                <div className="flex flex-col">
                  {/* Panel de controles horizontales */}
                  <div className="p-2 bg-slate-50 border-b">
                    <div className="w-full">
                      <SimulationController 
                        onSimulationChange={handleSimulationChange} 
                        layout="horizontal" 
                      />
                    </div>
                  </div>
                  
                  {/* Mapa de simulación a pantalla completa */}
                  <div className="h-[calc(100vh-300px)] min-h-[500px]">
                    <SimulationMap onTimeUpdate={handleTimeUpdate} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="configuracion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Escenarios</CardTitle>
              <CardDescription>Personaliza los parámetros para cada modo de visualización</CardDescription>
            </CardHeader>
            <CardContent>
              <SimulationConfig />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resultados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas y Métricas</CardTitle>
              <CardDescription>Análisis del desempeño operativo y logístico</CardDescription>
            </CardHeader>
            <CardContent>
              <SimulationResults />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
