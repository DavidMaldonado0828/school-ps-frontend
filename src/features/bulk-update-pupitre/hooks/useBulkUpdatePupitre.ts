import { useState, useCallback } from 'react';
import { bulkUpdatePupitre } from '../api/bulkUpdatePupitre';

export const useBulkUpdatePupitre = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bulkUpdate = useCallback(async (grado_id: number, estudiante_ids: number[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await bulkUpdatePupitre(grado_id, { estudiante_ids });
      return response.data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al confirmar los pagos');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, bulkUpdate };
};