import { useState } from 'react'
import { SearchFilters } from '@/features/classroom/components/SearchFilters'
import { StudentsTable } from '@/features/classroom/components/StudentsTable'
import { UpdateForm } from '@/features/classroom/components/UpdateForm'
import { Toast } from '@/features/classroom/components/Toast'
import type { ClassroomStudent } from '@/features/classroom/types'

const DATOS_PRUEBA: ClassroomStudent[] = [
  { estudiante_id: 1, documento: '1', nombre: 'Juan Pérez', grado_nombre: '10-A', docente_titular: 'Prof. García', estado_pupitre: 'bueno' },
  { estudiante_id: 2, documento: '2', nombre: 'María González', grado_nombre: '10-A', docente_titular: 'Prof. García', estado_pupitre: 'malo' },
  { estudiante_id: 3, documento: '3', nombre: 'Carlos Rodríguez', grado_nombre: '10-A', docente_titular: 'Prof. García', estado_pupitre: 'bueno' },
]

export default function SalonTesoreriaPage() {
  const [estudiantes, setEstudiantes] = useState<ClassroomStudent[]>([])
  const [mostrarTabla, setMostrarTabla] = useState(false)
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<ClassroomStudent | null>(null)
  const [busquedaPorCurso, setBusquedaPorCurso] = useState(false)
  const [toastMensaje, setToastMensaje] = useState<string | null>(null)

  const handleBuscar = (codigo: string, curso: string) => {
    const resultados = DATOS_PRUEBA.filter((e) => {
      if (codigo) return e.documento === codigo
      if (curso) return e.grado_nombre === curso
      return true
    })
    setEstudiantes(resultados)
    setMostrarTabla(true)
    setEstudianteSeleccionado(null)
    setBusquedaPorCurso(!codigo && !!curso)
  }

  const handleSeleccionar = (estudiante: ClassroomStudent) => {
    setEstudianteSeleccionado(estudiante)
  }

  const handleCancelar = () => {
    setEstudianteSeleccionado(null)
  }

  const handleGuardar = (estudiante: ClassroomStudent, nuevoEstado: 'bueno' | 'malo') => {
    const actualizados = estudiantes.map((e) => {
      if (e.estudiante_id === estudiante.estudiante_id) {
        return { ...e, estado_pupitre: nuevoEstado }
      }
      return e
    })
    setEstudiantes(actualizados)
    setEstudianteSeleccionado(null)
    setToastMensaje(`Estado de ${estudiante.nombre} actualizado correctamente`)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-1">Salón Tesorería</h1>
      <p className="text-gray-500 mb-6">Control del mobiliario asignado</p>

      <SearchFilters onBuscar={handleBuscar} />

      {mostrarTabla && (
        <StudentsTable 
          estudiantes={estudiantes}
          onSeleccionar={handleSeleccionar}
          mostrarActualizarCurso={busquedaPorCurso}
        />
      )}

      {estudianteSeleccionado && (
        <UpdateForm
          estudiante={estudianteSeleccionado}
          onCancelar={handleCancelar}
          onGuardar={handleGuardar}
        />
      )}

      {toastMensaje && (
        <Toast
          mensaje={toastMensaje}
          onCerrar={() => setToastMensaje(null)}
        />
      )}

    </div>
  )
}