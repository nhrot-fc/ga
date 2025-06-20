"use client"

import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ordersApi, Order } from '@/lib/api-client'

// Interface for processed order data
interface ProcessedOrder {
  id: string;
  cliente: string;
  volumen: string;
  fechaRecepcion: string;
  plazoEntrega: string;
  vehiculoAsignado: string;
  estado: string;
}

// Function to safely access order properties
const safeGetOrderProperty = (order: any, path: string[], defaultValue: any = null) => {
  let value = order;
  for (const key of path) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }
  return value ?? defaultValue;
};

export function RecentOrders() {
  const [orders, setOrders] = useState<ProcessedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await ordersApi.getAllOrders();
        
        if (response.data && Array.isArray(response.data)) {
          // Solo necesitamos los últimos 5 pedidos y los ordenamos por fecha (más reciente primero)
          const recentOrders = [...response.data]
            .sort((a, b) => {
              const dateA = new Date(safeGetOrderProperty(a, ['creationDate'], '0')).getTime();
              const dateB = new Date(safeGetOrderProperty(b, ['creationDate'], '0')).getTime();
              return dateB - dateA; // Orden descendente
            })
            .slice(0, 5);
          
          // Procesar los pedidos para adaptarlos al formato que necesitamos
          const processedOrders: ProcessedOrder[] = recentOrders.map((order: any) => {
            // Determinar estado basado en las propiedades disponibles
            const isDelivered = safeGetOrderProperty(order, ['deliveryDate'], null) !== null;
            const vehicleId = safeGetOrderProperty(order, ['assignedVehicle'], null);
            const isInProgress = vehicleId !== null && !isDelivered;
            
            let estado: string;
            if (isDelivered) {
              estado = "entregado";
            } else if (isInProgress) {
              estado = "en-ruta";
            } else {
              estado = "pendiente";
            }

            const glpRequest = safeGetOrderProperty(order, ['glpRequest'], 0);
            const glpVolumen = typeof glpRequest === 'number' ? `${glpRequest.toFixed(2)} L` : `${glpRequest} L`;

            return {
              id: safeGetOrderProperty(order, ['id'], 'sin-id'),
              cliente: safeGetOrderProperty(order, ['clientName'], 'Cliente sin nombre'),
              volumen: glpVolumen,
              fechaRecepcion: safeGetOrderProperty(order, ['creationDate'], new Date().toISOString()),
              plazoEntrega: safeGetOrderProperty(order, ['dueDate'], new Date().toISOString()),
              vehiculoAsignado: vehicleId || 'No asignado',
              estado
            };
          });
          
          setOrders(processedOrders);
        }
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setError("Error al cargar los datos de pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando pedidos...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Volumen</TableHead>
          <TableHead>Vehículo</TableHead>
          <TableHead>Plazo</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">No hay pedidos disponibles</TableCell>
          </TableRow>
        ) : (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.cliente}</TableCell>
              <TableCell>{order.volumen}</TableCell>
              <TableCell>{order.vehiculoAsignado}</TableCell>
              <TableCell>{new Date(order.plazoEntrega).toLocaleDateString("es-ES")}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.estado === "entregado" ? "default" : order.estado === "en-ruta" ? "secondary" : "outline"
                  }
                >
                  {order.estado === "entregado" ? "Entregado" : order.estado === "en-ruta" ? "En Ruta" : "Pendiente"}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
