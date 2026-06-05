import { Search } from 'lucide-react'
import { useState } from 'react'
import { DataTable } from '@/shared/ui'
import { Button } from '@/shared/ui/atoms/Button'
import { Badge } from '@/shared/ui/atoms/Badge'
import { useLoadPupitresByGrade } from '../hooks/useLoadPupitresByGrade'
import type { PupitreByGrade } from '../types'

const PUPITRE_COLUMNS = [
  { key: 'documento', label: 'Código' },
  { key: 'nombre_estudiante', label: 'Nombre' },
  { key: 'grado', label: 'Curso' },
  {
    key: 'estado_pupitre',
    label: 'Estado Pupitre',
    render: (value: unknown) => {
      const estado = value as boolean
      return (
        <Badge variant={estado ? 'green' : 'red'}>
          {estado ? 'Bueno' : 'Malo'}
        </Badge>
      )
    },
  },
]

interface PupitresByGradeSectionProps {
  onSeleccionar: (pupitre: PupitreByGrade) => void
}

export const PupitresByGradeSection = ({ onSeleccionar }: PupitresByGradeSectionProps) => {
  const [gradoSeleccionado, setGradoSeleccionado] = useState<number | null>(null)
  const { loading, error, grados, pupitres, fetchPupitresByGrade } = useLoadPupitresByGrade()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (gradoSeleccionado) {
      void fetchPupitresByGrade(gradoSeleccionado)
    }
  }

  const data = pupitres.map((p) => ({ ...p, id: p.id }))

  return (
    <div className="card" style={{ marginTop: '24px' }}>

      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '16px' }}>
        <Search size={20} /> Buscar por Curso
      </h3>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
          
          <div className="input-container">
            <label className="input-label">Curso</label>
            <select
              value={gradoSeleccionado ?? ''}
              onChange={(e) => setGradoSeleccionado(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md, 8px)',
                border: '1px solid var(--border)',
                backgroundColor: '#fff',
                fontSize: '1rem',
                color: 'var(--text-main)',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="">Seleccione un curso</option>
              {grados.map((grado) => (
                <option key={grado.id} value={grado.id}>
                  {grado.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="primary"
              style={{ backgroundColor: '#7f1d1d' }}
              disabled={loading || !gradoSeleccionado}
            >
              <Search size={16} style={{ marginRight: '8px' }} />
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>

        </div>
      </form>

      {error && (
        <div style={{ marginTop: '16px', padding: '12px', borderRadius: '6px', backgroundColor: 'var(--status-red-bg)', color: 'var(--status-red)', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      {data.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <DataTable
            columns={PUPITRE_COLUMNS}
            data={data}
            onSelect={onSeleccionar}
            emptyMessage="No se encontraron estudiantes en este curso"
          />
        </div>
      )}

    </div>
  )
}