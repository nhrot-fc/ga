"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, Clock, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useBlockages } from "@/hooks/use-blockages"
import { Blockage, Position } from "@/lib/api-client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

// Define form schema
const formSchema = z.object({
  startNodeX: z.coerce.number().int().min(0, "Ingrese un número válido"),
  startNodeY: z.coerce.number().int().min(0, "Ingrese un número válido"),
  endNodeX: z.coerce.number().int().min(0, "Ingrese un número válido"),
  endNodeY: z.coerce.number().int().min(0, "Ingrese un número válido"),
  startDate: z.date({
    required_error: "Seleccione una fecha de inicio",
  }),
  endDate: z.date({
    required_error: "Seleccione una fecha de fin",
  }).min(new Date(), "La fecha de fin debe ser posterior a la fecha actual"),
  startHour: z.string().regex(/^([01]?[0-9]|2[0-3])$/, "Hora inválida (0-23)"),
  startMinute: z.string().regex(/^[0-5]?[0-9]$/, "Minuto inválido (0-59)"),
  endHour: z.string().regex(/^([01]?[0-9]|2[0-3])$/, "Hora inválida (0-23)"),
  endMinute: z.string().regex(/^[0-5]?[0-9]$/, "Minuto inválido (0-59)"),
}).refine(data => {
  const start = new Date(data.startDate)
  start.setHours(parseInt(data.startHour), parseInt(data.startMinute))
  
  const end = new Date(data.endDate)
  end.setHours(parseInt(data.endHour), parseInt(data.endMinute))
  
  return end > start
}, {
  message: "La fecha y hora de fin debe ser posterior a la fecha y hora de inicio",
  path: ["endDate"]
})

type FormValues = z.infer<typeof formSchema>

export function BlockageForm() {
  const { toast } = useToast()
  const { createBlockage } = useBlockages()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startNodeX: 0,
      startNodeY: 0,
      endNodeX: 0,
      endNodeY: 0,
      startHour: "08",
      startMinute: "00",
      endHour: "18",
      endMinute: "00",
    }
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // Construct start and end times
      const startTime = new Date(data.startDate)
      startTime.setHours(parseInt(data.startHour), parseInt(data.startMinute), 0, 0)
      
      const endTime = new Date(data.endDate)
      endTime.setHours(parseInt(data.endHour), parseInt(data.endMinute), 0, 0)

      // Create blockage object
      const blockageData: Blockage = {
        startNode: {
          x: data.startNodeX,
          y: data.startNodeY
        },
        endNode: {
          x: data.endNodeX,
          y: data.endNodeY
        },
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString()
      }

      await createBlockage(blockageData)

      // Reset form
      form.reset({
        startNodeX: 0,
        startNodeY: 0,
        endNodeX: 0,
        endNodeY: 0,
        startDate: undefined,
        endDate: undefined,
        startHour: "08",
        startMinute: "00",
        endHour: "18",
        endMinute: "00"
      })

      toast({
        title: "Éxito",
        description: "Bloqueo creado exitosamente",
      })

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear bloqueo",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper functions to generate hour and minute options
  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crear Bloqueo</CardTitle>
        <CardDescription>
          Ingrese los datos para crear un nuevo bloqueo en el mapa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <h3 className="text-lg font-medium">Nodo Inicial</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startNodeX"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coordenada X</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startNodeY"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coordenada Y</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <h3 className="text-lg font-medium">Nodo Final</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="endNodeX"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coordenada X</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endNodeY"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coordenada Y</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <h3 className="text-lg font-medium">Fecha y Hora de Inicio</h3>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha de Inicio</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: es })
                                ) : (
                                  <span>Seleccionar fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startHour"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hora</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Hora" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {hourOptions.map((hour) => (
                                <SelectItem key={`start-hour-${hour}`} value={hour}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startMinute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minuto</FormLabel>
                          <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Minuto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {minuteOptions.map((minute) => (
                                <SelectItem key={`start-min-${minute}`} value={minute}>
                                  {minute}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <h3 className="text-lg font-medium">Fecha y Hora de Fin</h3>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha de Fin</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: es })
                                ) : (
                                  <span>Seleccionar fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="endHour"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hora</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Hora" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {hourOptions.map((hour) => (
                                <SelectItem key={`end-hour-${hour}`} value={hour}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endMinute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minuto</FormLabel>
                          <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Minuto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {minuteOptions.map((minute) => (
                                <SelectItem key={`end-min-${minute}`} value={minute}>
                                  {minute}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando bloqueo...
                </>
              ) : (
                "Crear Bloqueo"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
