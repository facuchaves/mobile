import { Module } from '@nestjs/common'
import { CandidatesCoreApiModule } from '../candidates-core-api/candidates-core-api.module'
import { CandidatesService } from './candidates.service'
import { CandidatesController } from './candidates.controller'
import { RedisModule } from '../../cache/cache-redis/redis.module'
import { AuthModule } from '../../auth/auth.module'
import { ApplicationCoreApiModule } from '../../application-core-api/application-core-api.module'

@Module({
  imports: [RedisModule, CandidatesCoreApiModule, AuthModule, ApplicationCoreApiModule],
  providers: [CandidatesService],
  controllers: [CandidatesController],
  exports: [CandidatesService],
})
export class CandidatesModule {}
