import { Module, CacheModule } from '@nestjs/common'
import CacheConfigService from './cache-config.service'
import { ConfigModule } from '../../config/config.module'
import { RedisService } from './redis.service'

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: CacheConfigService,
      imports: [ConfigModule],
    }),
  ],
  providers: [CacheConfigService, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
