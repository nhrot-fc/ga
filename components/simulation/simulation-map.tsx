"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  Minus,
  Plus,
  Truck,
  Package,
  Warehouse as WarehouseIcon,
  Building,
  User,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Ban,
  Info,
  RefreshCw,
  Play,
  Pause,
  AlertOctagon,
  Wrench as WrenchIcon
} from "lucide-react"

// Import API client and types
import simulationApi, {
  Position,
  Vehicle,
  Order,
  Blockage,
  Depot,
  EnvironmentResponse
} from '@/lib/simulation-api'

// Import Dialog components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Tipos para los elementos del mapa
type MapElement = {
  id: string
  type: "vehicle" | "warehouse" | "customer" | "mainWarehouse" | "package" | "blockedRoad"
  x: number
  y: number
  label: string
  status?: string
  direction?: "north" | "south" | "east" | "west"
  details?: string
}

// Updated type for Fuel and GLP
type ResourceLevel = {
  current: number
  capacity: number
  percentage: number
}

// Updated Vehicle type
type VehicleData = {
  id: string
  type: string
  status: string
  position: Position
  fuel: ResourceLevel
  glp: ResourceLevel
  currentPath?: {
    actionType: string
    startTime: string
    endTime: string
    path: Position[]
  }
}

// Updated Blockage type
type BlockageData = {
  id: string
  startTime: string
  endTime: string
  positions: Position[]
}

// Updated Depot type
type DepotData = {
  id: string
  position: Position
  isMain: boolean
  canRefuel: boolean
  glp: {
    current: number
    capacity: number
  }
}

// Updated Environment Response type
type EnvironmentData = {
  timestamp: string
  simulationTime: string
  simulationRunning: boolean
  vehicles: VehicleData[]
  orders: Order[]
  blockages: BlockageData[]
  depots: DepotData[]
}

// Tipo para las rutas
type Route = {
  id: string
  from: string
  to: string
  color: string
  waypoints?: { x: number, y: number }[]
}

// Tipo para carreteras bloqueadas
type BlockedRoad = {
  id: string
  from: { x: number, y: number }
  to: { x: number, y: number }
  label: string
  details: string
}

interface SimulationMapProps {
  onTimeUpdate?: (time: string, isRunning: boolean) => void;
}

