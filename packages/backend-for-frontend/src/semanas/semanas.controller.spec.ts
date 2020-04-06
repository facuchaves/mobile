import { Test, TestingModule } from '@nestjs/testing'
import { SemanasController } from './semanas.controller'
import { SemanasService } from './semanas.service'
import { RedisModule } from '../cache/cache-redis/redis.module'
import { RequestContext } from '../models/request-context'

const mockSemanaService = {
  consultarSemana: jest.fn().mockResolvedValue('mock-semana-result'),
}

describe('Semanas Controller', () => {
  let controller: SemanasController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [
        {
          provide: SemanasService,
          useValue: mockSemanaService,
        },
      ],
      controllers: [SemanasController],
    }).compile()

    controller = module.get<SemanasController>(SemanasController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
