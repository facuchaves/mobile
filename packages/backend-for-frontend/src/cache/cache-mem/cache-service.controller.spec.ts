import { Test, TestingModule } from '@nestjs/testing'
import { CacheServiceController } from './cache-service.controller'

describe('CacheService Controller', () => {
  let controller: CacheServiceController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CacheServiceController],
    }).compile()

    controller = module.get<CacheServiceController>(CacheServiceController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
