import { Test, TestingModule } from '@nestjs/testing'
import { ApplicationCoreApiService } from './application-core-api.service'
import { ConfigModule } from '../config/config.module'
import { HttpModule } from '@nestjs/common'
import { ApplicationCoreApiModule } from '../application-core-api/application-core-api.module'

describe('CoreApiService', () => {
  let service: ApplicationCoreApiService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule, ApplicationCoreApiModule],
      providers: [ApplicationCoreApiService],
    }).compile()

    service = module.get<ApplicationCoreApiService>(ApplicationCoreApiService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
