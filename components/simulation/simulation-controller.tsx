"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FastForward, Pause, Play, RotateCcw, Timer, Clock } from "lucide-react"
import simulationApi, { SimulationStatus } from "@/lib/simulation-api"

interface SimulationControllerProps {
  onSimulationChange?: (isRunning: boolean) => void;
  layout?: "vertical" | "horizontal";
}

export function SimulationController({ onSimulationChange, layout = "vertical" }: SimulationControllerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState("00:00")
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [status, setStatus] = useState<SimulationStatus | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0) // Tiempo en segundos desde que se cargó el componente
  const startTimeRef = useRef<number>(Date.now()) // Tiempo de referencia

  // Iniciar contador de tiempo transcurrido con persistencia en sessionStorage
  useEffect(() => {
    // Recuperar tiempo inicial de sessionStorage o usar el actual
    const storedStartTime = sessionStorage.getItem('simulationStartTime');
    const storedElapsedTime = sessionStorage.getItem('simulationElapsedTime');
    
    // Si hay un tiempo guardado, usarlo como base
    if (storedStartTime && storedElapsedTime) {
      startTimeRef.current = parseInt(storedStartTime);
      setElapsedTime(parseInt(storedElapsedTime));
    } else {
      // Si es la primera vez, guardar el tiempo actual
      startTimeRef.current = Date.now();
      sessionStorage.setItem('simulationStartTime', startTimeRef.current.toString());
      sessionStorage.setItem('simulationElapsedTime', '0');
    }
    
    // Actualizar el contador cada segundo
    const intervalId = setInterval(() => {
      const secondsElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(secondsElapsed);
      // Guardar el tiempo transcurrido en sessionStorage
      sessionStorage.setItem('simulationElapsedTime', secondsElapsed.toString());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Formatear tiempo transcurrido (HH:MM:SS)
  const formatElapsedTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Fetch simulation status
  useEffect(() => {
    const fetchSimulationStatus = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        const statusData = await simulationApi.getSimulationStatus();
        setStatus(statusData);
        setIsRunning(statusData.running);
        setCurrentTime(statusData.currentTime);
        
        if (onSimulationChange) {
          onSimulationChange(statusData.running);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching simulation status:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchSimulationStatus();
    
    // Actualizar cada segundo
    const intervalId = setInterval(fetchSimulationStatus, 1000);
    
    return () => clearInterval(intervalId);
  }, [onSimulationChange]);

  const toggleSimulation = async () => {
    try {
      setIsLoading(true);
      
      if (isRunning) {
        await simulationApi.pauseSimulation();
        setIsRunning(false);
      } else {
        await simulationApi.startSimulation();
        setIsRunning(true);
      }
      
      if (onSimulationChange) {
        onSimulationChange(!isRunning);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error toggling simulation:", error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const resetSimulation = async () => {
    try {
      setIsLoading(true);
      await simulationApi.resetSimulation();
      setIsRunning(false);
      setCurrentTime("00:00");
      
      // Reiniciar también el contador de tiempo transcurrido
      const newStartTime = Date.now();
      startTimeRef.current = newStartTime;
      sessionStorage.setItem('simulationStartTime', newStartTime.toString());
      sessionStorage.setItem('simulationElapsedTime', '0');
      setElapsedTime(0);
      
      if (onSimulationChange) {
        onSimulationChange(false);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error resetting simulation:", error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  // Render para layout horizontal (compacto)
  if (layout === "horizontal") {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetSimulation} 
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
          
          <Button 
            variant={isRunning ? "secondary" : "default"} 
            size="sm"
            onClick={toggleSimulation}
            disabled={isLoading}
            className="h-8"
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="animate-spin mr-1 h-3 w-3 border-2 border-white border-t-transparent rounded-full"></div>
                <span className="text-xs">Cargando...</span>
              </span>
            ) : isRunning ? (
              <>
                <Pause className="mr-1 h-3 w-3" />
                <span className="text-xs">Pausar</span>
              </>
            ) : (
              <>
                <Play className="mr-1 h-3 w-3" />
                <span className="text-xs">Iniciar</span>
              </>
            )}
          </Button>
        </div>
        
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <div className="bg-slate-100 px-2 py-1 rounded text-center flex items-center gap-1">
            <div className="text-xs text-slate-500">Estado:</div>
            <div className={`text-xs font-bold ${status?.running ? "text-green-600" : "text-slate-500"}`}>
              {status?.running ? "ACTIVO" : "PAUSADO"}
            </div>
          </div>
          
          <div className="bg-slate-100 px-2 py-1 rounded text-center flex items-center gap-1">
            <Clock className="h-3 w-3 text-slate-500" />
            <div className="text-xs text-slate-500">Transcurrido:</div>
            <div className="text-xs font-bold text-slate-700">
              {formatElapsedTime(elapsedTime)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render para layout vertical (original)
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-lg flex items-center">
            <Timer className="mr-2 h-4 w-4" />
            Control de Simulación
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-3xl font-bold text-center mb-4">{currentTime}</div>
          
          <div className="space-y-4">
            <div className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={resetSimulation} 
                disabled={isLoading}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button 
                variant={isRunning ? "secondary" : "default"} 
                className="flex-1" 
                onClick={toggleSimulation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Cargando...
                  </span>
                ) : isRunning ? (
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
              <Button variant="outline" size="icon" disabled={isLoading}>
                <FastForward className="h-4 w-4" />
              </Button>
            </div>
            
            {hasError && (
              <p className="text-xs text-red-500 text-center">
                Error al conectar con la API de simulación
              </p>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-medium mb-3">Estadísticas en Vivo</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-2 rounded-md text-center">
                <div className="text-xs text-slate-500">Estado</div>
                <div className={`text-xl font-bold ${status?.running ? "text-green-600" : "text-slate-500"}`}>
                  {status?.running ? "ACTIVO" : "PAUSADO"}
                </div>
              </div>
              
              <div className="bg-slate-50 p-2 rounded-md text-center">
                <div className="text-xs text-slate-500">Hora Simulación</div>
                <div className="text-xl font-bold text-slate-700">
                  {status?.currentTime || "-"}
                </div>
              </div>
              
              <div className="bg-slate-50 p-2 rounded-md text-center col-span-2">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <div className="text-xs text-slate-500">Tiempo Transcurrido</div>
                </div>
                <div className="text-xl font-bold text-slate-700">
                  {formatElapsedTime(elapsedTime)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
