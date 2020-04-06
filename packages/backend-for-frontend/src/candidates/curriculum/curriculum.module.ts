import { Module, CacheModule } from '@nestjs/common'
import { CurriculumController } from './curriculum.controller'
import { CurriculumService } from './curriculum.service'
import { RedisModule } from '../../cache/cache-redis/redis.module'
import { CandidatesCoreApiModule } from '../candidates-core-api/candidates-core-api.module'
import { ApplicationCoreApiModule } from '../../application-core-api/application-core-api.module'
import { AuthModule } from '../../auth/auth.module'
import { CandidatesModule } from '../../candidates/services/candidates.module'
import { StaticEntitiesModule } from '../../static-entities/static-entities.module'

@Module({
  imports: [
    RedisModule,
    CandidatesCoreApiModule,
    ApplicationCoreApiModule,
    AuthModule,
    CandidatesModule,
    StaticEntitiesModule,
  ],
  controllers: [CurriculumController],
  providers: [CurriculumService],
  exports: [CurriculumService],
})
export class CurriculumModule {}
