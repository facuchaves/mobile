import { Test, TestingModule } from '@nestjs/testing'
import { StaticEntitiesService } from './static-entities.service'
import { StaticEntitiesController } from './static-entities.controller'
import { StaticEntitiesModule } from '../static-entities/static-entities.module'

describe('StaticEntities Controller', () => {
  let controller: StaticEntitiesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [StaticEntitiesModule],
      controllers: [StaticEntitiesController],
      providers: [StaticEntitiesService],
    }).compile()

    controller = module.get<StaticEntitiesController>(StaticEntitiesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
