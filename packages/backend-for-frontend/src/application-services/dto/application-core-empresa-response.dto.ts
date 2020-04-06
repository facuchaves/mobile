import { CoreProvinciaResponseDto } from './core-provincia-response.dto'
import { CoreCondicionIVAResponseDto } from './core-condicion-iva-response.dto'
import { CoreIndustriaResponseDto } from './core-industria-response.dto'
import { CorePaisResponseDto } from './core-pais-response.dto'

export class ApplicationCoreEmpresaResponseDto {
  calle?: string
  cantidadEmpleados?: number
  ciudad?: string
  clienteCRMId?: number
  codigoPostal?: string
  condicionIVA?: CoreCondicionIVAResponseDto
  consultora?: boolean
  cuit?: string
  denominacion?: string
  departamento?: string
  descripcion?: string
  email?: string
  id?: number
  idClienteSap?: string
  idUsuarioBumeranVendedor?: number
  industria?: CoreIndustriaResponseDto
  logoURL?: string
  numero?: string
  pais?: CorePaisResponseDto
  piso?: string
  provincia?: CoreProvinciaResponseDto
  razonSocial?: string
  webURL?: string

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'calle',
      baseName: 'calle',
      type: 'string',
    },
    {
      name: 'cantidadEmpleados',
      baseName: 'cantidadEmpleados',
      type: 'number',
    },
    {
      name: 'ciudad',
      baseName: 'ciudad',
      type: 'string',
    },
    {
      name: 'clienteCRMId',
      baseName: 'clienteCRMId',
      type: 'number',
    },
    {
      name: 'codigoPostal',
      baseName: 'codigoPostal',
      type: 'string',
    },
    {
      name: 'condicionIVA',
      baseName: 'condicionIVA',
      type: 'CondicionIVAResponse',
    },
    {
      name: 'consultora',
      baseName: 'consultora',
      type: 'boolean',
    },
    {
      name: 'cuit',
      baseName: 'cuit',
      type: 'string',
    },
    {
      name: 'denominacion',
      baseName: 'denominacion',
      type: 'string',
    },
    {
      name: 'departamento',
      baseName: 'departamento',
      type: 'string',
    },
    {
      name: 'descripcion',
      baseName: 'descripcion',
      type: 'string',
    },
    {
      name: 'email',
      baseName: 'email',
      type: 'string',
    },
    {
      name: 'id',
      baseName: 'id',
      type: 'number',
    },
    {
      name: 'idClienteSap',
      baseName: 'idClienteSap',
      type: 'string',
    },
    {
      name: 'idUsuarioBumeranVendedor',
      baseName: 'idUsuarioBumeranVendedor',
      type: 'number',
    },
    {
      name: 'industria',
      baseName: 'industria',
      type: 'IndustriaResponse',
    },
    {
      name: 'logoURL',
      baseName: 'logoURL',
      type: 'string',
    },
    {
      name: 'numero',
      baseName: 'numero',
      type: 'string',
    },
    {
      name: 'pais',
      baseName: 'pais',
      type: 'PaisResponse',
    },
    {
      name: 'piso',
      baseName: 'piso',
      type: 'string',
    },
    {
      name: 'provincia',
      baseName: 'provincia',
      type: 'ProvinciaResponse',
    },
    {
      name: 'razonSocial',
      baseName: 'razonSocial',
      type: 'string',
    },
    {
      name: 'webURL',
      baseName: 'webURL',
      type: 'string',
    },
  ]

  static getAttributeTypeMap() {
    return ApplicationCoreEmpresaResponseDto.attributeTypeMap
  }
}
