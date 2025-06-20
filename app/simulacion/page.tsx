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
          <Card className="mb-4">
            <CardHeader className="py-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-col">
                  <div className="flex items-center">
                    <CardTitle>Controles del Visualizador</CardTitle>
                    {scenario !== "tiempo-real" ? (
                      <Badge variant="secondary" className="ml-4 px-3 py-1 bg-blue-100 text-blue-800">
                        Modo simulación
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="ml-4 px-3 py-1">
                        Tiempo real
                      </Badge>
                    )}
                  </div>
                  
                  <CardDescription className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {scenario === "tiempo-real" ? (
                      <>Operaciones del día: {formattedDate}</>
                    ) : scenario === "simulacion-semanal" ? (
                      <>Periodo: 7 días | Fecha inicial: {formattedDate}</>
                    ) : (
                      <>Periodo: Simulación continua | Fecha inicial: {formattedDate}</>
                    )}
                  </CardDescription>
                </div>
                
                <div className="flex lg:items-center gap-4 flex-col lg:flex-row">
                  <div className="flex items-center gap-4">
                    <Select value={scenario} onValueChange={(value) => setScenario(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccionar modo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tiempo-real">Tiempo real</SelectItem>
                        <SelectItem value="simulacion-semanal">Simulación semanal</SelectItem>
                        <SelectItem value="simulacion-continua">Simulación continua</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {scenario !== "tiempo-real" && (
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-center border rounded-md px-3 py-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" /> Hora actual
                        </div>
                        <div className="text-2xl font-bold text-center">
                          {currentTime}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1 md:col-span-3">
              <Card>
                <CardContent className="p-0">
                  <div className="h-[calc(100vh-280px)] min-h-[600px]">
                    <SimulationMap onTimeUpdate={handleTimeUpdate} />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="col-span-1">
              <SimulationController onSimulationChange={handleSimulationChange} />
            </div>
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
