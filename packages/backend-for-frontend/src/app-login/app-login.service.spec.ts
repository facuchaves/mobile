import { Test, TestingModule } from '@nestjs/testing'
import { AppLoginService } from './app-login.service'
import { CoreApiModule } from '../core-api/core-api.module'
import { ConfigModule } from '../config/config.module'

describe('AppLoginService', () => {
  let service: AppLoginService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreApiModule, ConfigModule],
      providers: [AppLoginService],
    }).compile()

    service = module.get<AppLoginService>(AppLoginService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
