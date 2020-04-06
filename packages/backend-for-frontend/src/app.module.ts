import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SemanasModule } from './semanas/semanas.module'
import { ConfigModule } from './config/config.module'
import { CoreApiModule } from './core-api/core-api.module'
import { SiteModule } from './site/site.module'
import { AppLoginModule } from './app-login/app-login.module'
import { RedisModule } from './cache/cache-redis/redis.module'
import { FiltrosServicesModule } from './candidates/services/filtros-services/filtros.module'

import { CandidatesOauthMiddleware } from './middlewares/candidates-oauth.middleware'
import { SiteMiddleware } from './middlewares/site.middleware'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { AuthModule } from './auth/auth.module'
import { EncrypterModule } from './encrypter/encrypter.module'
import { FichaAvisoModule } from './candidates/ficha-aviso/ficha-aviso.module'
import { LoadFotoModule } from './candidates/upload/load-foto/load-foto.module'
import { ApplicationOAuthMiddleware } from './middlewares/application-oauth.middleware'
import { JwtMiddleware } from './middlewares/jwt.middleware'
import { StaticEntitiesModule } from './static-entities/static-entities.module'
import { StaticEntitiesService } from './static-entities/static-entities.service'
import { CurriculumModule } from './candidates/curriculum/curriculum.module'
import { EstudiosModule } from './candidates/estudios/estudios.module'
import { TraduccionesApiModule } from './traducciones-api/traducciones-api.module'
import { CacheServiceModule } from './cache/cache-mem/cache-service.module'
import { AvisosModule } from './candidates/avisos/avisos.module'
import { MulterModule } from '@nestjs/platform-express'
import { PostulacionesModule } from './candidates/postulaciones/postulaciones.module'
import { CandidatesMobileOauthMiddleware } from './middlewares/candidates-mobile-oauth.middleware'
import { AutentificacionModule } from './candidates/autentificacion/autentificacion.module'
import { AjustesModule } from './candidates/ajustes/ajustes.module'
import { MensajesModule } from './candidates/mensajes/mensajes.module'
@Module({
  imports: [
    AutentificacionModule,
    FichaAvisoModule,
    PostulacionesModule,
    SemanasModule,
    ConfigModule,
    CoreApiModule,
    SiteModule,
    AppLoginModule,
    RedisModule,
    AuthModule,
    StaticEntitiesModule,
    EncrypterModule,
    CurriculumModule,
    EstudiosModule,
    CacheServiceModule,
    FiltrosServicesModule,
    AvisosModule,
    TraduccionesApiModule,
    MulterModule.register({
      dest: './uploads',
    }),
    LoadFotoModule,
    AjustesModule,
    MensajesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('ENV: ', process.env.NODE_ENV)
    const candidatesOauthMid =
      process.env.NODE_ENV === 'mobile' ? CandidatesMobileOauthMiddleware : CandidatesOauthMiddleware
    consumer
      .apply(LoggerMiddleware, SiteMiddleware, JwtMiddleware, candidatesOauthMid, ApplicationOAuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
