import { Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import DomainService from './domain.service'

@Module({
  imports: [ConfigModule],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
