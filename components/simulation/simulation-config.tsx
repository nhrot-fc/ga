"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export function SimulationConfig() {
  const { toast } = useToast()

  const handleSaveConfig = () => {
    toast({
      title: "Configuración guardada",
      description: "Los parámetros de simulación han sido actualizados",
    })
  }

  return (
    <Tabs defaultValue="diario" className="space-y-4">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="diario">Escenario Diario</TabsTrigger>
        <TabsTrigger value="semanal">Escenario Semanal</TabsTrigger>
        <TabsTrigger value="colapso">Escenario Colapso</TabsTrigger>
      </TabsList>

      <TabsContent value="diario" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Escenario Diario</CardTitle>
            <CardDescription>Parámetros para la simulación de operaciones diarias</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="daily-horizon">Horizonte de Planificación (horas)</Label>
                <Input id="daily-horizon" type="number" defaultValue="24" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="daily-breakdown-prob">Probabilidad de Averías (%)</Label>
                <Input id="daily-breakdown-prob" type="number" defaultValue="5" min="0" max="100" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="daily-vehicles">Número de Vehículos</Label>
                <Input id="daily-vehicles" type="number" defaultValue="7" min="1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="daily-orders">Número de Pedidos</Label>
                <Input id="daily-orders" type="number" defaultValue="20" min="1" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="daily-realtime">Actualización en Tiempo Real</Label>
                <Switch id="daily-realtime" defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveConfig}>Guardar Configuración</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="semanal" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Escenario Semanal</CardTitle>
            <CardDescription>Parámetros para la simulación de operaciones semanales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weekly-horizon">Horizonte de Planificación (días)</Label>
                <Input id="weekly-horizon" type="number" defaultValue="7" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weekly-breakdown-prob">Probabilidad de Averías (%)</Label>
                <Input id="weekly-breakdown-prob" type="number" defaultValue="10" min="0" max="100" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weekly-vehicles">Número de Vehículos</Label>
                <Input id="weekly-vehicles" type="number" defaultValue="7" min="1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weekly-orders-per-day">Pedidos por Día (promedio)</Label>
                <Input id="weekly-orders-per-day" type="number" defaultValue="15" min="1" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-maintenance">Incluir Mantenimientos Programados</Label>
                <Switch id="weekly-maintenance" defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveConfig}>Guardar Configuración</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="colapso" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Escenario Colapso</CardTitle>
            <CardDescription>Parámetros para la simulación hasta el colapso operativo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="collapse-max-horizon">Horizonte Máximo (días)</Label>
                <Input id="collapse-max-horizon" type="number" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collapse-breakdown-prob">Probabilidad de Averías (%)</Label>
                <Input id="collapse-breakdown-prob" type="number" defaultValue="15" min="0" max="100" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collapse-vehicles">Número de Vehículos</Label>
                <Input id="collapse-vehicles" type="number" defaultValue="7" min="1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collapse-order-increase">Incremento Diario de Pedidos (%)</Label>
                <Input id="collapse-order-increase" type="number" defaultValue="5" min="0" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Criterios de Colapso</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="collapse-criteria-1" defaultChecked />
                  <Label htmlFor="collapse-criteria-1">Incumplimiento de Plazos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="collapse-criteria-2" defaultChecked />
                  <Label htmlFor="collapse-criteria-2">Vehículos Insuficientes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="collapse-criteria-3" defaultChecked />
                  <Label htmlFor="collapse-criteria-3">Capacidad Excedida</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="collapse-criteria-4" />
                  <Label htmlFor="collapse-criteria-4">Combustible Agotado</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveConfig}>Guardar Configuración</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
