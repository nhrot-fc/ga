"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock } from "lucide-react"
import { useOrders } from "@/hooks/use-orders"
import { Order } from "@/lib/api-client"

export function OrderForm() {
  const [date, setDate] = useState<Date>()
  const [deliveryTimeType, setDeliveryTimeType] = useState<"specificTime" | "timeLimit">("specificTime")
  const [time, setTime] = useState<string>("12:00")
  const [timeLimit, setTimeLimit] = useState<string>("24")
  
  const [formData, setFormData] = useState({
    posicionX: "",
    posicionY: "",
    volumen: "",
    prioridad: "normal",
    observaciones: ""
  })
  const { toast } = useToast()
  const { createOrder } = useOrders()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formData.posicionX || !formData.posicionY || !formData.volumen || !date) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    // Validar coordenadas
    const x = parseInt(formData.posicionX)
    const y = parseInt(formData.posicionY)
    
    if (isNaN(x) || isNaN(y) || x < 0 || y < 0 || x > 100 || y > 100) {
      toast({
        title: "Error",
        description: "Las coordenadas deben ser números entre 0 y 100",
        variant: "destructive",
      })
      return
    }

    const volume = parseFloat(formData.volumen)
    if (isNaN(volume) || volume <= 0) {
      toast({
        title: "Error",
        description: "El volumen debe ser un número mayor a 0",
        variant: "destructive",
      })
      return
    }

    try {
      // Calculate due date based on delivery type
      let dueDate = new Date(date)
      if (deliveryTimeType === "specificTime") {
        const [hours, minutes] = time.split(":").map(Number)
        dueDate.setHours(hours, minutes, 0, 0)
      } else {
        dueDate.setHours(dueDate.getHours() + parseInt(timeLimit))
      }

      const orderData: Partial<Order> = {
        position: { x, y },
        arriveDate: new Date().toISOString(),
        dueDate: dueDate.toISOString(),
        glpRequest: volume,
        remainingGLP: volume,
        remainingVolume: volume
      }

      await createOrder(orderData)

      // Limpiar formulario
      setFormData({
        posicionX: "",
        posicionY: "",
        volumen: "",
        prioridad: "normal",
        observaciones: ""
      })
      setDate(undefined)
      setTime("12:00")
      setTimeLimit("24")
    } catch (error) {
      // Error handling is done in the hook
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="volumen">Volumen (L)</Label>
          <Input 
            id="volumen" 
            name="volumen" 
            type="number" 
            value={formData.volumen} 
            onChange={handleChange} 
            placeholder="Volumen en litros" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label>Fecha de entrega</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tipo de entrega</Label>
          <RadioGroup 
            value={deliveryTimeType} 
            onValueChange={(v) => setDeliveryTimeType(v as "specificTime" | "timeLimit")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="specificTime" id="specificTime" />
              <Label htmlFor="specificTime" className="cursor-pointer">Hora específica</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="timeLimit" id="timeLimit" />
              <Label htmlFor="timeLimit" className="cursor-pointer">Límite de horas</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          {deliveryTimeType === "specificTime" ? (
            <>
              <Label htmlFor="time">Hora de entrega</Label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <Label htmlFor="timeLimit">Límite de horas</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="timeLimit"
                  type="number"
                  min="4"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  required
                />
                <span className="text-muted-foreground">horas</span>
              </div>
            </>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="posicionX">Posición X</Label>
          <Input 
            id="posicionX" 
            name="posicionX" 
            value={formData.posicionX} 
            onChange={handleChange} 
            placeholder="0-70" 
            type="number"
            min="0"
            max="70"
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="posicionY">Posición Y</Label>
          <Input 
            id="posicionY" 
            name="posicionY" 
            value={formData.posicionY} 
            onChange={handleChange} 
            placeholder="0-50" 
            type="number"
            min="0"
            max="50"
            required 
          />
        </div>
      </div>

      <Button type="submit" className="w-full md:w-auto">
        Registrar Pedido
      </Button>
    </form>
  )
} 