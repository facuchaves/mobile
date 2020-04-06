import { Module, CacheModule } from '@nestjs/common'
import { EstudiosController } from './estudios.controller'
import { EstudiosService } from './estudios.service'
import { RedisModule } from '../../cache/cache-redis/redis.module'
import { CandidatesCoreApiModule } from '../candidates-core-api/candidates-core-api.module'
import { ApplicationCoreApiModule } from '../../application-core-api/application-core-api.module'

@Module({
  imports: [RedisModule, CandidatesCoreApiModule, ApplicationCoreApiModule],
  controllers: [EstudiosController],
  providers: [EstudiosService],
})
export class EstudiosModule {}
