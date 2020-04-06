import { Module, CacheModule } from '@nestjs/common'
import { ApplicationAvisosService } from './application-avisos.service'
import { ApplicationCoreApiModule } from '../application-core-api/application-core-api.module'
import { RedisModule } from '../cache/cache-redis/redis.module'
@Module({
  imports: [ApplicationCoreApiModule, RedisModule],
  providers: [ApplicationAvisosService],
  exports: [ApplicationAvisosService],
})
export class ApplicationAvisosModule {}
