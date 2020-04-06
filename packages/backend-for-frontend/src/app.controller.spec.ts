import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SemanasModule } from './semanas/semanas.module'
import { ConfigModule } from './config/config.module'
import { CoreApiModule } from './core-api/core-api.module'
import { SiteModule } from './site/site.module'
import { AppLoginModule } from './app-login/app-login.module'
import { RedisModule } from './cache/cache-redis/redis.module'
import { AuthModule } from './auth/auth.module'
import { EncrypterModule } from './encrypter/encrypter.module'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [SemanasModule, ConfigModule, CoreApiModule, SiteModule, AppLoginModule, RedisModule, AuthModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {})
  })
})
