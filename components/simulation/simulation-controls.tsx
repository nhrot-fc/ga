"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { FastForward, Pause, Play, RotateCcw, Timer } from "lucide-react"

export function SimulationControls() {
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState([1])
  const [currentTime, setCurrentTime] = useState("08:00")
  const [scenario, setScenario] = useState("diario")

  const toggleSimulation = () => {
    setIsRunning(!isRunning)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentTime("08:00")
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Escenario</label>
        <Select value={scenario} onValueChange={setScenario}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar escenario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diario">Diario</SelectItem>
            <SelectItem value="semanal">Semanal</SelectItem>
            <SelectItem value="colapso">Colapso</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg flex items-center">
            <Timer className="mr-2 h-4 w-4" />
            Tiempo de Simulación
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-3xl font-bold text-center">{currentTime}</div>
          <p className="text-xs text-center text-muted-foreground mt-1">Día 1</p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Velocidad</label>
          <span className="text-sm">{speed[0]}x</span>
        </div>
        <Slider value={speed} min={1} max={10} step={1} onValueChange={setSpeed} />
      </div>

      <div className="flex justify-between gap-2">
        <Button variant="outline" size="icon" onClick={resetSimulation}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant={isRunning ? "secondary" : "default"} className="flex-1" onClick={toggleSimulation}>
          {isRunning ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pausar
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Iniciar
            </>
          )}
        </Button>
        <Button variant="outline" size="icon">
          <FastForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 pt-4 border-t">
        <h3 className="font-medium">Estadísticas en Vivo</h3>
        <div className="grid grid-cols-2 gap-2">
          <Card>
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground">Pedidos Pendientes</div>
              <div className="text-xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground">Vehículos Activos</div>
              <div className="text-xl font-bold">3/7</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground">Entregas Completadas</div>
              <div className="text-xl font-bold">8</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground">Combustible Usado</div>
              <div className="text-xl font-bold">120 L</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