export function SimulationMap({ onTimeUpdate }: SimulationMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(15) // Aumentado de 10 a 15 para mayor resolución
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedElement, setSelectedElement] = useState<MapElement | null>(null)
  const [hoveredElement, setHoveredElement] = useState<MapElement | null>(null)
  const [selectedBlockedRoad, setSelectedBlockedRoad] = useState<BlockedRoad | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })
  const [environmentData, setEnvironmentData] = useState<EnvironmentData | null>(null)
  const [mapElements, setMapElements] = useState<MapElement[]>([])
  const [blockedRoads, setBlockedRoads] = useState<BlockedRoad[]>([])
  const [simulationTime, setSimulationTime] = useState<string>("")
  const [routes, setRoutes] = useState<Route[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataError, setDataError] = useState<string | null>(null)
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false)
  const [breakdownDialogOpen, setBreakdownDialogOpen] = useState(false)
  const [breakdownReason, setBreakdownReason] = useState("")
  const [repairHours, setRepairHours] = useState(2)
  const [isBreakdownLoading, setIsBreakdownLoading] = useState(false)
  const [isRepairLoading, setIsRepairLoading] = useState(false)
  const [breakdownError, setBreakdownError] = useState<string | null>(null)
  const [repairError, setRepairError] = useState<string | null>(null)
  const [operationSuccess, setOperationSuccess] = useState<string | null>(null)

  // Function to toggle simulation
  const toggleSimulation = async (forceState?: boolean) => {
    try {
      if (forceState === true || (!forceState && !simulationRunning)) {
        await simulationApi.startSimulation();
        setSimulationRunning(true);
      } else if (forceState === false || (!forceState && simulationRunning)) {
        await simulationApi.pauseSimulation();
        setSimulationRunning(false);
      }

      // Notify parent component about state change
      if (onTimeUpdate) {
        onTimeUpdate(simulationTime, forceState === undefined ? !simulationRunning : forceState);
      }
    } catch (error) {
      console.error('Error al cambiar estado de la simulación:', error);
      setDataError('Error al cambiar el estado de la simulación');
    }
  };

  // Fetch environment data
  useEffect(() => {
    const fetchEnvironmentData = async () => {
      try {
        setIsLoading(true);
        setDataError(null);

        // Assuming simulationApi.getEnvironment() returns EnvironmentData
        const data = await simulationApi.getEnvironment();

        setEnvironmentData(data);
        setSimulationTime(data.simulationTime);
        setSimulationRunning(data.simulationRunning);

        // Notify parent component about time update if callback exists
        if (onTimeUpdate) {
          onTimeUpdate(data.simulationTime, data.simulationRunning);
        }

        // Log vehicles for debugging
        if (data.vehicles?.length > 0) {
          console.log(`📊 Recibidos ${data.vehicles.length} vehículos del API`);
        } else {
          console.warn("⚠️ No se recibieron vehículos del API");
        }

        // Transform API data to map elements
        transformDataToMapElements(data);
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Error fetch de datos:', error);
        setDataError('Error al cargar datos del entorno');
        setIsLoading(false);
      }
    };

    console.log("🔄 Iniciando fetch de datos de entorno...");
    // Initial fetch
    fetchEnvironmentData();

    // Set up interval for fetching data every second
    const intervalId = setInterval(fetchEnvironmentData, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [onTimeUpdate]);

  // Transform API data to map elements
  const transformDataToMapElements = (data: EnvironmentData) => {
    const elements: MapElement[] = [];
    const newBlockedRoads: BlockedRoad[] = [];
    const newRoutes: Route[] = [];

    // Add vehicles
    data.vehicles.forEach((vehicle) => {
      const direction = determineDirection(vehicle);

      elements.push({
        id: vehicle.id,
        type: "vehicle",
        x: vehicle.position.x,
        y: vehicle.position.y,
        label: `${vehicle.id} (${vehicle.type})`,
        status: vehicle.status === "AVAILABLE" ? "en-ruta" : "averiado",
        direction,
        details: `Tipo: ${vehicle.type} | Estado: ${vehicle.status} | Combustible: ${vehicle.fuel.current.toFixed(2)}/${vehicle.fuel.capacity.toFixed(2)} (${vehicle.fuel.percentage.toFixed(1)}%) | GLP: ${vehicle.glp.current}/${vehicle.glp.capacity} (${vehicle.glp.percentage.toFixed(1)}%)`
      });

      // If vehicle has a currentPath, add it as a route
      if (vehicle.currentPath && vehicle.currentPath.path.length > 1) {
        // Create waypoints from the path
        const waypoints = vehicle.currentPath.path.map(pos => ({ x: pos.x, y: pos.y }));

        // Determine color based on vehicle type
        let color = "#10b981"; // Default green
        if (vehicle.type === "TA") color = "#ef4444";      // Red
        else if (vehicle.type === "TB") color = "#3b82f6"; // Blue
        else if (vehicle.type === "TC") color = "#f59e0b"; // Amber
        else if (vehicle.type === "TD") color = "#8b5cf6"; // Purple

        newRoutes.push({
          id: `route-${vehicle.id}`,
          from: "origin",
          to: "destination",
          color,
          waypoints
        });
      }
    });

    // Find main depot
    const mainDepot = data.depots.find(depot => depot.isMain);
    if (mainDepot) {
      elements.push({
        id: mainDepot.id,
        type: "mainWarehouse",
        x: mainDepot.position.x,
        y: mainDepot.position.y,
        label: "Planta Principal",
        details: `ID: ${mainDepot.id} | GLP Actual: ${mainDepot.glp.current}/${mainDepot.glp.capacity} (${((mainDepot.glp.current / mainDepot.glp.capacity) * 100).toFixed(1)}%) | Recarga: ${mainDepot.canRefuel ? "Sí" : "No"}`
      });
    }

    // Add auxiliary depots
    data.depots.filter(depot => !depot.isMain).forEach((depot) => {
      elements.push({
        id: depot.id,
        type: "warehouse",
        x: depot.position.x,
        y: depot.position.y,
        label: depot.id,
        details: `ID: ${depot.id} | GLP Actual: ${depot.glp.current}/${depot.glp.capacity} (${((depot.glp.current / depot.glp.capacity) * 100).toFixed(1)}%) | Recarga: ${depot.canRefuel ? "Sí" : "No"}`
      });
    });

    // Add orders as customers with more detailed information
    data.orders.forEach((order) => {
      // Calcular porcentaje de entrega si hay información disponible
      const requestedGlp = order.glp?.requested || 0;
      // Usar remaining en lugar de delivered (que no existe en el tipo)
      const remainingGlp = order.glp?.remaining || 0;
      const deliveredGlp = requestedGlp - remainingGlp; // Calcular lo entregado como solicitado - restante
      const deliveryPercentage = requestedGlp > 0 ? ((requestedGlp - remainingGlp) / requestedGlp) * 100 : 0;
      
      // Formatear estado de entrega
      let deliveryStatus = "Pendiente";
      if (deliveryPercentage >= 100) {
        deliveryStatus = "Completado";
      } else if (deliveryPercentage > 0) {
        deliveryStatus = `En progreso (${deliveryPercentage.toFixed(1)}%)`;
      }
      
      // Usar información de vencimiento en lugar de timeRemaining (que no existe en el tipo)
      const timeInfo = order.isOverdue
        ? "Tiempo agotado"
        : deliveryPercentage >= 100
          ? "Entrega completada"
          : "Pendiente de asignación";
      
      elements.push({
        id: order.id,
        type: "customer",
        x: order.position.x,
        y: order.position.y,
        label: `Pedido: ${order.id.substring(0, 10)}`,
        details: `Solicitud: ${requestedGlp} GLP | Entregado: ${deliveredGlp} GLP (${deliveryPercentage.toFixed(1)}%) | Estado: ${deliveryStatus} | ${timeInfo} | Vencido: ${order.isOverdue ? "Sí" : "No"}`
      });
    });

    // Process blockages to create blocked roads
    // First create a unique set of blockages to avoid duplications in the API
    const uniqueBlockages = new Map();

    data.blockages
      .forEach((blockage) => {
        // Create a key based on the ID to detect duplicates
        const key = blockage.id;

        if (!uniqueBlockages.has(key)) {
          uniqueBlockages.set(key, blockage);
        }
      });

    // Convert unique blockages to blocked roads
    Array.from(uniqueBlockages.values()).forEach((blockage, index) => {
      if (blockage.positions.length >= 2) {
        // For each blockage, create segments between consecutive points
        for (let i = 0; i < blockage.positions.length - 1; i++) {
          const from = blockage.positions[i];
          const to = blockage.positions[i + 1];

          newBlockedRoads.push({
            id: `block-${blockage.id}-${i}`,
            from: { x: from.x, y: from.y },
            to: { x: to.x, y: to.y },
            label: "Carretera bloqueada",
            details: `Bloqueo activo desde ${blockage.startTime} hasta ${blockage.endTime}`
          });
        }
      }
    });

    setMapElements(elements);
    setBlockedRoads(newBlockedRoads);
    setRoutes(newRoutes);
  };

  // Helper function to determine vehicle direction based on its position history
  const determineDirection = (vehicle: VehicleData): "north" | "south" | "east" | "west" => {
    // If vehicle has a current path, determine direction from it
    if (vehicle.currentPath && vehicle.currentPath.path.length > 1) {
      // Compare current position with next path point
      const currentPos = vehicle.position;
      const nextPos = vehicle.currentPath.path[1]; // Next position in path

      // Calculate direction vector
      const dx = nextPos.x - currentPos.x;
      const dy = nextPos.y - currentPos.y;

      // Determine dominant direction
      if (Math.abs(dx) > Math.abs(dy)) {
        return dx > 0 ? "east" : "west";
      } else {
        return dy > 0 ? "north" : "south";
      }
    }

    // Fallback if no path: assign a direction based on vehicle ID
    const directions: ("north" | "south" | "east" | "west")[] = ["north", "south", "east", "west"];
    const hash = vehicle.id.charCodeAt(vehicle.id.length - 1) % directions.length;
    return directions[hash];
  };

  // Asegurar que el canvas ocupe el 100% del contenedor
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setCanvasSize({ width, height })
      }
    }

    // Actualizar tamaño inicial
    updateCanvasSize()

    // Actualizar cuando cambie el tamaño de la ventana
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [])

  // Precargar imágenes para iconos
  const [iconsLoaded, setIconsLoaded] = useState(false)
  const iconImages = useRef<Record<string, HTMLImageElement>>({})

  useEffect(() => {
    const loadIcons = async () => {
      // Crear una función para cargar una imagen con mejor manejo de errores
      const loadImage = (name: string, src: string): Promise<[string, HTMLImageElement]> => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            console.log(`✅ Icono ${name} cargado correctamente desde ${src}`)
            resolve([name, img])
          }
          img.onerror = (e) => {
            console.error(`❌ Error cargando icono ${name} desde ${src}:`, e)
            reject(new Error(`Error cargando icono ${name}`))
          }
          img.src = src
          return img
        })
      }

      console.log("🔄 Iniciando carga de iconos SVG...")

      // Cargar todas las imágenes en paralelo
      const iconPromises = [
        loadImage("warehouse", "/icons/warehouse.svg"),
        loadImage("mainWarehouse", "/icons/main-warehouse.svg"),
        loadImage("package", "/icons/package.svg"),
        loadImage("customer", "/icons/customer.svg"),
        loadImage("vehicleNorth", "/icons/truck-north.svg"),
        loadImage("vehicleSouth", "/icons/truck-south.svg"),
        loadImage("vehicleEast", "/icons/truck-east.svg"),
        loadImage("vehicleWest", "/icons/truck-west.svg"),
        loadImage("blockedRoad", "/icons/blocked-road.svg")
      ]

      try {
        const loadedIcons = await Promise.all(iconPromises)
        const iconMap: Record<string, HTMLImageElement> = {}
        loadedIcons.forEach(([name, img]) => {
          iconMap[name] = img
          console.log(`🗃️ Icono ${name} almacenado en cache`)
        })
        iconImages.current = iconMap
        console.log(`✨ Carga completa: ${Object.keys(iconMap).length} iconos disponibles`)
        setIconsLoaded(true)
      } catch (error) {
        console.error("❌ Error cargando iconos:", error)
        // Continuar aunque no se carguen los iconos, usaremos formas básicas
        setIconsLoaded(true)
      }
    }

    loadIcons()
  }, [])

  // Dibujar el mapa
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el tamaño del canvas
    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dibujar la cuadrícula
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Dibujar líneas verticales
    for (let x = 0; x <= 70; x++) {
      const canvasX = x * zoom + pan.x
      ctx.beginPath()
      ctx.moveTo(canvasX, pan.y)
      ctx.lineTo(canvasX, 50 * zoom + pan.y)
      ctx.stroke()
    }

    // Dibujar líneas horizontales
    for (let y = 0; y <= 50; y++) {
      const canvasY = y * zoom + pan.y
      ctx.beginPath()
      ctx.moveTo(pan.x, canvasY)
      ctx.lineTo(70 * zoom + pan.x, canvasY)
      ctx.stroke()
    }

    // Dibujar coordenadas en los ejes
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px sans-serif"
    for (let x = 0; x <= 70; x += 5) {
      const canvasX = x * zoom + pan.x
      ctx.fillText(`${x}`, canvasX, pan.y + 15)
    }
    for (let y = 0; y <= 50; y += 5) {
      const canvasY = y * zoom + pan.y
      ctx.fillText(`${y}`, pan.x + 5, canvasY + 4)
    }

    // Dibujar rutas primero para que estén detrás de los elementos
    routes.forEach(route => {
      if (route.waypoints && route.waypoints.length > 1) {
        ctx.strokeStyle = route.color
        ctx.lineWidth = 2
        ctx.beginPath()

        // Dibujar la línea entre waypoints
        const startX = route.waypoints[0].x * zoom + pan.x
        const startY = (50 - route.waypoints[0].y) * zoom + pan.y
        ctx.moveTo(startX, startY)

        for (let i = 1; i < route.waypoints.length; i++) {
          const x = route.waypoints[i].x * zoom + pan.x
          const y = (50 - route.waypoints[i].y) * zoom + pan.y
          ctx.lineTo(x, y)
        }

        ctx.stroke()

        // Dibujar pequeñas flechas de dirección en la ruta
        for (let i = 1; i < route.waypoints.length; i++) {
          const prevX = route.waypoints[i - 1].x * zoom + pan.x
          const prevY = (50 - route.waypoints[i - 1].y) * zoom + pan.y
          const x = route.waypoints[i].x * zoom + pan.x
          const y = (50 - route.waypoints[i].y) * zoom + pan.y

          // Punto medio donde dibujar la flecha
          const midX = (prevX + x) / 2
          const midY = (prevY + y) / 2

          // Ángulo de la línea
          const angle = Math.atan2(y - prevY, x - prevX)

          // Dibujar la flecha
          ctx.save()
          ctx.translate(midX, midY)
          ctx.rotate(angle)

          // Triángulo
          ctx.beginPath()
          ctx.moveTo(5, 0)
          ctx.lineTo(-2, 4)
          ctx.lineTo(-2, -4)
          ctx.closePath()
          ctx.fillStyle = route.color
          ctx.fill()

          ctx.restore()
        }
      }
    })

    // Dibujar carreteras bloqueadas (ahora como aristas)
    blockedRoads.forEach(road => {
      const fromX = road.from.x * zoom + pan.x
      const fromY = (50 - road.from.y) * zoom + pan.y
      const toX = road.to.x * zoom + pan.x
      const toY = (50 - road.to.y) * zoom + pan.y

      // Intentar usar la imagen SVG para el bloqueo
      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2;

      // Calcular ángulo de la línea
      const roadAngle = Math.atan2(toY - fromY, toX - fromX);

      // Dibujar la línea bloqueada con efecto de barricada
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);

      // Efecto de gradiente para la línea
      const gradient = ctx.createLinearGradient(fromX, fromY, toX, toY);
      gradient.addColorStop(0, "#ef4444");      // Rojo al inicio
      gradient.addColorStop(0.5, "#fca5a5");    // Rojo más claro en medio
      gradient.addColorStop(1, "#ef4444");      // Rojo al final

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 5 * (zoom / 15);

      // Patrón de línea más estético
      ctx.setLineDash([8 * (zoom / 15), 4 * (zoom / 15)]);
      ctx.stroke();
      ctx.setLineDash([]); // Restaurar línea sólida

      // Dibujar símbolo de bloqueo en el punto medio, con rotación según ángulo de la carretera
      ctx.save();
      ctx.translate(midX, midY);
      ctx.rotate(roadAngle);

      // Intentar usar el SVG para el bloqueo
      const blockSvgSize = 24 * (zoom / 15);
      const blockImgLoaded = iconImages.current["blockedRoad"];

      if (blockImgLoaded) {
        // Dibujar el SVG de bloqueo
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.shadowBlur = 5 * (zoom / 15);
        ctx.shadowOffsetX = 2 * (zoom / 15);
        ctx.shadowOffsetY = 2 * (zoom / 15);

        ctx.drawImage(
          blockImgLoaded,
          -blockSvgSize / 2,
          -blockSvgSize / 2,
          blockSvgSize,
          blockSvgSize
        );

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      } else {
        // Alternativa si no hay SVG: Símbolo de bloqueo mejorado
        // Fondo circular con efecto de resplandor
        const glowRadius = 16 * (zoom / 15);
        const innerRadius = 12 * (zoom / 15);

        // Resplandor exterior
        const glowGradient = ctx.createRadialGradient(0, 0, innerRadius * 0.7, 0, 0, glowRadius);
        glowGradient.addColorStop(0, "rgba(239, 68, 68, 0.7)");
        glowGradient.addColorStop(1, "rgba(239, 68, 68, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Círculo rojo
        ctx.beginPath();
        ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(239, 68, 68, 0.7)";
        ctx.fill();

        // Borde del círculo
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2 * (zoom / 15);
        ctx.beginPath();
        ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Símbolo de bloqueo (X)
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3 * (zoom / 15);
        ctx.beginPath();
        const symbolSize = 7 * (zoom / 15);
        ctx.moveTo(-symbolSize, -symbolSize);
        ctx.lineTo(symbolSize, symbolSize);
        ctx.moveTo(symbolSize, -symbolSize);
        ctx.lineTo(-symbolSize, symbolSize);
        ctx.stroke();
      }

      ctx.restore(); // Restaurar el contexto (quitar rotación)

      // Dibujar etiqueta si está seleccionada con un estilo mejorado
      if (selectedBlockedRoad?.id === road.id) {
        // Tamaño de texto basado en zoom
        const fontSize = 12 * (zoom / 15);
        ctx.font = `${fontSize}px sans-serif`;
        const textWidth = ctx.measureText(road.label).width;
        const textPadding = 8 * (zoom / 15);

        // Fondo de etiqueta con bordes redondeados
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        const labelX = midX + 18 * (zoom / 15);
        const labelY = midY - 8 * (zoom / 15);
        const cornerRadius = 4 * (zoom / 15);

        // Dibujar rectángulo redondeado
        ctx.beginPath();
        ctx.moveTo(labelX + cornerRadius, labelY);
        ctx.lineTo(labelX + textWidth + textPadding - cornerRadius, labelY);
        ctx.quadraticCurveTo(labelX + textWidth + textPadding, labelY, labelX + textWidth + textPadding, labelY + cornerRadius);
        ctx.lineTo(labelX + textWidth + textPadding, labelY + 16 * (zoom / 15) - cornerRadius);
        ctx.quadraticCurveTo(labelX + textWidth + textPadding, labelY + 16 * (zoom / 15), labelX + textWidth + textPadding - cornerRadius, labelY + 16 * (zoom / 15));
        ctx.lineTo(labelX + cornerRadius, labelY + 16 * (zoom / 15));
        ctx.quadraticCurveTo(labelX, labelY + 16 * (zoom / 15), labelX, labelY + 16 * (zoom / 15) - cornerRadius);
        ctx.lineTo(labelX, labelY + cornerRadius);
        ctx.quadraticCurveTo(labelX, labelY, labelX + cornerRadius, labelY);
        ctx.closePath();
        ctx.fill();

        // Borde sutil
        ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Texto de la etiqueta
        ctx.fillStyle = "#1f2937";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(road.label, labelX + textPadding / 2, midY);

        // Línea conectora desde el símbolo a la etiqueta
        ctx.strokeStyle = "rgba(239, 68, 68, 0.7)";
        ctx.lineWidth = 1.5 * (zoom / 15);
        ctx.beginPath();
        ctx.setLineDash([3 * (zoom / 15), 2 * (zoom / 15)]);
        ctx.moveTo(midX + 8 * (zoom / 15), midY);
        ctx.lineTo(labelX, midY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    })

    // Dibujar elementos del mapa
    mapElements.forEach((element) => {
      const x = element.x * zoom + pan.x
      const y = (50 - element.y) * zoom + pan.y // Invertir Y para que 0 esté abajo

      ctx.save()

      const isHighlighted = selectedElement?.id === element.id || hoveredElement?.id === element.id
      const scale = isHighlighted ? 1.2 : 1
      const zoomScale = zoom / 15 // Scale based on zoom level (15 is the default)

      // Dibujar círculo de selección para elementos seleccionados o con hover
      if (isHighlighted) {
        ctx.beginPath()
        ctx.arc(x, y, 22 * scale * zoomScale, 0, Math.PI * 2) // Bigger selection circle
        ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
        ctx.fill()
      }

      // Intentar usar imagenes cargadas, si no usar formas básicas
      const drawImage = (imageName: string, size: number) => {
        const img = iconImages.current[imageName]
        if (img) {
          try {
            const scaledSize = size * scale * zoomScale
            // Aplicar sombra para dar efecto de elevación
            ctx.shadowColor = "rgba(0,0,0,0.2)"
            ctx.shadowBlur = 4 * zoomScale
            ctx.shadowOffsetX = 1 * zoomScale
            ctx.shadowOffsetY = 2 * zoomScale

            // Dibujar imagen
            ctx.drawImage(img, x - scaledSize / 2, y - scaledSize / 2, scaledSize, scaledSize)

            // Resetear sombra después de dibujar
            ctx.shadowColor = "transparent"
            ctx.shadowBlur = 0
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0
            return true
          } catch (err) {
            console.error(`Error dibujando imagen ${imageName}:`, err)
            return false
          }
        } else {
          if (iconsLoaded) {
            console.warn(`Imagen no encontrada: ${imageName}`)
          }
          return false
        }
      }

      // Dibujar icono según el tipo
      switch (element.type) {
        case "mainWarehouse":
          if (!drawImage("mainWarehouse", 44)) { // Increased base size for main warehouse
            // Usar un diseño más detallado y visual para el almacén principal
            ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.shadowBlur = 6 * zoomScale;
            ctx.shadowOffsetX = 2 * zoomScale;
            ctx.shadowOffsetY = 3 * zoomScale;

            // Base del edificio principal
            const scaledSize = 22 * scale * zoomScale;
            ctx.fillStyle = "#1e40af"; // Azul oscuro
            ctx.beginPath();
            ctx.rect(x - scaledSize, y - scaledSize * 0.8, scaledSize * 2, scaledSize * 1.6);
            ctx.fill();

            // Techo
            ctx.fillStyle = "#1e3a8a"; // Azul más oscuro para el techo
            ctx.beginPath();
            ctx.moveTo(x - scaledSize * 1.2, y - scaledSize * 0.8); // Esquina superior izquierda
            ctx.lineTo(x + scaledSize * 1.2, y - scaledSize * 0.8); // Esquina superior derecha
            ctx.lineTo(x, y - scaledSize * 1.5); // Punto del techo
            ctx.closePath();
            ctx.fill();

            // Detalles de la fachada
            ctx.fillStyle = "#bfdbfe"; // Azul claro para ventanas

            // Ventanas superiores (fila)
            const windowSize = scaledSize * 0.3;
            const windowSpacing = scaledSize * 0.5;
            for (let i = -1; i <= 1; i++) {
              ctx.beginPath();
              ctx.rect(x + i * windowSpacing - windowSize / 2, y - scaledSize * 0.5, windowSize, windowSize);
              ctx.fill();
            }

            // Puerta principal
            ctx.fillStyle = "#1e3a8a"; // Azul oscuro para la puerta
            ctx.beginPath();
            ctx.rect(x - scaledSize * 0.3, y + scaledSize * 0.1, scaledSize * 0.6, scaledSize * 0.7);
            ctx.fill();

            // Línea de base (suelo)
            ctx.strokeStyle = "#334155"; // Gris oscuro
            ctx.lineWidth = 2 * zoomScale;
            ctx.beginPath();
            ctx.moveTo(x - scaledSize * 1.2, y + scaledSize * 0.8);
            ctx.lineTo(x + scaledSize * 1.2, y + scaledSize * 0.8);
            ctx.stroke();

            // Resetear sombras
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Bandera o indicador de planta principal
            ctx.fillStyle = "#ef4444"; // Rojo
            ctx.beginPath();
            ctx.moveTo(x, y - scaledSize * 1.5); // Punta del techo
            ctx.lineTo(x, y - scaledSize * 1.8); // Arriba de la bandera
            ctx.lineTo(x + scaledSize * 0.4, y - scaledSize * 1.65); // Punta de la bandera
            ctx.closePath();
            ctx.fill();
          }
          break;
        case "warehouse":
          if (!drawImage("warehouse", 38)) { // Increased base size
            // Visualización mejorada para almacenes secundarios
            ctx.shadowColor = "rgba(0,0,0,0.25)";
            ctx.shadowBlur = 5 * zoomScale;
            ctx.shadowOffsetX = 2 * zoomScale;
            ctx.shadowOffsetY = 2 * zoomScale;

            const scaledSize = 18 * scale * zoomScale;

            // Estructura principal - forma de almacén
            ctx.fillStyle = "#3b82f6"; // Azul
            ctx.beginPath();
            ctx.rect(x - scaledSize, y - scaledSize * 0.7, scaledSize * 2, scaledSize * 1.4);
            ctx.fill();

            // Techo
            ctx.fillStyle = "#2563eb"; // Azul más oscuro
            ctx.beginPath();
            ctx.moveTo(x - scaledSize * 1.1, y - scaledSize * 0.7);
            ctx.lineTo(x + scaledSize * 1.1, y - scaledSize * 0.7);
            ctx.lineTo(x + scaledSize * 0.8, y - scaledSize * 1.2);
            ctx.lineTo(x - scaledSize * 0.8, y - scaledSize * 1.2);
            ctx.closePath();
            ctx.fill();

            // Puerta de garaje/almacén
            ctx.fillStyle = "#93c5fd"; // Azul más claro
            ctx.beginPath();
            ctx.rect(x - scaledSize * 0.6, y - scaledSize * 0.1, scaledSize * 1.2, scaledSize * 0.8);
            ctx.fill();

            // Líneas horizontales de la puerta
            ctx.strokeStyle = "#2563eb"; // Azul
            ctx.lineWidth = 1 * zoomScale;
            for (let i = 1; i < 4; i++) {
              ctx.beginPath();
              ctx.moveTo(x - scaledSize * 0.6, y - scaledSize * 0.1 + i * scaledSize * 0.2);
              ctx.lineTo(x + scaledSize * 0.6, y - scaledSize * 0.1 + i * scaledSize * 0.2);
              ctx.stroke();
            }

            // Ventana circular en el techo
            ctx.fillStyle = "#bfdbfe"; // Azul muy claro
            ctx.beginPath();
            ctx.arc(x, y - scaledSize * 0.95, scaledSize * 0.15, 0, Math.PI * 2);
            ctx.fill();

            // Marco de la ventana
            ctx.strokeStyle = "#2563eb";
            ctx.lineWidth = 1 * zoomScale;
            ctx.beginPath();
            ctx.arc(x, y - scaledSize * 0.95, scaledSize * 0.15, 0, Math.PI * 2);
            ctx.stroke();

            // Cruz en la ventana
            ctx.beginPath();
            ctx.moveTo(x - scaledSize * 0.15, y - scaledSize * 0.95);
            ctx.lineTo(x + scaledSize * 0.15, y - scaledSize * 0.95);
            ctx.moveTo(x, y - scaledSize * 0.95 - scaledSize * 0.15);
            ctx.lineTo(x, y - scaledSize * 0.95 + scaledSize * 0.15);
            ctx.stroke();

            // Resetear sombras
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          }
          break;
        case "customer":
          // Intentar dibujar primero el SVG personalizado
          if (!drawImage("customer", 32)) {
            // Si no se pudo usar SVG, usar una visualización mejorada
            const customerSize = 14 * scale * zoomScale;

            // Aplicar sombras para dar profundidad
            ctx.shadowColor = "rgba(0,0,0,0.2)";
            ctx.shadowBlur = 4 * zoomScale;
            ctx.shadowOffsetX = 1 * zoomScale;
            ctx.shadowOffsetY = 2 * zoomScale;

            // Base del edificio (rectángulo redondeado)
            ctx.fillStyle = "#f59e0b"; // Ámbar para clientes
            ctx.beginPath();
            const buildingWidth = customerSize * 1.8;
            const buildingHeight = customerSize * 1.6;
            const cornerRadius = 3 * zoomScale;

            // Dibujar rectángulo redondeado
            ctx.beginPath();
            ctx.moveTo(x - buildingWidth / 2 + cornerRadius, y - buildingHeight / 2);
            ctx.lineTo(x + buildingWidth / 2 - cornerRadius, y - buildingHeight / 2);
            ctx.quadraticCurveTo(x + buildingWidth / 2, y - buildingHeight / 2, x + buildingWidth / 2, y - buildingHeight / 2 + cornerRadius);
            ctx.lineTo(x + buildingWidth / 2, y + buildingHeight / 2 - cornerRadius);
            ctx.quadraticCurveTo(x + buildingWidth / 2, y + buildingHeight / 2, x + buildingWidth / 2 - cornerRadius, y + buildingHeight / 2);
            ctx.lineTo(x - buildingWidth / 2 + cornerRadius, y + buildingHeight / 2);
            ctx.quadraticCurveTo(x - buildingWidth / 2, y + buildingHeight / 2, x - buildingWidth / 2, y + buildingHeight / 2 - cornerRadius);
            ctx.lineTo(x - buildingWidth / 2, y - buildingHeight / 2 + cornerRadius);
            ctx.quadraticCurveTo(x - buildingWidth / 2, y - buildingHeight / 2, x - buildingWidth / 2 + cornerRadius, y - buildingHeight / 2);
            ctx.closePath();
            ctx.fill();

            // Techo del edificio con forma de triángulo
            ctx.fillStyle = "#d97706"; // Ámbar más oscuro para el techo
            ctx.beginPath();
            ctx.moveTo(x, y - buildingHeight / 2 - customerSize * 0.8);
            ctx.lineTo(x - buildingWidth / 2 - customerSize * 0.3, y - buildingHeight / 2);
            ctx.lineTo(x + buildingWidth / 2 + customerSize * 0.3, y - buildingHeight / 2);
            ctx.closePath();
            ctx.fill();

            // Puerta
            ctx.fillStyle = "#7c2d12"; // Marrón oscuro
            ctx.beginPath();
            ctx.rect(x - customerSize * 0.4, y, customerSize * 0.8, customerSize * 0.8);
            ctx.fill();

            // Ventanas (2 pequeños cuadrados)
            ctx.fillStyle = "#a5f3fc"; // Azul claro
            ctx.beginPath();
            ctx.rect(x - customerSize * 0.7, y - customerSize * 0.6, customerSize * 0.5, customerSize * 0.5);
            ctx.rect(x + customerSize * 0.2, y - customerSize * 0.6, customerSize * 0.5, customerSize * 0.5);
            ctx.fill();

            // Resetear sombras
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          }

          // If the order is overdue, show indicator
          const order = environmentData?.orders.find(o => o.id === element.id);
          if (order) {
            const customerSize = 14 * scale * zoomScale;
            
            // Calcular datos de progreso para visualización
            const requestedGlp = order.glp?.requested || 0;
            const remainingGlp = order.glp?.remaining || 0;
            const deliveredGlp = requestedGlp - remainingGlp; // Calcular lo entregado como solicitado - restante
            const deliveryPercentage = requestedGlp > 0 ? ((requestedGlp - remainingGlp) / requestedGlp) * 100 : 0;

            // Draw status indicator with improved style
            const priorityColor = order.isOverdue ? "#ef4444" : // rojo para vencidos
              deliveryPercentage >= 100 ? "#10b981" : // verde para completados
              deliveryPercentage > 0 ? "#3b82f6" : // azul para en progreso
              "#f59e0b"; // ámbar para pendientes

            // Círculo de estado con mejor visualización
            ctx.fillStyle = priorityColor;
            ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.shadowBlur = 3 * zoomScale;
            ctx.shadowOffsetX = 1 * zoomScale;
            ctx.shadowOffsetY = 1 * zoomScale;
            ctx.beginPath();
            ctx.arc(x + customerSize * 1.2, y - customerSize, 7 * zoomScale, 0, Math.PI * 2);
            ctx.fill();

            // Borde del indicador
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2 * zoomScale;
            ctx.beginPath();
            ctx.arc(x + customerSize * 1.2, y - customerSize, 7 * zoomScale, 0, Math.PI * 2);
            ctx.stroke();

            // Resetear sombras
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Si está vencido, añadir un símbolo X
            if (order.isOverdue) {
              ctx.strokeStyle = "#ffffff";
              ctx.lineWidth = 2.5 * zoomScale;
              ctx.beginPath();
              ctx.moveTo(x + customerSize * 1.2 - 3.5 * zoomScale, y - customerSize - 3.5 * zoomScale);
              ctx.lineTo(x + customerSize * 1.2 + 3.5 * zoomScale, y - customerSize + 3.5 * zoomScale);
              ctx.moveTo(x + customerSize * 1.2 + 3.5 * zoomScale, y - customerSize - 3.5 * zoomScale);
              ctx.lineTo(x + customerSize * 1.2 - 3.5 * zoomScale, y - customerSize + 3.5 * zoomScale);
              ctx.stroke();
            } 
            // Si está completado, mostrar un check
            else if (deliveryPercentage >= 100) {
              ctx.strokeStyle = "#ffffff";
              ctx.lineWidth = 2.5 * zoomScale;
              ctx.beginPath();
              ctx.moveTo(x + customerSize * 1.2 - 3.5 * zoomScale, y - customerSize);
              ctx.lineTo(x + customerSize * 1.2 - 1 * zoomScale, y - customerSize + 3 * zoomScale);
              ctx.lineTo(x + customerSize * 1.2 + 3.5 * zoomScale, y - customerSize - 3 * zoomScale);
              ctx.stroke();
            }
            // Si está en progreso, mostrar un círculo parcialmente lleno
            else if (deliveryPercentage > 0) {
              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.arc(x + customerSize * 1.2, y - customerSize, 3 * zoomScale, 0, Math.PI * 2);
              ctx.fill();
            }
            // Si no está ni entregado ni vencido, mostrar exclamación
            else {
              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              // Punto de exclamación
              ctx.arc(x + customerSize * 1.2, y - customerSize + 2 * zoomScale, 1.5 * zoomScale, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillRect(x + customerSize * 1.2 - 1 * zoomScale, y - customerSize - 3.5 * zoomScale, 2 * zoomScale, 4 * zoomScale);
            }

            // Mostrar información de GLP como texto pequeño
            ctx.fillStyle = "white";
            ctx.font = `bold ${8 * zoomScale}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            
            // Mostrar información de progreso si hay entrega parcial
            let glpText = "";
            if (deliveryPercentage > 0 && deliveryPercentage < 100) {
              glpText = `${deliveredGlp}/${requestedGlp}`;
            } else {
              glpText = requestedGlp.toString();
            }

            // Fondo semi-transparente para el texto
            const textWidth = ctx.measureText(glpText).width;
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            const padding = 3 * zoomScale;
            ctx.fillRect(
              x - textWidth / 2 - padding,
              y + customerSize * 1.5 - padding,
              textWidth + padding * 2,
              10 * zoomScale + padding * 2
            );

            // Texto GLP
            ctx.fillStyle = "white";
            ctx.fillText(glpText, x, y + customerSize * 1.5 + 5 * zoomScale);
          }
          break;
        case "vehicle":
          const directionMap = {
            "north": "vehicleNorth",
            "south": "vehicleSouth",
            "east": "vehicleEast",
            "west": "vehicleWest"
          }
          const vehicleImage = element.direction ? directionMap[element.direction] : "vehicleEast"

          // Obtener el tipo de vehículo para colorear apropiadamente
          const vehicle = environmentData?.vehicles.find(v => v.id === element.id);
          const vehicleType = vehicle?.type || "";
          
          // Determinar color basado en tipo de vehículo y estado
          let vehicleColor = "#10b981"; // Verde por defecto
          if (element.status !== "en-ruta") {
            vehicleColor = "#ef4444"; // Rojo para averiados
          } else {
            // Colores por tipo de vehículo solo si está en ruta
            if (vehicleType === "TA") vehicleColor = "#ef4444";      // Rojo
            else if (vehicleType === "TB") vehicleColor = "#3b82f6"; // Azul
            else if (vehicleType === "TC") vehicleColor = "#f59e0b"; // Ámbar
            else if (vehicleType === "TD") vehicleColor = "#8b5cf6"; // Púrpura
          }

          if (!drawImage(vehicleImage, 36)) { // Increased base size
            console.log(`Dibujando vehículo ${element.id} con fallback en (${x}, ${y})`);

            // Si no hay imagen, usar representación más moderna
            const radius = 15 * scale * zoomScale;

            // Sombra para dar profundidad
            ctx.shadowColor = "rgba(0,0,0,0.3)";
            ctx.shadowBlur = 5 * zoomScale;
            ctx.shadowOffsetX = 2 * zoomScale;
            ctx.shadowOffsetY = 2 * zoomScale;

            // Círculo base
            ctx.fillStyle = vehicleColor;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();

            // Borde
            ctx.strokeStyle = "rgba(255,255,255,0.6)";
            ctx.lineWidth = 1.5 * zoomScale;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.stroke();

            // Quitar sombra para la flecha
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Dibujar flecha para dirección con estilo mejorado
            ctx.beginPath();
            ctx.fillStyle = "#ffffff";

            const arrowSize = 6 * scale * zoomScale;

            // Dibujar un triángulo en lugar de una flecha lineal
            if (element.direction === "north") {
              ctx.beginPath();
              ctx.moveTo(x, y - arrowSize * 1.2);
              ctx.lineTo(x - arrowSize, y + arrowSize * 0.5);
              ctx.lineTo(x + arrowSize, y + arrowSize * 0.5);
              ctx.closePath();
            } else if (element.direction === "south") {
              ctx.beginPath();
              ctx.moveTo(x, y + arrowSize * 1.2);
              ctx.lineTo(x - arrowSize, y - arrowSize * 0.5);
              ctx.lineTo(x + arrowSize, y - arrowSize * 0.5);
              ctx.closePath();
            } else if (element.direction === "east") {
              ctx.beginPath();
              ctx.moveTo(x + arrowSize * 1.2, y);
              ctx.lineTo(x - arrowSize * 0.5, y - arrowSize);
              ctx.lineTo(x - arrowSize * 0.5, y + arrowSize);
              ctx.closePath();
            } else { // west
              ctx.beginPath();
              ctx.moveTo(x - arrowSize * 1.2, y);
              ctx.lineTo(x + arrowSize * 0.5, y - arrowSize);
              ctx.lineTo(x + arrowSize * 0.5, y + arrowSize);
              ctx.closePath();
            }

            ctx.fill();

            // Añadir texto indicador del tipo de vehículo
            if (vehicleType) {
              ctx.fillStyle = "#ffffff";
              ctx.font = `bold ${9 * scale * zoomScale}px sans-serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(vehicleType, x, y);
            }
          }
          break;
        case "package":
          if (!drawImage("package", 30)) { // Increased base size
            // Dibujar un cuadrado con una "P"
            ctx.fillStyle = "#8b5cf6"
            ctx.beginPath()
            const scaledSize = 15 * scale * zoomScale
            ctx.rect(x - scaledSize, y - scaledSize, scaledSize * 2, scaledSize * 2)
            ctx.fill()

            ctx.fillStyle = "#ffffff"
            ctx.font = `${16 * scale * zoomScale}px sans-serif` // Font size scales with zoom
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText("P", x, y)
          }
          break;
      }

      // Dibujar etiquetas para los elementos destacados o si hay hover/selección
      if (isHighlighted || element.type === "mainWarehouse" || element.type === "warehouse") {
        // Fondo semitransparente para la etiqueta
        ctx.font = `${14 * Math.min(zoomScale, 1.5)}px sans-serif` // Scale font with zoom, but with a max
        const textWidth = ctx.measureText(element.label).width
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.fillRect(x + 18 * zoomScale, y - 10 * zoomScale, textWidth + 10, 20 * zoomScale) // Scale with zoom

        // Texto de la etiqueta
        ctx.fillStyle = "#1f2937"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(element.label, x + 23 * zoomScale, y) // Adjusted position
      }

      ctx.restore()
    })
  }, [zoom, pan, selectedElement, hoveredElement, selectedBlockedRoad, canvasSize, mapElements, blockedRoads, routes])

  // Manejar zoom
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 3, 30)) // Aumentado de 2 a 3 y máximo de 20 a 30
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 3, 8)) // Aumentado de 2 a 3 y mínimo de 5 a 8
  }

  // Encontrar elemento en coordenadas
  const findElementAtCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    // Comprobar en todos los elementos
    return mapElements.find((element) => {
      const elementX = element.x * zoom + pan.x
      const elementY = (50 - element.y) * zoom + pan.y
      const distance = Math.sqrt(Math.pow(elementX - x, 2) + Math.pow(elementY - y, 2))
      return distance < 16 // Radio de detección de clic aumentado de 12 a 16
    })
  }

  // Encontrar carretera bloqueada en coordenadas
  const findBlockedRoadAtCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    return blockedRoads.find((road) => {
      const fromX = road.from.x * zoom + pan.x
      const fromY = (50 - road.from.y) * zoom + pan.y
      const toX = road.to.x * zoom + pan.x
      const toY = (50 - road.to.y) * zoom + pan.y

      // Calcular distancia del punto a la línea
      const A = x - fromX
      const B = y - fromY
      const C = toX - fromX
      const D = toY - fromY

      const dot = A * C + B * D
      const lenSq = C * C + D * D
      let param = -1

      if (lenSq !== 0) {
        param = dot / lenSq
      }

      let xx, yy

      if (param < 0) {
        xx = fromX
        yy = fromY
      } else if (param > 1) {
        xx = toX
        yy = toY
      } else {
        xx = fromX + param * C
        yy = fromY + param * D
      }

      const dx = x - xx
      const dy = y - yy
      const distance = Math.sqrt(dx * dx + dy * dy)

      return distance < 10 // Radio de detección para carreteras bloqueadas
    })
  }

  // Manejar eventos del mouse
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const clickedElement = findElementAtCoordinates(e.clientX, e.clientY)
    const clickedBlockedRoad = findBlockedRoadAtCoordinates(e.clientX, e.clientY)

    if (clickedElement) {
      setSelectedElement(clickedElement)
      setSelectedBlockedRoad(null)
    } else if (clickedBlockedRoad) {
      setSelectedBlockedRoad(clickedBlockedRoad)
      setSelectedElement(null)
    } else {
      setSelectedElement(null)
      setSelectedBlockedRoad(null)
      setIsDragging(true)
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Actualizar elemento seleccionado en hover
    const hoveredElement = findElementAtCoordinates(e.clientX, e.clientY)
    if (hoveredElement && hoveredElement.id !== selectedElement?.id) {
      setHoveredElement(hoveredElement)
    }
    if (!hoveredElement) {
      setHoveredElement(null)
    }
    // Si está arrastrando, mover el mapa
    if (!isDragging) return

    setPan((prev) => ({
      x: prev.x + (e.clientX - dragStart.x),
      y: prev.y + (e.clientY - dragStart.y),
    }))

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle vehicle breakdown
  const handleBreakdownVehicle = async () => {
    if (!selectedElement || selectedElement.type !== "vehicle") return;

    setBreakdownDialogOpen(true);
    setBreakdownReason("");
    setRepairHours(2);
    setBreakdownError(null);
  }

  // Submit vehicle breakdown
  const submitBreakdownVehicle = async () => {
    if (!selectedElement || selectedElement.type !== "vehicle") return;
    
    try {
      setIsBreakdownLoading(true);
      setBreakdownError(null);
      
      const response = await simulationApi.breakdownVehicle({
        vehicleId: selectedElement.id,
        reason: breakdownReason || "Mechanical failure",
        estimatedRepairHours: repairHours
      });
      
      // Close dialog
      setBreakdownDialogOpen(false);
      
      // Show success message
      setOperationSuccess(`Vehículo ${selectedElement.id} averiado: ${response.incidentType}, reparación estimada: ${response.estimatedRepairTime}`);
      
      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        setOperationSuccess(null);
      }, 5000);
      
      // Force a refresh of the data
      const data = await simulationApi.getEnvironment();
      transformDataToMapElements(data);
      
    } catch (error) {
      console.error('Error al averiar vehículo:', error);
      setBreakdownError(error instanceof Error ? error.message : 'Error desconocido al averiar vehículo');
    } finally {
      setIsBreakdownLoading(false);
    }
  }

  // Handle vehicle repair
  const handleRepairVehicle = async () => {
    if (!selectedElement || selectedElement.type !== "vehicle") return;
    
    try {
      setIsRepairLoading(true);
      setRepairError(null);
      
      const response = await simulationApi.repairVehicle({
        vehicleId: selectedElement.id
      });
      
      // Show success message
      setOperationSuccess(`Vehículo ${selectedElement.id} reparado. Estado: ${response.vehicleStatus}`);
      
      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        setOperationSuccess(null);
      }, 5000);
      
      // Force a refresh of the data
      const data = await simulationApi.getEnvironment();
      transformDataToMapElements(data);
      
    } catch (error) {
      console.error('Error al reparar vehículo:', error);
      setRepairError(error instanceof Error ? error.message : 'Error desconocido al reparar vehículo');
      
      // Auto-dismiss error message after 5 seconds
      setTimeout(() => {
        setRepairError(null);
      }, 5000);
    } finally {
      setIsRepairLoading(false);
    }
  }

  return (
    <div ref={containerRef} className="relative border rounded-md overflow-hidden bg-white h-full w-full">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDragging(false)
          setHoveredElement(null)
        }}
        style={{ cursor: hoveredElement || selectedBlockedRoad ? 'pointer' : isDragging ? 'grabbing' : 'grab' }}
      />

      {/* Controles del mapa */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white/90 p-2 rounded-md shadow-sm backdrop-blur-sm">
        <Button variant="outline" size="icon" onClick={handleZoomIn} title="Acercar">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomOut} title="Alejar">
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPan({ x: 0, y: 0 })}
          title="Restablecer vista"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Tiempo de simulación */}
      {simulationTime && (
        <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-md shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Tiempo de simulación</p>
              <p className="text-xl font-bold">{simulationTime}</p>
            </div>
            <Button
              variant={simulationRunning ? "secondary" : "default"}
              size="sm"
              className="h-8"
              onClick={() => toggleSimulation()}
            >
              {simulationRunning ? (
                <>
                  <Pause className="mr-1 h-3 w-3" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="mr-1 h-3 w-3" />
                  Iniciar
                </>
              )}
            </Button>
          </div>
          <p className="text-xs mt-1 flex items-center">
            {simulationRunning ? (
              <>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                Simulación en ejecución
              </>
            ) : (
              <>
                <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-1"></span>
                Simulación detenida
              </>
            )}
          </p>
        </div>
      )}

      {/* Estado de carga */}
      {isLoading && !simulationTime && (
        <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-md shadow-sm backdrop-blur-sm">
          <div className="flex items-center">
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="text-sm">Cargando datos del entorno...</p>
          </div>
        </div>
      )}

      {/* Error de carga */}
      {dataError && (
        <div className="absolute top-20 left-4 bg-red-50 text-red-700 p-3 rounded-md shadow-sm border border-red-200">
          <div className="flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4" />
            <p className="text-sm">{dataError}</p>
            <Button
              variant="outline"
              size="sm"
              className="ml-2 text-xs border-red-300 hover:bg-red-100"
              onClick={() => setDataError(null)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}

      {/* Leyenda del mapa */}
      <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded-md shadow-sm backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#1e40af] rounded-sm"></div>
            <span className="text-xs">Almacén Principal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#3b82f6] rounded-sm"></div>
            <span className="text-xs">Almacén Secundario</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#10b981] rounded-full"></div>
            <span className="text-xs">Vehículo en Ruta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#ef4444] rounded-full"></div>
            <span className="text-xs">Vehículo Averiado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#f59e0b] rounded-sm"></div>
            <span className="text-xs">Cliente/Pedido</span>
          </div>
          <div className="flex items-center gap-2 col-span-2 md:col-span-1">
            <div className="w-4 h-4 flex items-center justify-center rounded-full bg-red-100 border border-red-500">
              <Ban className="h-3 w-3 text-red-500" />
            </div>
            <span className="text-xs">Carretera Bloqueada</span>
          </div>
        </div>
      </div>

      {/* Vehicle breakdown dialog */}
      <Dialog open={breakdownDialogOpen} onOpenChange={setBreakdownDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Simular Avería de Vehículo</DialogTitle>
            <DialogDescription>
              Configure los detalles de la avería para el vehículo {selectedElement?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Razón de la avería</Label>
              <Input 
                id="reason" 
                value={breakdownReason} 
                onChange={(e) => setBreakdownReason(e.target.value)} 
                placeholder="Mechanical failure"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="hours">Horas estimadas de reparación</Label>
              <Input 
                id="hours" 
                type="number" 
                value={repairHours} 
                onChange={(e) => setRepairHours(parseInt(e.target.value, 10) || 2)}
                min={1}
                max={48}
              />
              <div className="text-xs text-muted-foreground mt-1">
                TI1: ≤ 2 horas | TI2: 3-24 horas | TI3: &gt; 24 horas
              </div>
            </div>
          </div>
          
          {breakdownError && (
            <div className="bg-red-50 text-red-700 p-2 rounded-md text-sm">
              {breakdownError}
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setBreakdownDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={submitBreakdownVehicle}
              disabled={isBreakdownLoading}
            >
              {isBreakdownLoading ? "Procesando..." : "Confirmar Avería"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Operation success message */}
      {operationSuccess && (
        <div className="absolute top-20 left-4 bg-green-50 text-green-700 p-3 rounded-md shadow-sm border border-green-200 flex items-center justify-between">
          <p className="text-sm">{operationSuccess}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 h-6 w-6 p-0"
            onClick={() => setOperationSuccess(null)}
          >
            ×
          </Button>
        </div>
      )}

      {/* Repair error message */}
      {repairError && (
        <div className="absolute top-20 left-4 bg-red-50 text-red-700 p-3 rounded-md shadow-sm border border-red-200 flex items-center justify-between">
          <p className="text-sm">{repairError}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 h-6 w-6 p-0"
            onClick={() => setRepairError(null)}
          >
            ×
          </Button>
        </div>
      )}

      {/* Panel de detalles para elementos seleccionados */}
      {selectedElement && (
        <div className="absolute top-4 left-4 bg-white p-3 rounded-md shadow-md border max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-sm flex items-center gap-1">
              {selectedElement.type === "mainWarehouse" && <WarehouseIcon className="h-4 w-4" />}
              {selectedElement.type === "warehouse" && <Building className="h-4 w-4" />}
              {selectedElement.type === "vehicle" && <Truck className="h-4 w-4" />}
              {selectedElement.type === "customer" && <User className="h-4 w-4" />}
              {selectedElement.type === "package" && <Package className="h-4 w-4" />}
              {selectedElement.label}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setSelectedElement(null)}
            >
              ×
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Coordenadas: ({selectedElement.x}, {selectedElement.y})
          </p>

          {selectedElement.details && (
            <div className="mt-2 text-xs border-t pt-2">
              <p className="text-muted-foreground">{selectedElement.details}</p>
            </div>
          )}

          {selectedElement.type === "vehicle" && (
            <div className="mt-2 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {selectedElement.status === "en-ruta" ? (
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={handleBreakdownVehicle}
                    disabled={isBreakdownLoading}
                  >
                    <AlertOctagon className="mr-1 h-3 w-3" />
                    Simular Avería
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={handleRepairVehicle}
                    disabled={isRepairLoading}
                  >
                    <WrenchIcon className="mr-1 h-3 w-3" />
                    Reparar Vehículo
                  </Button>
                )}
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Truck className="mr-1 h-3 w-3" />
                  Ver Ruta
                </Button>
              </div>
              <div className="border-t pt-2 text-xs space-y-1">
                <h4 className="font-medium">Detalles adicionales:</h4>
                {environmentData?.vehicles.find(v => v.id === selectedElement.id) && (
                  <>
                    <p className="flex justify-between">
                      <span>Tipo:</span>
                      <span className="font-medium">{environmentData?.vehicles.find(v => v.id === selectedElement.id)?.type}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Combustible:</span>
                      <span className="font-medium">
                        {environmentData?.vehicles.find(v => v.id === selectedElement.id)?.fuel.current.toFixed(2)} / {environmentData?.vehicles.find(v => v.id === selectedElement.id)?.fuel.capacity.toFixed(2)} L
                        ({environmentData?.vehicles.find(v => v.id === selectedElement.id)?.fuel.percentage.toFixed(1)}%)
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>GLP:</span>
                      <span className="font-medium">
                        {environmentData?.vehicles.find(v => v.id === selectedElement.id)?.glp.current} / {environmentData?.vehicles.find(v => v.id === selectedElement.id)?.glp.capacity} unidades
                        ({environmentData?.vehicles.find(v => v.id === selectedElement.id)?.glp.percentage.toFixed(1)}%)
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Estado:</span>
                      <span className={`font-medium ${selectedElement.status === "en-ruta" ? "text-green-600" : "text-red-600"}`}>
                        {selectedElement.status === "en-ruta" ? "En ruta" : "Averiado"}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {(selectedElement.type === "customer" || selectedElement.type === "warehouse" || selectedElement.type === "mainWarehouse") && (
            <div className="mt-2">
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Info className="mr-1 h-3 w-3" />
                Ver Más Detalles
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Panel de detalles para carreteras bloqueadas */}
      {selectedBlockedRoad && (
        <div className="absolute top-4 left-4 bg-white p-3 rounded-md shadow-md border max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-sm flex items-center gap-1">
              <Ban className="h-4 w-4 text-red-500" />
              {selectedBlockedRoad.label}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setSelectedBlockedRoad(null)}
            >
              ×
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Desde: ({selectedBlockedRoad.from.x}, {selectedBlockedRoad.from.y})
            Hasta: ({selectedBlockedRoad.to.x}, {selectedBlockedRoad.to.y})
          </p>

          {selectedBlockedRoad.details && (
            <div className="mt-2 text-xs border-t pt-2">
              <p className="text-muted-foreground">{selectedBlockedRoad.details}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
