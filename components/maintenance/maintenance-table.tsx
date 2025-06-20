"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  CalendarClock, 
  Search, 
  Truck, 
  Wrench, 
  X 
} from "lucide-react"
import { useMaintenance } from "@/hooks/use-maintenance"
import { Maintenance, MaintenanceTypeEnum } from "@/lib/api-client"
import { Badge } from "@/components/ui/badge"

export function MaintenanceTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const { maintenance, loading, error } = useMaintenance()
  
  // Filter maintenance based on search term and selected type
  const filteredMaintenance = maintenance.filter(item => {
    const matchesSearch = searchTerm === "" || 
      (item.vehicleId && item.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (selectedType === "all") return matchesSearch
    
    return matchesSearch && item.type === selectedType
  })

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este mantenimiento?")) {
      console.error("Funcionalidad de eliminación no implementada")
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  const getMaintenanceTypeLabel = (type?: string) => {
    switch (type) {
      case MaintenanceTypeEnum.Preventive:
        return <Badge className="bg-blue-500">Preventivo</Badge>
      case MaintenanceTypeEnum.Corrective:
        return <Badge className="bg-amber-500">Correctivo</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  if (loading) {
    return <div className="flex justify-center p-4">Cargando mantenimientos...</div>
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mantenimientos</CardTitle>
        <CardDescription>
          Lista de mantenimientos programados para los vehículos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID de vehículo..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value={MaintenanceTypeEnum.Preventive}>Preventivo</SelectItem>
              <SelectItem value={MaintenanceTypeEnum.Corrective}>Correctivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehículo</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Fecha Fin</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaintenance.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron mantenimientos.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMaintenance.map((item) => {
                  const now = new Date()
                  const startDate = item.startDate ? new Date(item.startDate) : null
                  const endDate = item.endDate ? new Date(item.endDate) : null
                  
                  let status = "scheduled"
                  if (startDate && now >= startDate && endDate && now <= endDate) {
                    status = "in-progress"
                  } else if (endDate && now > endDate) {
                    status = "completed"
                  }
                  
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
                          {item.vehicleId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {formatDate(item.startDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {formatDate(item.endDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Wrench className="mr-2 h-4 w-4 text-muted-foreground" />
                          {getMaintenanceTypeLabel(item.type)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {status === "scheduled" && <Badge variant="outline">Programado</Badge>}
                        {status === "in-progress" && <Badge className="bg-blue-500">En Progreso</Badge>}
                        {status === "completed" && <Badge className="bg-green-500">Completado</Badge>}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(item.id || 0)}
                          disabled={status === "in-progress"}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
