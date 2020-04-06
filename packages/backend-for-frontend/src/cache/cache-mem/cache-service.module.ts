import { Module } from '@nestjs/common'
import { CacheServiceController } from './cache-service.controller'

@Module({
  controllers: [CacheServiceController],
})
export class CacheServiceModule {}
