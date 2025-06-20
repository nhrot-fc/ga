"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, MoreHorizontal, Pencil, Trash2, PenToolIcon as Tool, AlertTriangle, Loader2 } from "lucide-react"
import { useVehicles } from "@/hooks/use-vehicles"
import type { Vehicle } from "@/lib/api-client"

interface VehiclesTableProps {
  filter?: string
}

export function VehiclesTable({ filter }: VehiclesTableProps) {
  const { vehicles, loading, error, updateVehicleStatus, deleteVehicle } = useVehicles(filter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <Badge variant="default">Disponible</Badge>
      case "IN_TRANSIT":
        return <Badge variant="secondary">En Ruta</Badge>
      case "MAINTENANCE":
        return <Badge variant="outline">Mantenimiento</Badge>
      case "BROKEN_DOWN":
        return <Badge variant="destructive">Averiado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getVehicleType = (type: string) => {
    switch (type) {
      case "TA":
        return "Cisterna Pequeña"
      case "TB":
        return "Cisterna Mediana"
      case "TC":
        return "Cisterna Grande"
      case "TD":
        return "Cisterna Extra Grande"
      default:
        return type
    }
  }

  const formatPosition = (vehicle: Vehicle) => {
    if (vehicle.currentPosition) {
      return `(${vehicle.currentPosition.x}, ${vehicle.currentPosition.y})`
    }
    return "No disponible"
  }

  const handleStatusChange = async (vehicleId: string, newStatus: string) => {
    try {
      await updateVehicleStatus(vehicleId, newStatus)
    } catch (error) {
      console.error('Error updating vehicle status:', error)
    }
  }

  const handleDelete = async (vehicleId: string) => {
    if (confirm('¿Está seguro que desea eliminar este vehículo?')) {
      try {
        await deleteVehicle(vehicleId)
      } catch (error) {
        console.error('Error deleting vehicle:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando vehículos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-600">
        <AlertTriangle className="h-8 w-8 mr-2" />
        <span>Error al cargar vehículos: {error}</span>
      </div>
    )
  }

  if (vehicles.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <span>No se encontraron vehículos</span>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Capacidad GLP</TableHead>
          <TableHead>GLP Actual</TableHead>
          <TableHead>Combustible</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Ubicación</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.id}</TableCell>
            <TableCell>{getVehicleType(vehicle.type || '')}</TableCell>
            <TableCell>{vehicle.glpCapacity?.toFixed(2) || '0'} L</TableCell>
            <TableCell>{vehicle.currentGLP?.toFixed(2) || '0'} L</TableCell>
            <TableCell>{vehicle.currentFuel?.toFixed(2) || '0'} / {vehicle.fuelCapacity?.toFixed(2) || '0'} L</TableCell>
            <TableCell>
              {getStatusBadge(vehicle.status || '')}
            </TableCell>
            <TableCell>{formatPosition(vehicle)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Ver detalles</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleStatusChange(vehicle.id || '', 'AVAILABLE')}>
                    <Tool className="mr-2 h-4 w-4" />
                    <span>Marcar como disponible</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(vehicle.id || '', 'MAINTENANCE')}>
                    <Tool className="mr-2 h-4 w-4" />
                    <span>Enviar a mantenimiento</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(vehicle.id || '', 'BROKEN_DOWN')}>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    <span>Reportar avería</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => handleDelete(vehicle.id || '')}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Eliminar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
