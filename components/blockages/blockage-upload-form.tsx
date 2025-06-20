"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useBlockages } from "@/hooks/use-blockages"
import { Blockage, Position } from "@/lib/api-client"

export function BlockageUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const { createBlockage } = useBlockages()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      
      // Validate file name format (aaaamm.bloqueadas)
      const fileNameRegex = /^\d{6}\.bloqueadas$/
      if (!fileNameRegex.test(selectedFile.name)) {
        setErrorMessage("El nombre del archivo debe tener el formato aaaamm.bloqueadas (ejemplo: 202501.bloqueadas)")
        setUploadStatus("error")
        setFile(null)
        return
      }
      
      setFile(selectedFile)
      setUploadStatus("idle")
      setErrorMessage("")
    }
  }

  // Helper function to parse date string in format ##d##h##m to ISO date
  const parseDateString = (dateStr: string, baseDate: Date = new Date()): string => {
    const match = dateStr.match(/^(\d{2})d(\d{2})h(\d{2})m$/)
    if (!match) return new Date().toISOString()
    
    const [_, days, hours, minutes] = match
    
    const result = new Date(baseDate)
    result.setDate(result.getDate() + parseInt(days))
    result.setHours(parseInt(hours))
    result.setMinutes(parseInt(minutes))
    result.setSeconds(0)
    
    return result.toISOString()
  }

  // Parse blockage line to create blockage objects
  const parseBlockageLine = (line: string): Blockage => {
    // Format: ##d##h##m-##d##h##m:x1,y1,x2,y2
    const [timeRange, coordinates] = line.split(':')
    const [startTimeStr, endTimeStr] = timeRange.split('-')
    
    const coords = coordinates.split(',').map(Number)
    const startNode: Position = { x: coords[0], y: coords[1] }
    const endNode: Position = { x: coords[2], y: coords[3] }
    
    // Parse the file name to get year and month for the base date
    // The file name format is aaaamm.bloqueadas (e.g., 202501.bloqueadas)
    const fileName = file?.name || ''
    const yearMonth = fileName.match(/^(\d{4})(\d{2})/)
    
    let baseDate = new Date()
    if (yearMonth) {
      const [_, year, month] = yearMonth
      baseDate = new Date(parseInt(year), parseInt(month) - 1, 1) // Month is 0-indexed
    }
    
    const startTime = parseDateString(startTimeStr, baseDate)
    const endTime = parseDateString(endTimeStr, baseDate)
    
    return {
      startNode,
      endNode,
      startTime,
      endTime
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadStatus("idle")

    try {
      // Validate file content format
      const fileContent = await file.text()
      const lines = fileContent.split('\n').filter(line => line.trim() !== '')
      
      const validFormat = lines.every(line => {
        // Check format: ##d##h##m-##d##h##m:x1,y1,x2,y2,x3,y3,x4,y4......xn,yn
        const regex = /^\d{2}d\d{2}h\d{2}m-\d{2}d\d{2}h\d{2}m:(\d+,\d+,)*\d+,\d+$/
        return regex.test(line)
      })
      
      if (!validFormat) {
        throw new Error("El formato del contenido del archivo no es válido")
      }
      
      // Process the blockages
      const blockages = lines.map(parseBlockageLine)
      
      // Create blockages through API
      for (const blockage of blockages) {
        await createBlockage(blockage)
      }
      
      setUploadStatus("success")
      setFile(null)
      
      // Reset file input
      const fileInput = document.getElementById('blockage-file') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
    } catch (error) {
      setUploadStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Error al cargar el archivo")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cargar Planificación de Bloqueos</CardTitle>
        <CardDescription>
          Sube un archivo con la planificación mensual de bloqueos de calles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="blockage-file">Archivo de bloqueos (aaaamm.bloqueadas)</Label>
            <Input
              id="blockage-file"
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground">
              Formato: aaaamm.bloqueadas (ejemplo: 202501.bloqueadas)
            </p>
          </div>
          
          {uploadStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          {uploadStatus === "success" && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Éxito</AlertTitle>
              <AlertDescription>
                El archivo de bloqueos se ha cargado correctamente
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>Procesando...</>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Cargar archivo
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
} 