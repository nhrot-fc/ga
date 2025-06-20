import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaintenanceUploadForm } from "@/components/maintenance/maintenance-upload-form"
import { MaintenanceForm } from "@/components/maintenance/maintenance-form"
import { MaintenanceTable } from "@/components/maintenance/maintenance-table"
import { Plus, Upload } from "lucide-react"

export default function MantenimientosPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Gestión de Mantenimientos</h1>
        <p className="text-muted-foreground">
          Administre los mantenimientos programados para los vehículos.
        </p>
      </div>
      
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Listado</TabsTrigger>
          <TabsTrigger value="create">Crear Mantenimiento</TabsTrigger>
          <TabsTrigger value="upload">Cargar Archivo</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <MaintenanceTable />
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4">
          <MaintenanceForm />
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4">
          <MaintenanceUploadForm />
        </TabsContent>
      </Tabs>
    </div>
  )
} 