import { Module, CacheModule } from '@nestjs/common'
import { FichaAvisoController } from './ficha-aviso.controller'
import { FichaAvisoService } from './ficha-aviso.service'
import { AppLoginModule } from '../../app-login/app-login.module'
import { ConfigModule } from '../../config/config.module'
import { RedisModule } from '../../cache/cache-redis/redis.module'
import { ApplicationAvisosModule } from '../../application-services/application-avisos.module'
import { CandidatesModule } from '../services/candidates.module'
import { AvisosModule } from '../avisos/avisos.module'
import { CurriculumModule } from '../curriculum/curriculum.module'
@Module({
  imports: [
    RedisModule,
    ConfigModule,
    AppLoginModule,
    ApplicationAvisosModule,
    CandidatesModule,
    AvisosModule,
    CurriculumModule,
  ],
  controllers: [FichaAvisoController],
  providers: [FichaAvisoService],
})
export class FichaAvisoModule {}
