import { Test, TestingModule } from '@nestjs/testing'
import { CoreApiService } from './core-api.service'
import { ConfigModule } from '../config/config.module'
import { HttpModule } from '@nestjs/common'

describe('CoreApiService', () => {
  let service: CoreApiService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      providers: [CoreApiService],
    }).compile()

    service = module.get<CoreApiService>(CoreApiService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
