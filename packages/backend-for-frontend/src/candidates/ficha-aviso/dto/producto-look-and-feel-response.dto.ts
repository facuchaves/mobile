import { ApiModelProperty } from '@nestjs/swagger'
import { EmpresaLookAndFeelDto } from './empresa-look-and-feel.dto'

export class ProductoLookAndFeelResponseDto {
  @ApiModelProperty({ required: false, description: 'bannerEmpresa' })
  bannerEmpresa?: string

  @ApiModelProperty({ required: false, description: 'colorBackgroundBotones' })
  colorBackgroundBotones?: string

  @ApiModelProperty({ required: false, description: 'colorBackgroundCaja' })
  colorBackgroundCaja?: string

  @ApiModelProperty({ required: false, description: 'colorBackgroundSeparadores' })
  colorBackgroundSeparadores?: string

  @ApiModelProperty({ required: false, description: 'colorBackgroundTituloCaja' })
  colorBackgroundTituloCaja?: string

  @ApiModelProperty({ required: false, description: 'colorBordeCaja' })
  colorBordeCaja?: string

  @ApiModelProperty({ required: false, description: 'colorLabels' })
  colorLabels?: string

  @ApiModelProperty({ required: false, description: 'colorSeparadoresCaja' })
  colorSeparadoresCaja?: string

  @ApiModelProperty({ required: false, description: 'colorTexto' })
  colorTexto?: string

  @ApiModelProperty({ required: false, description: 'colorTextoBotones' })
  colorTextoBotones?: string

  @ApiModelProperty({ required: false, description: 'colorTextoCaja' })
  colorTextoCaja?: string

  @ApiModelProperty({ required: false, description: 'colorTextoSeparadores' })
  colorTextoSeparadores?: string

  @ApiModelProperty({ required: false, description: 'colorTextoTituloCaja' })
  colorTextoTituloCaja?: string

  @ApiModelProperty({ required: false, description: 'colorTituloAviso' })
  colorTituloAviso?: string

  @ApiModelProperty({ required: false, description: 'colorTituloEmpresa' })
  colorTituloEmpresa?: string

  @ApiModelProperty({ required: false, description: 'empresa' })
  empresa?: EmpresaLookAndFeelDto
}
