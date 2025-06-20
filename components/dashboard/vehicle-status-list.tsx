"use client"

import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { vehiclesApi, VehicleStatusEnum, VehicleTypeEnum, Vehicle } from "@/lib/api-client"

type ProcessedVehicle = {
  id: string;
  tipo: string;
  capacidadGLP: string;
  nivelGLP: string;
  nivelCombustible: string;
  estado: string;
  ubicacion: string;
};

// Función para obtener el nombre del tipo de vehículo
const getVehicleTypeName = (type?: VehicleTypeEnum): string => {
  switch (type) {
    case VehicleTypeEnum.Ta:
      return "Cisterna Pequeña";
    case VehicleTypeEnum.Tb:
      return "Cisterna Mediana";
    case VehicleTypeEnum.Tc:
      return "Cisterna Grande";
    case VehicleTypeEnum.Td:
      return "Cisterna Extra Grande";
    default:
      return "Desconocido";
  }
};

export function VehicleStatusList() {
  const [vehicles, setVehicles] = useState<ProcessedVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await vehiclesApi.getAllVehicles();
        
        if (response.data && Array.isArray(response.data)) {
          // Procesar los vehículos para adaptarlos al formato que necesitamos
          const processedVehicles: ProcessedVehicle[] = response.data.map((vehicle: Vehicle) => {
            let estado: string;
            switch (vehicle.status) {
              case VehicleStatusEnum.Available:
                estado = "disponible";
                break;
              case VehicleStatusEnum.InTransit:
                estado = "en-ruta";
                break;
              case VehicleStatusEnum.Maintenance:
                estado = "mantenimiento";
                break;
              case VehicleStatusEnum.BrokenDown:
                estado = "averiado";
                break;
              default:
                estado = "desconocido";
            }

            return {
              id: vehicle.id || "sin-id",
              tipo: getVehicleTypeName(vehicle.type),
              capacidadGLP: `${vehicle.glpCapacity?.toFixed(2) || 0} L`,
              nivelGLP: `${vehicle.currentGLP?.toFixed(2) || 0} L`,
              nivelCombustible: `${vehicle.currentFuel?.toFixed(2) || 0}/${vehicle.fuelCapacity?.toFixed(2) || 0} L`,
              estado,
              ubicacion: (vehicle.currentPosition?.x !== undefined && vehicle.currentPosition?.y !== undefined)
                ? `(${vehicle.currentPosition.x}, ${vehicle.currentPosition.y})`
                : "Desconocida",
            };
          });
          
          setVehicles(processedVehicles);
        }
      } catch (err) {
        console.error("Error al cargar vehículos:", err);
        setError("Error al cargar los datos de vehículos");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando vehículos...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>GLP</TableHead>
          <TableHead>Combustible</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Ubicación</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">No hay vehículos disponibles</TableCell>
          </TableRow>
        ) : (
          vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">{vehicle.id}</TableCell>
              <TableCell>{vehicle.tipo}</TableCell>
              <TableCell>{vehicle.nivelGLP}</TableCell>
              <TableCell>{vehicle.nivelCombustible}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    vehicle.estado === "disponible"
                      ? "default"
                      : vehicle.estado === "en-ruta"
                        ? "secondary"
                        : vehicle.estado === "mantenimiento"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {vehicle.estado === "disponible"
                    ? "Disponible"
                    : vehicle.estado === "en-ruta"
                      ? "En Ruta"
                      : vehicle.estado === "mantenimiento"
                        ? "Mantenimiento"
                        : "Averiado"}
                </Badge>
              </TableCell>
              <TableCell>{vehicle.ubicacion}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
