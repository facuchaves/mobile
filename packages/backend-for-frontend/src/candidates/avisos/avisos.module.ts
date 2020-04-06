import { Module, HttpModule, CacheModule } from '@nestjs/common'
import { AvisosController } from './avisos.controller'
import { AvisosService } from './avisos.service'
import { RedisModule } from '../../cache/cache-redis/redis.module'
import { CandidatesCoreApiModule } from '../candidates-core-api/candidates-core-api.module'
import { ApplicationCoreApiModule } from '../../application-core-api/application-core-api.module'
import { ApplicationAvisosModule } from '../../application-services/application-avisos.module'
import { AuthModule } from '../../auth/auth.module'

@Module({
  imports: [
    RedisModule,
    CandidatesCoreApiModule,
    ApplicationAvisosModule,
    AuthModule,
    ApplicationCoreApiModule,
    HttpModule,
  ],
  controllers: [AvisosController],
  providers: [AvisosService],
  exports: [AvisosService],
})
export class AvisosModule {}
