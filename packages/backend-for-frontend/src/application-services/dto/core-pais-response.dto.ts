/**
 * Pais
 */
export class CorePaisResponseDto {
  /**
   * ID del pa&iacute;s
   */
  id: number
  /**
   * C&oacute;digo ISO del pa&iacute;s
   */
  isoCode: string
  /**
   * Nombre del pa&iacute;s
   */
  nombre: string

  static discriminator: string | undefined = undefined

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'id',
      baseName: 'id',
      type: 'number',
    },
    {
      name: 'isoCode',
      baseName: 'isoCode',
      type: 'string',
    },
    {
      name: 'nombre',
      baseName: 'nombre',
      type: 'string',
    },
  ]

  static getAttributeTypeMap() {
    return CorePaisResponseDto.attributeTypeMap
  }
}
