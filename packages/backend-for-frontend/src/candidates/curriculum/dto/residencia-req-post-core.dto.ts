import { ApiModelProperty } from '@nestjs/swagger'

export class Residencia {
  @ApiModelProperty({ required: true })
  type: string
  @ApiModelProperty({ required: true })
  locationType: string
  @ApiModelProperty({ required: true })
  streetAddress: string
  @ApiModelProperty({ required: true })
  streetNumber: string
  @ApiModelProperty({ required: true })
  route: string
  @ApiModelProperty({ required: true })
  country: string
  @ApiModelProperty({ required: true })
  level1: string
  @ApiModelProperty({ required: true })
  level2: string
  @ApiModelProperty({ required: true })
  level3: string
  @ApiModelProperty({ required: true })
  locality: string
  @ApiModelProperty({ required: true })
  subLocality: string
  @ApiModelProperty({ required: true })
  neighborhood: string
  @ApiModelProperty({ required: true })
  premise: string
  @ApiModelProperty({ required: true })
  subPremise: string
  @ApiModelProperty({ required: true })
  pointInterest: string
  @ApiModelProperty({ required: true })
  postalCode: string
  @ApiModelProperty({ required: true })
  southWest: string
  @ApiModelProperty({ required: true })
  northEast: string
  @ApiModelProperty({ required: true })
  latitude: string
  @ApiModelProperty({ required: true })
  longitude: string
}
