import { Test, TestingModule } from '@nestjs/testing'
import { SemanasService } from './semanas.service'
import { RedisModule } from '../cache/cache-redis/redis.module'
import { ConfigModule } from '../config/config.module'
import { AppLoginModule } from '../app-login/app-login.module'
import { ApplicationCoreApiModule } from '../application-core-api/application-core-api.module'

describe('SemanasService', () => {
  let service: SemanasService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule, ConfigModule, AppLoginModule, ApplicationCoreApiModule],
      providers: [SemanasService],
    }).compile()

    service = module.get<SemanasService>(SemanasService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
