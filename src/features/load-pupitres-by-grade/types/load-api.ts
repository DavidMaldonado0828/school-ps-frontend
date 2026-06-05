export interface GradeInfo {
  id: number
  nombre: string
}

export interface PupitreByGrade {
  id: number
  nombre_estudiante: string
  documento: string
  grado: string
  estado_pupitre: boolean
  observacion: string | null
}

export interface PupitresByGradeResponse {
  statusCode: number
  data: PupitreByGrade[]
  message: string
  details: null
}