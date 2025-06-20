import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehiclesTable } from "@/components/vehicles/vehicles-table"
import { VehicleForm } from "@/components/vehicles/vehicle-form"
import { VehicleUploadForm } from "@/components/vehicles/vehicle-upload-form"
import { Plus, Upload } from "lucide-react"

export default function VehiculosPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Vehículos</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Vehículo
          </Button>
        </div>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="disponibles">Disponibles</TabsTrigger>
            <TabsTrigger value="en-ruta">En Ruta</TabsTrigger>
            <TabsTrigger value="mantenimiento">Mantenimiento</TabsTrigger>
            <TabsTrigger value="averiados">Averiados</TabsTrigger>
          </TabsList>
          <div className="flex w-full max-w-sm items-center space-x-2 ml-auto">
            <Input type="text" placeholder="Buscar vehículos..." />
            <Button type="submit" variant="secondary">
              Buscar
            </Button>
          </div>
        </div>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos los Vehículos</CardTitle>
              <CardDescription>Listado completo de vehículos registrados en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <VehiclesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disponibles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehículos Disponibles</CardTitle>
              <CardDescription>Vehículos listos para ser asignados a rutas</CardDescription>
            </CardHeader>
            <CardContent>
              <VehiclesTable filter="disponible" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="en-ruta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehículos En Ruta</CardTitle>
              <CardDescription>Vehículos que están actualmente en proceso de entrega</CardDescription>
            </CardHeader>
            <CardContent>
              <VehiclesTable filter="en-ruta" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mantenimiento" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehículos En Mantenimiento</CardTitle>
              <CardDescription>Vehículos que están en mantenimiento programado</CardDescription>
            </CardHeader>
            <CardContent>
              <VehiclesTable filter="mantenimiento" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="averiados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehículos Averiados</CardTitle>
              <CardDescription>Vehículos que están fuera de servicio por averías</CardDescription>
            </CardHeader>
            <CardContent>
              <VehiclesTable filter="averiado" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Registro de Vehículo</CardTitle>
            <CardDescription>Añade un nuevo vehículo a la flota</CardDescription>
          </CardHeader>
          <CardContent>
            <VehicleForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carga Masiva de Vehículos</CardTitle>
            <CardDescription>Sube un archivo con múltiples vehículos en formato CSV</CardDescription>
          </CardHeader>
          <CardContent>
            <VehicleUploadForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
