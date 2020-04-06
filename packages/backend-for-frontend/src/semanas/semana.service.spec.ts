import { Test, TestingModule } from '@nestjs/testing'
import { SemanasService } from './semanas.service'
import { RequestContext } from '../models/request-context'
import { CoreApiService } from '../core-api/core-api.service'

describe('Semana service spec', () => {
  let coreApiService
  let service

  beforeEach(() => {
    coreApiService = ({ post: () => {} } as unknown) as CoreApiService
    service = new SemanasService(coreApiService)
  })

  it('should get 29 avisos', async () => {
    const avisosSemana29Mock = require('./29-avisos-semana.mock.json')
    const contextMocked = ({ site: { idPais: 1 } } as unknown) as RequestContext

    jest.spyOn(coreApiService, 'post').mockImplementation(() => Promise.resolve(avisosSemana29Mock))

    const hashtag = 'semanaingar18'
    const result = await service.consultarAvisosDeSemana(contextMocked, hashtag)

    const url = `/v0/application/avisos/search?paisId=${contextMocked.site.idPais}&page=${0}&pageSize=${30}`

    const avisosDeSemanaBody = {
      busquedaExtendida: true,
      query: hashtag,
      tipoDetalle: 320,
    }

    expect(coreApiService.post).toHaveBeenCalledWith(contextMocked, url, avisosDeSemanaBody)

    expect(service).toBeDefined()
    expect(result.content.length).toBe(29)
    expect(result).toMatchSnapshot()
  })

  it('should get 30 avisos', async () => {
    const avisosSemana30Mock = require('./30-avisos-semana.mock.json')
    const contextMocked = ({ site: { idPais: 1 } } as unknown) as RequestContext

    jest.spyOn(coreApiService, 'post').mockImplementation(() => Promise.resolve(avisosSemana30Mock))

    const hashtag = 'semanaingar18'
    const result = await service.consultarAvisosDeSemana(contextMocked, hashtag)

    const url = `/v0/application/avisos/search?paisId=${contextMocked.site.idPais}&page=${0}&pageSize=${30}`

    const avisosDeSemanaBody = {
      busquedaExtendida: true,
      query: hashtag,
      tipoDetalle: 320,
    }

    expect(coreApiService.post).toHaveBeenCalledWith(contextMocked, url, avisosDeSemanaBody)

    expect(service).toBeDefined()
    expect(result.content.length).toBe(30)
    expect(result).toMatchSnapshot()
  })

  it('should get 31 avisos', async () => {
    const avisosSemana31Page0Mock = require('./31-avisos-semana-page-0.mock.json')
    const avisosSemana31Page1Mock = require('./31-avisos-semana-page-1.mock.json')
    const contextMocked = ({ site: { idPais: 1 } } as unknown) as RequestContext

    jest.spyOn(coreApiService, 'post').mockImplementationOnce(() => Promise.resolve(avisosSemana31Page0Mock))
    jest.spyOn(coreApiService, 'post').mockImplementationOnce(() => Promise.resolve(avisosSemana31Page1Mock))

    const hashtag = 'semanaingar18'
    const result = await service.consultarAvisosDeSemana(contextMocked, hashtag)

    const url0 = `/v0/application/avisos/search?paisId=${contextMocked.site.idPais}&page=${0}&pageSize=${30}`
    const url1 = `/v0/application/avisos/search?paisId=${contextMocked.site.idPais}&page=${1}&pageSize=${30}`

    const avisosDeSemanaBody = {
      busquedaExtendida: true,
      query: hashtag,
      tipoDetalle: 320,
    }

    expect(coreApiService.post).toHaveBeenCalledWith(contextMocked, url0, avisosDeSemanaBody)
    expect(coreApiService.post).toHaveBeenCalledWith(contextMocked, url1, avisosDeSemanaBody)

    expect(service).toBeDefined()
    expect(result.content.length).toBe(31)
    expect(result).toMatchSnapshot()
  })
})
