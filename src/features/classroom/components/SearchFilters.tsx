import { Search } from 'lucide-react'
import { useState } from 'react';

interface SearchFiltersProps {
  onBuscar: (codigo: string, curso: string) => void
}

export function SearchFilters({ onBuscar }: SearchFiltersProps) {
  const [codigo, setCodigo] = useState('');
  const [curso, setCurso] = useState('');

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      
      {/* Título */}
      <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
        <Search size={20} />
        Filtros de búsqueda
      </h2>
      
      {/* Campo principal */}
      <input 
        type="text" 
        placeholder="Busque por código o curso al cual pertenece el estudiante"
        className="w-full p-2 mb-4 border border-gray-300 rounded bg-green-50"
        readOnly
      />

      {/* Inputs secundarios */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Código</label>
          <input 
            type="number"
            min = "0"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded hover:border-red-900 focus:outline-none focus:border-red-900 transition-colors" 
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Curso</label>
          <select 
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded hover:border-red-900 focus:outline-none focus:border-red-900 transition-colors"
          >
            <option value="">-</option>
          </select>
        </div>
      </div>

      {/* Botón */}
      <div className="mt-4 flex justify-end">
        <button 
            onClick={() => onBuscar(codigo, curso)}
            disabled={!codigo && !curso}
            className={`px-6 py-2 rounded flex items-center gap-2 transition-colors duration-200
                ${!codigo && !curso 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-red-900 text-white hover:bg-red-700 cursor-pointer'
                }`}
        >
            <Search size={16} />
            Buscar
        </button>
    </div>

    </div>
  )
}