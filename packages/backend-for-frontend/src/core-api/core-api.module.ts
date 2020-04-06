import { Module, HttpModule } from '@nestjs/common'
import { CoreApiService } from './core-api.service'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
// import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('REST_API_URL'),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'group-id': configService.get('GROUP_ID'),
        },
      }),
    }),
  ],
  providers: [CoreApiService],
  exports: [CoreApiService],
})
export class CoreApiModule {}
