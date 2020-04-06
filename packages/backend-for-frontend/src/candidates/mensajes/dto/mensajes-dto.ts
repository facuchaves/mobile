import { ApiModelProperty } from '@nestjs/swagger'

export class MensajesCoreResponse {
  number: number
  size: number
  total: number
  content: Mensaje[]
}

export class LinkMensaje {
  href: string
  rel: string
  templated: boolean
}

export class Mensaje {
  fechaModificacion: string
  id: number
  leido: boolean
  links: LinkMensaje[]
  logoEmpresaURL: string
  nombreEmpresa: string
  tipo: string
  titulo: string
}

export class ComentarioMensajeDirecto {
  avatarURL: string
  fecha: string
  id: number
  mensaje: string
  nombre: string
}

export class MensajeDirecto {
  id: number
  leido: boolean
  titulo: string
  ultimoComentarioEmpresa: boolean
  comentarios: ComentarioMensajeDirecto[]
}

export class MensajeDirectoPost {
  @ApiModelProperty({ required: true })
  mensaje: string
}
