import { Module } from '@nestjs/common'
import { AutentificacionService } from './autentificacion.service'
import { AutentificacionController } from './autentificacion.controller'
import { ConfigModule } from '../../config/config.module'
import { ApplicationCoreApiModule } from '../../application-core-api/application-core-api.module'
import { EncrypterModule } from '../../encrypter/encrypter.module'

@Module({
  imports: [ConfigModule, ApplicationCoreApiModule, EncrypterModule],
  providers: [AutentificacionService],
  controllers: [AutentificacionController],
})
export class AutentificacionModule {}
