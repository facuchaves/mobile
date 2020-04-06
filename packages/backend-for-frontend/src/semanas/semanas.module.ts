import { Module } from '@nestjs/common'
import { SemanasService } from './semanas.service'
import { SemanasController } from './semanas.controller'
import { ApplicationCoreApiModule } from '../application-core-api/application-core-api.module'
import { AppLoginModule } from '../app-login/app-login.module'
import { ConfigModule } from '../config/config.module'
import { RedisModule } from '../cache/cache-redis/redis.module'
@Module({
  imports: [RedisModule, ConfigModule, AppLoginModule, ApplicationCoreApiModule],
  controllers: [SemanasController],
  providers: [SemanasService],
})
export class SemanasModule {}
