import { Module, HttpModule } from '@nestjs/common'
import { CandidatesCoreApiService } from './candidates-core-api.service'
import { CoreApiModule } from '../../core-api/core-api.module'
import { ConfigModule } from '../../config/config.module'

@Module({
  imports: [ConfigModule, HttpModule, CoreApiModule],
  providers: [CandidatesCoreApiService],
  exports: [CandidatesCoreApiService],
})
export class CandidatesCoreApiModule {}
