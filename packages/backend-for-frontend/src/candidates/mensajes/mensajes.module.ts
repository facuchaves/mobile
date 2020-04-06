import { Module } from '@nestjs/common'
import { MensajesController } from './mensajes.controller'
import { MensajesService } from './mensajes.service'
import { CandidatesCoreApiModule } from '../candidates-core-api/candidates-core-api.module'
import { ApplicationCoreApiModule } from '../../application-core-api/application-core-api.module'
import { AppLoginModule } from '../../app-login/app-login.module'
import { ConfigModule } from '../../config/config.module'
import { RedisModule } from '../../cache/cache-redis/redis.module'
@Module({
  imports: [RedisModule, ConfigModule, AppLoginModule, CandidatesCoreApiModule, ApplicationCoreApiModule],
  controllers: [MensajesController],
  providers: [MensajesService],
  exports: [MensajesService],
})
export class MensajesModule {}
