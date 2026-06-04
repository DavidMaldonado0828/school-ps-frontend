import type { ClassroomStudent } from '../types'
import { useState } from 'react'

interface UpdateFormProps {
  estudiante: ClassroomStudent
  onCancelar: () => void
  onGuardar: (estudiante: ClassroomStudent, nuevoEstado: 'bueno' | 'malo') => void
}

export function UpdateForm({ estudiante, onCancelar, onGuardar }: UpdateFormProps) {
  const [estado, setEstado] = useState<'bueno' | 'malo'>(estudiante.estado_pupitre)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 p-6">
      
      {/* Título */}
      <h2 className="text-lg font-semibold mb-4">
        Actualizar Estado del Pupitre - {estudiante.nombre}
      </h2>

      {/* Radio buttons */}
      <p className="text-sm font-medium mb-2">Estado</p>
      <div className="flex gap-6 mb-6">
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio"
            name="estado"
            value="bueno"
            checked={estado === 'bueno'}
            onChange={() => setEstado('bueno')}
          />
          Bueno
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio"
            name="estado"
            value="malo"
            checked={estado === 'malo'}
            onChange={() => setEstado('malo')}
          />
          Malo
        </label>

      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancelar}
          className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          onClick={() => onGuardar(estudiante, estado)}
          className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200 flex items-center gap-2"
        >
          ✓ Guardar
        </button>
      </div>

    </div>
  )
}