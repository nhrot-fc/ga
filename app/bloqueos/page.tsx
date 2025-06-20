import { BlockageUploadForm } from "@/components/blockages/blockage-upload-form"
import { BlockageForm } from "@/components/blockages/blockage-form"
import { BlockagesTable } from "@/components/blockages/blockages-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BlockagesPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Gestión de Bloqueos</h1>
        <p className="text-muted-foreground">
          Administre los bloqueos programados en las calles y cargue nuevos archivos de bloqueos.
        </p>
      </div>
      
      <div className="grid gap-6">
        <Tabs defaultValue="list">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Lista de Bloqueos</TabsTrigger>
            <TabsTrigger value="create">Crear Bloqueo</TabsTrigger>
            <TabsTrigger value="upload">Cargar Archivo</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <BlockagesTable />
          </TabsContent>
          <TabsContent value="create">
            <BlockageForm />
          </TabsContent>
          <TabsContent value="upload">
            <BlockageUploadForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 