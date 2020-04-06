import { Module, HttpModule } from '@nestjs/common'
import { ApplicationCoreApiService } from './application-core-api.service'
import { CoreApiModule } from '../core-api/core-api.module'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [ConfigModule, HttpModule, CoreApiModule],
  providers: [ApplicationCoreApiService],
  exports: [ApplicationCoreApiService],
})
export class ApplicationCoreApiModule {}
