import { Module } from '@nestjs/common'
import { AppLoginService } from './app-login.service'
import { ConfigModule } from '../config/config.module'
import { CoreApiModule } from '../core-api/core-api.module'

@Module({
  imports: [CoreApiModule, ConfigModule],
  providers: [AppLoginService],
  exports: [AppLoginService],
})
export class AppLoginModule {}
