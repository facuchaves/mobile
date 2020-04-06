import { Module } from '@nestjs/common'
import { ConfigService } from './config.service'

export const nodeEnv = process.env.NODE_ENV || 'development'
export const isDevelopment = nodeEnv === 'development'

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(process.env.ENVFILE),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
