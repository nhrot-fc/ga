"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, CartesianGrid, Line, LineChart, Legend, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Truck, Package, Fuel, Clock, AlertTriangle } from "lucide-react"

// Datos de ejemplo para los gráficos
const deliveryData = [
  { day: "Día 1", completadas: 18, incumplidas: 0 },
  { day: "Día 2", completadas: 20, incumplidas: 0 },
  { day: "Día 3", completadas: 17, incumplidas: 1 },
  { day: "Día 4", completadas: 22, incumplidas: 0 },
  { day: "Día 5", completadas: 19, incumplidas: 2 },
  { day: "Día 6", completadas: 15, incumplidas: 3 },
  { day: "Día 7", completadas: 12, incumplidas: 5 },
]

const fuelData = [
  { day: "Día 1", consumo: 420, distancia: 350 },
  { day: "Día 2", consumo: 380, distancia: 320 },
  { day: "Día 3", consumo: 450, distancia: 380 },
  { day: "Día 4", consumo: 410, distancia: 340 },
  { day: "Día 5", consumo: 470, distancia: 400 },
  { day: "Día 6", consumo: 390, distancia: 330 },
  { day: "Día 7", consumo: 428, distancia: 360 },
]

const vehicleData = [
  { day: "Día 1", disponibles: 7, enRuta: 5, averiados: 0, mantenimiento: 2 },
  { day: "Día 2", disponibles: 6, enRuta: 6, averiados: 0, mantenimiento: 1 },
  { day: "Día 3", disponibles: 5, enRuta: 6, averiados: 1, mantenimiento: 0 },
  { day: "Día 4", disponibles: 4, enRuta: 5, averiados: 1, mantenimiento: 2 },
  { day: "Día 5", disponibles: 3, enRuta: 5, averiados: 2, mantenimiento: 0 },
  { day: "Día 6", disponibles: 2, enRuta: 4, averiados: 3, mantenimiento: 0 },
  { day: "Día 7", disponibles: 1, enRuta: 3, averiados: 4, mantenimiento: 0 },
]

const vehicleStatusData = [
  { name: "En Ruta", value: 5, color: "#10b981" },
  { name: "Disponibles", value: 3, color: "#3b82f6" },
  { name: "Averiados", value: 2, color: "#ef4444" },
  { name: "Mantenimiento", value: 1, color: "#f59e0b" },
]

const COLORS = ["#10b981", "#3b82f6", "#ef4444", "#f59e0b"];

const efficiencyData = [
  { name: "Lun", eficiencia: 92 },
  { name: "Mar", eficiencia: 88 },
  { name: "Mié", eficiencia: 95 },
  { name: "Jue", eficiencia: 90 },
  { name: "Vie", eficiencia: 87 },
  { name: "Sáb", eficiencia: 82 },
  { name: "Dom", eficiencia: 78 },
];

const timeDistributionData = [
  { name: "Conducción", value: 56, color: "#3b82f6" },
  { name: "Espera", value: 24, color: "#f59e0b" },
  { name: "Carga/Descarga", value: 20, color: "#10b981" },
];

export function SimulationResults() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Panel de Control</h3>
        <Select defaultValue="semanal">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="actual">Actual</SelectItem>
            <SelectItem value="diario">Diario</SelectItem>
            <SelectItem value="semanal">Semanal</SelectItem>
            <SelectItem value="mensual">Mensual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards Row */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <Card>
          <CardHeader className="p-3 pb-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium">Entregas</CardTitle>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+8%</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex items-center">
              <Package className="h-5 w-5 text-gray-500 mr-2" />
              <div className="text-2xl font-bold">123</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" /> 11 vs. anterior
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 pb-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">-3%</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-2xl font-bold">91.1%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-600 font-medium flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" /> 11 incumplimientos
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 pb-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium">Combustible</CardTitle>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">+2%</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex items-center">
              <Fuel className="h-5 w-5 text-gray-500 mr-2" />
              <div className="text-2xl font-bold">2,948L</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">8.2L/km promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 pb-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium">Tiempo Medio</CardTitle>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">-5%</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <div className="text-2xl font-bold">47min</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" /> -3min vs. anterior
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 pb-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium">Averías</CardTitle>
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">+4</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-gray-500 mr-2" />
              <div className="text-2xl font-bold">11</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-600 font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> 1.6/día promedio
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Entregas Diarias</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ChartContainer
              config={{
                completadas: {
                  label: "Completadas",
                  color: "#10b981",
                },
                incumplidas: {
                  label: "Incumplidas",
                  color: "#ef4444",
                },
              }}
              className="h-[220px]"
            >
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="completadas" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="incumplidas" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Consumo y Distancia</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ChartContainer
              config={{
                consumo: {
                  label: "Combustible (L)",
                  color: "#f59e0b",
                },
                distancia: {
                  label: "Distancia (km)",
                  color: "#3b82f6",
                },
              }}
              className="h-[220px]"
            >
              <LineChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="consumo"
                  stroke="#f59e0b"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="distancia"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Estado de Vehículos</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex justify-center">
            <div className="h-[400px] w-full max-w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {vehicleStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Eficiencia Diaria</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ChartContainer
              config={{
                eficiencia: {
                  label: "Eficiencia (%)",
                  color: "#3b82f6",
                },
              }}
              className="h-[200px]"
            >
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[70, 100]} />
                <Line
                  type="monotone"
                  dataKey="eficiencia"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Distribución de Tiempo</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex justify-center">
            <div className="h-[400px] w-full max-w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {timeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
