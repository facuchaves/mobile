import { ApiModelProperty } from '@nestjs/swagger'


export default class DatosPostulanteResumidoResDto {
  @ApiModelProperty({ required: true, description: 'id' })
  id: number

  @ApiModelProperty({ required: true, description: 'nombre' })
  nombre: string

  @ApiModelProperty({ required: true, description: 'apellido' })
  apellido: string

  @ApiModelProperty({ required: true, description: 'email' })
  email: string

  @ApiModelProperty({ required: true, description: 'fotoURL' })
  fotoURL: string

}
