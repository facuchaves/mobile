import { ApiModelProperty } from '@nestjs/swagger'

export default class PutResidencia {
  @ApiModelProperty({ required: false })
  geolocalizacionId: number

  @ApiModelProperty({ required: false })
  paisId: number
}
