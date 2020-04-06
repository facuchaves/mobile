import { Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { Encrypter } from './encrypter'

@Module({
  imports: [ConfigModule],
  providers: [Encrypter],
  exports: [Encrypter],
})
export class EncrypterModule {}
