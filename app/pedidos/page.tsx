import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrdersTable } from "@/components/orders/orders-table"
import { OrderUploadForm } from "@/components/orders/order-upload-form"
import { OrderForm } from "@/components/orders/order-form"
import { Plus, Upload } from "lucide-react"

export default function PedidosPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Pedidos</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Pedido
          </Button>
        </div>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
            <TabsTrigger value="en-ruta">En Ruta</TabsTrigger>
            <TabsTrigger value="entregados">Entregados</TabsTrigger>
          </TabsList>
          <div className="flex w-full max-w-sm items-center space-x-2 ml-auto">
            <Input type="text" placeholder="Buscar pedidos..." />
            <Button type="submit" variant="secondary">
              Buscar
            </Button>
          </div>
        </div>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos los Pedidos</CardTitle>
              <CardDescription>Listado completo de pedidos registrados en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pendientes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Pendientes</CardTitle>
              <CardDescription>Pedidos que aún no han sido asignados a una ruta</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="en-ruta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos En Ruta</CardTitle>
              <CardDescription>Pedidos que están actualmente en proceso de entrega</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entregados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Entregados</CardTitle>
              <CardDescription>Pedidos que han sido entregados satisfactoriamente</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Registro de Pedido</CardTitle>
            <CardDescription>Añade un nuevo pedido al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carga Masiva de Pedidos</CardTitle>
            <CardDescription>Sube un archivo con múltiples pedidos en formato CSV</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderUploadForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
