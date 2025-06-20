"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Upload } from "lucide-react"
import { useVehicles } from "@/hooks/use-vehicles"
import { Vehicle, VehicleTypeEnum, VehicleStatusEnum } from "@/lib/api-client"

export function VehicleUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const { createVehicle } = useVehicles()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const parseCSV = (csvText: string): Vehicle[] => {
    const lines = csvText.split('\n').filter(line => line.trim())
    const headers = lines[0].split(',').map(h => h.trim())
    
    // Expected CSV format: id,type,glpCapacity,fuelCapacity,currentGLP,currentFuel,x,y
    const vehicles: Vehicle[] = []
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      if (values.length >= 8) {
        vehicles.push({
          id: values[0],
          type: values[1] as VehicleTypeEnum,
          glpCapacity: parseFloat(values[2]),
          fuelCapacity: parseFloat(values[3]),
          currentGLP: parseFloat(values[4]),
          currentFuel: parseFloat(values[5]),
          currentPosition: {
            x: parseFloat(values[6]),
            y: parseFloat(values[7])
          },
          status: VehicleStatusEnum.Available,
          currentCombinedWeightTon: 0,
          currentGlpWeightTon: 0
        })
      }
    }
    
    return vehicles
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo para cargar",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    
    try {
      const csvText = await file.text()
      const vehicles = parseCSV(csvText)
      
      if (vehicles.length === 0) {
        throw new Error("No se encontraron vehículos válidos en el archivo")
      }

      let processed = 0
      for (const vehicle of vehicles) {
        try {
          await createVehicle(vehicle)
          processed++
          setProgress((processed / vehicles.length) * 100)
        } catch (error) {
          console.error(`Error creando vehículo ${vehicle.id}:`, error)
        }
      }

      toast({
        title: "Carga completada",
        description: `Se procesaron ${processed} de ${vehicles.length} vehículos correctamente`,
      })
      setFile(null)
      setProgress(0)
    } catch (error) {
      toast({
        title: "Error en la carga",
        description: error instanceof Error ? error.message : "Error procesando el archivo",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="file">Archivo de vehículos (CSV)</Label>
        <div className="flex items-center gap-2">
          <Input id="file" type="file" accept=".csv" onChange={handleFileChange} disabled={uploading} />
          <Button type="submit" disabled={!file || uploading}>
            <Upload className="mr-2 h-4 w-4" />
            Cargar
          </Button>
        </div>
      </div>

      {file && (
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4" />
          <span>{file.name}</span>
          <span className="text-muted-foreground">({Math.round(file.size / 1024)} KB)</span>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Procesando archivo...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      )}
    </form>
  )
} 