import { Module } from '@nestjs/common'
import { StaticEntitiesService } from './static-entities.service'
import { StaticEntitiesController } from './static-entities.controller'
import { ConfigModule } from '../config/config.module'
import { ApplicationCoreApiModule } from '../application-core-api/application-core-api.module'
import { TraduccionesApiService } from '../traducciones-api/traducciones-api.service'
import { RedisModule } from '../cache/cache-redis/redis.module'
import { AppLoginModule } from '../app-login/app-login.module'
import { TraduccionesApiModule } from './../traducciones-api/traducciones-api.module'

@Module({
  imports: [RedisModule, ConfigModule, AppLoginModule, ApplicationCoreApiModule, TraduccionesApiModule],
  providers: [StaticEntitiesService],
  controllers: [StaticEntitiesController],
  exports: [StaticEntitiesService, TraduccionesApiModule],
})
export class StaticEntitiesModule {}
