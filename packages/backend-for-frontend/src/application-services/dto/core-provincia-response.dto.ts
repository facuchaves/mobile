export class CoreProvinciaResponseDto {
  id?: number
  nombre?: string

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'id',
      baseName: 'id',
      type: 'number',
    },
    {
      name: 'nombre',
      baseName: 'nombre',
      type: 'string',
    },
  ]

  static getAttributeTypeMap() {
    return CoreProvinciaResponseDto.attributeTypeMap
  }
}
