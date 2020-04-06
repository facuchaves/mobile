import { Test, TestingModule } from '@nestjs/testing'
import { StaticEntitiesService } from './static-entities.service'
import { ApplicationCoreApiModule } from './../application-core-api/application-core-api.module'
import { TraduccionesApiModule } from './../traducciones-api/traducciones-api.module'

describe('StaticEntitiesService', () => {
  let service: StaticEntitiesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApplicationCoreApiModule, TraduccionesApiModule],
      providers: [StaticEntitiesService],
      exports: [TraduccionesApiModule],
    }).compile()

    service = module.get<StaticEntitiesService>(StaticEntitiesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
