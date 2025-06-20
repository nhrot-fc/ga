"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, CheckCircle2, Clock, Fuel, TrendingDown, TrendingUp, Truck } from "lucide-react"
import { DeliveryStatusChart } from "@/components/dashboard/delivery-status-chart"
import { FuelConsumptionChart } from "@/components/dashboard/fuel-consumption-chart"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { VehicleStatusList } from "@/components/dashboard/vehicle-status-list"
import { useDashboardMetrics } from "@/hooks/use-dashboard"

export default function DashboardPage() {
  const { metrics, loading, error } = useDashboardMetrics();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Actualizado: {new Date().toLocaleString("es-ES")}</span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="analytics">Analítica</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Pendientes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mb-2"></div>
                ) : (
                  <div className="text-2xl font-bold">{metrics.pendingOrders.count}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  {metrics.pendingOrders.changePercent < 0 ? (
                    <>
                      <TrendingDown className="mr-1 h-4 w-4 text-green-600 inline" />
                      <span>{Math.abs(metrics.pendingOrders.changePercent)}% menos que ayer</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-1 h-4 w-4 text-amber-500 inline" />
                      <span>{metrics.pendingOrders.changePercent}% más que ayer</span>
                    </>
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregas Completadas</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mb-2"></div>
                ) : (
                  <div className="text-2xl font-bold">{metrics.completedOrders.count}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  {metrics.completedOrders.changePercent > 0 ? (
                    <>
                      <TrendingUp className="mr-1 h-4 w-4 text-green-600 inline" />
                      <span>{metrics.completedOrders.changePercent}% más que ayer</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="mr-1 h-4 w-4 text-amber-500 inline" />
                      <span>{Math.abs(metrics.completedOrders.changePercent)}% menos que ayer</span>
                    </>
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vehículos Activos</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mb-2"></div>
                ) : (
                  <div className="text-2xl font-bold">{metrics.activeVehicles.active}/{metrics.activeVehicles.total}</div>
                )}
                <p className="text-xs text-muted-foreground">
                  <AlertTriangle className="mr-1 h-4 w-4 text-amber-500 inline" />
                  <span>{metrics.activeVehicles.inMaintenance} en mantenimiento</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consumo de Combustible</CardTitle>
                <Fuel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mb-2"></div>
                ) : (
                  <div className="text-2xl font-bold">{metrics.fuelConsumption.total} L</div>
                )}
                <p className="text-xs text-muted-foreground">
                  {metrics.fuelConsumption.changePercent < 0 ? (
                    <>
                      <TrendingDown className="mr-1 h-4 w-4 text-green-600 inline" />
                      <span>{Math.abs(metrics.fuelConsumption.changePercent)}% menos que ayer</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-1 h-4 w-4 text-amber-500 inline" />
                      <span>{metrics.fuelConsumption.changePercent}% más que ayer</span>
                    </>
                  )}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Estado de Entregas</CardTitle>
                <CardDescription>Distribución de entregas por estado en las últimas 24 horas</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DeliveryStatusChart />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Consumo de Combustible</CardTitle>
                <CardDescription>Consumo diario de combustible en la última semana</CardDescription>
              </CardHeader>
              <CardContent>
                <FuelConsumptionChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Pedidos Recientes</CardTitle>
                <CardDescription>Últimos pedidos registrados en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Estado de Vehículos</CardTitle>
                <CardDescription>Listado de vehículos y su estado actual</CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleStatusList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Rendimiento</CardTitle>
              <CardDescription>Métricas detalladas de rendimiento operativo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <Activity className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Seleccione parámetros para visualizar análisis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes</CardTitle>
              <CardDescription>Generación de reportes personalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <Activity className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Seleccione parámetros para generar reportes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
