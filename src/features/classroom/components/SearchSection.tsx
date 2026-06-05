import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/shared/ui/atoms/Button'
import { Input } from '@/shared/ui/atoms/Input'
import { DataTable } from '@/shared/ui'
import { Badge } from '@/shared/ui/atoms/Badge'
import { useLoadPupitreByStudent } from '@/features/load-pupitre-by-student/hooks/useLoadPupitreByStudent'
import { useLoadPupitresByGrade } from '@/features/load-pupitres-by-grade/hooks/useLoadPupitresByGrade'

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

export const SearchSection = () => {
  const [codigo, setCodigo] = useState('')
  const [gradoSeleccionado, setGradoSeleccionado] = useState<number | null>(null)
  const [tableData, setTableData] = useState<Record<string, unknown>[]>([])
  const [mostrarTabla, setMostrarTabla] = useState(false)
  const [mostrarBotonCurso, setMostrarBotonCurso] = useState(false)

  const { loading: loadingEstudiante, fetchPupitre } = useLoadPupitreByStudent()
  const { loading: loadingGrado, grados, fetchPupitresByGrade } = useLoadPupitresByGrade()

  const loading = loadingEstudiante || loadingGrado

  const handleBuscar = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (codigo) {
      const data = await fetchPupitre(codigo.trim())
      if (data) {
        setTableData([{ ...data, id: data.id }])
        setMostrarBotonCurso(false)
      }
    } else if (gradoSeleccionado) {
      const data = await fetchPupitresByGrade(gradoSeleccionado)
      if (data) {
        setTableData(data.map((p) => ({ ...p, id: p.id })))
        setMostrarBotonCurso(true)
      }
    }
    setMostrarTabla(true)
    setCodigo('')
    setGradoSeleccionado(null)
  }

  return (
    <>
      {/* Card filtros */}
      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '16px' }}>
          <Search size={20} /> Filtros de búsqueda
        </h3>

        <form onSubmit={(e) => { void handleBuscar(e) }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>

            <Input
              label="Código"
              placeholder="Ej. 123456789"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value)
                setGradoSeleccionado(null)
              }}
            />

            <div className="input-container">
              <label className="input-label">Curso</label>
              <select
                value={gradoSeleccionado ?? ''}
                onChange={(e) => {
                  setGradoSeleccionado(Number(e.target.value))
                  setCodigo('')
                }}
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
                disabled={loading || (!codigo && !gradoSeleccionado)}
              >
                <Search size={16} style={{ marginRight: '8px' }} />
                {loading ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>

          </div>
        </form>
      </div>

      {/* Tabla */}
      {mostrarTabla && (
        <div style={{ marginTop: '24px' }}>
          {mostrarBotonCurso && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
              <Button variant="primary" style={{ backgroundColor: '#f97316' }}>
                Actualizar Curso Completo
              </Button>
            </div>
          )}
          <DataTable
            columns={PUPITRE_COLUMNS}
            data={tableData}
            emptyMessage="No se encontraron estudiantes"
          />
        </div>
      )}
    </>
  )
}