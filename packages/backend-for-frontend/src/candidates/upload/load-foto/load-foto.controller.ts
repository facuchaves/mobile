import { Controller, Body, Post, UploadedFile, Param, UploadedFiles, UseInterceptors, Bind } from '@nestjs/common'
import { ApiUseTags, ApiImplicitFile, ApiConsumes } from '@nestjs/swagger'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { LoadFotoService } from './load-foto.service'
import { Context } from '../../../decorators/request-context.decorator'
import { RequestContext } from '../../../models/request-context'

@ApiUseTags('candidates-upload-load-foto')
@Controller('load-foto')
export class LoadFotoController {
  constructor(private readonly loadFotoService: LoadFotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true })
  async uploadFoto(@Context() context: RequestContext, @UploadedFile() file) {
    const uploadFoto = await this.loadFotoService.uploadFoto(context, file)

    return uploadFoto
  }

  @Post('/base64/')
  async search(@Context() context: RequestContext, @Body() json?: any): Promise<{}> {
    let buff = new Buffer(json.file, 'base64')
    const uploadFoto = await this.loadFotoService.uploadFoto(context, buff)

    return uploadFoto
  }
}
