import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/ui/atoms/Button';
import { Input } from '@/shared/ui/atoms/Input';
import { PupitreTable } from '@/features/classroom/components/PupitreTable';
import { useLoadPupitreByStudent } from '../hooks/useLoadPupitreByStudent';
import type { ClassroomStudent } from '../types';

interface PupitreByStudentSectionProps {
  onSeleccionar: (estudiante: ClassroomStudent) => void;
}

export const PupitreByStudentSection = ({ onSeleccionar }: PupitreByStudentSectionProps) => {
  const [codigo, setCodigo] = useState('');
  const { loading, error, estudiante, fetchPupitre } = useLoadPupitreByStudent();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    void fetchPupitre(codigo.trim());
  };

  const data = estudiante ? [{ ...estudiante, id: estudiante.id }] : [];

  return (
    <div className="card">
      <h3
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '1.1rem',
          marginBottom: '16px',
        }}
      >
        <Search size={20} /> Buscar por Código
      </h3>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            alignItems: 'end',
          }}
        >
          <Input
            label="Código"
            placeholder="Ej. 2024001"
            type="text"
            value={codigo}
<<<<<<< HEAD
            onChange={(e) => {
              setCodigo(e.target.value);
            }}
=======
            onChange={(e) => setCodigo(e.target.value)}
>>>>>>> f0c03f0e73544f32348d0ae1997bd447d51ba72d
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="primary"
              style={{ backgroundColor: '#7f1d1d' }}
              disabled={loading || !codigo}
            >
              <Search size={16} style={{ marginRight: '8px' }} />
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
        </div>
      </form>

      {error && (
<<<<<<< HEAD
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            borderRadius: '6px',
            backgroundColor: 'var(--status-red-bg)',
            color: 'var(--status-red)',
            fontSize: '0.875rem',
          }}
        >
=======
        <div style={{ marginTop: '16px', padding: '12px', borderRadius: '6px', backgroundColor: 'var(--status-red-bg)', color: 'var(--status-red)', fontSize: '0.875rem' }}>
>>>>>>> f0c03f0e73544f32348d0ae1997bd447d51ba72d
          {error}
        </div>
      )}

      {data.length > 0 && (
        <div style={{ marginTop: '16px' }}>
<<<<<<< HEAD
          <PupitreTable
            data={data}
            onEdit={(estudiante) => {
              onSeleccionar(estudiante as ClassroomStudent);
            }}
          />
        </div>
      )}
    </div>
  );
};
=======
          <DataTable
            columns={PUPITRE_COLUMNS}
            data={data}
            onSelect={onSeleccionar}
            emptyMessage="No se encontró el estudiante"
          />
        </div>
      )}

    </div>
  )
}
>>>>>>> f0c03f0e73544f32348d0ae1997bd447d51ba72d
