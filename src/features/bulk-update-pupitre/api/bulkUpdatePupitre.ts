import { fetchApi } from '@/shared/api/apiClient';

interface BulkUpdatePayload {
  estudiante_ids: number[];
}

interface BulkUpdateResponse {
  statusCode: number;
  data: {
    total_actualizados: number;
    ids_no_encontrados: number[];
  };
  message: string;
}

export const bulkUpdatePupitre = async (
  grado_id: number,
  payload: BulkUpdatePayload,
): Promise<BulkUpdateResponse> => {
  return fetchApi<BulkUpdateResponse>(`/classroom/pupitre/grado/${String(grado_id)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};
