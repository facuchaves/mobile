export interface AvisoSemanas {
  titulo: string
  tipoTrabajo: string
  logoURL: string
  empresa: string
  localizacion: string
  fechaPublicacion: string
  salarioMinimo: number
  salarioMaximo: number
  aptoDiscapacitado: boolean
  detalle: string
  planPublicacion: { PlanPublicacion }
  confidencial: boolean
  portal: string
  oportunidad: boolean
  fechaHoraPublicacion: string
  idEmpresa: string
  links: string
  id: number
}
