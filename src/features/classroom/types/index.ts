export interface ClassroomStudent {
  estudiante_id: number
  documento: string
  nombre: string
  grado_nombre: string
  docente_titular: string
  estado_pupitre: 'bueno' | 'malo'
}