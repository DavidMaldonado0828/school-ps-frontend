import type { ClassroomStudent } from '../types'
import { Pencil } from 'lucide-react'

interface StudentsTableProps {
  estudiantes: ClassroomStudent[]
  onSeleccionar: (estudiante: ClassroomStudent) => void
  mostrarActualizarCurso: boolean
}

export function StudentsTable({ estudiantes, onSeleccionar, mostrarActualizarCurso }: StudentsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
      
      {/* Botón actualizar curso */}
      {mostrarActualizarCurso && (
        <div className="flex justify-end p-4">
          <button className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-2 rounded transition-colors duration-200">
            Actualizar Curso Completo
          </button>
        </div>
      )}

      {/* Tabla */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-4 text-sm font-semibold text-gray-600">CÓDIGO</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-600">NOMBRE</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-600">CURSO</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-600">DOCENTE TITULAR</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-600">ESTADO PUPITRE</th>
            <th className="text-left p-4 text-sm font-semibold text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No se encontraron estudiantes
              </td>
            </tr>
          ) : (
            estudiantes.map((estudiante) => (
              <tr 
                key={estudiante.estudiante_id} 
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-4 text-sm">{estudiante.documento}</td>
                <td className="p-4 text-sm">{estudiante.nombre}</td>
                <td className="p-4 text-sm">{estudiante.grado_nombre}</td>
                <td className="p-4 text-sm">{estudiante.docente_titular}</td>
                <td className="p-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${estudiante.estado_pupitre === 'bueno' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                    }`}>
                    {estudiante.estado_pupitre === 'bueno' ? 'Bueno' : 'Malo'}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  <button
                    onClick={() => onSeleccionar(estudiante)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    title="Editar estado"
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}