import * as redisStore from 'cache-manager-redis-store'
import { ConfigService } from '../../config/config.service'
import { Injectable, CacheOptionsFactory, CacheModuleOptions } from '@nestjs/common'

@Injectable()
export default class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
      db: this.configService.get('REDIS_DB'),
      ttl: 600000,
    }
  }
}
