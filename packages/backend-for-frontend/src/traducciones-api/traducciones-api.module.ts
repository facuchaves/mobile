import { Module, HttpModule } from '@nestjs/common'
import { TraduccionesApiService } from './traducciones-api.service'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [TraduccionesApiService],
  exports: [TraduccionesApiService],
})
export class TraduccionesApiModule {}
