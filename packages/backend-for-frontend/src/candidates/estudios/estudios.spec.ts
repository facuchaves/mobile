import { EstudiosService } from './estudios.service'
import { RequestContext } from '../../models/request-context'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { estudioMock } from './dto/estudio-res-core.dto'

describe('Curriculum', () => {
  let service
  let candidatesCoreApiService
  let spy
  beforeEach(async () => {
    candidatesCoreApiService = ({
      get: () => {},
      delete: () => {},
      put: () => {},
      post: () => {},
    } as unknown) as CandidatesCoreApiService
    service = new EstudiosService(candidatesCoreApiService)
    spy = null
  })

  afterEach(async () => {
    if (spy) spy.mockClear()
  })

  it('should get estudio data', async () => {
    const contextMocked = ({
      isCandidateLogged: () => true,
    } as unknown) as RequestContext
    spy = jest.spyOn(candidatesCoreApiService, 'get').mockImplementation(() => Promise.resolve(estudioMock))
    const result = await service.getEstudio(contextMocked, 1)
    expect(result).toMatchSnapshot()
  })

  it('should delete estudio data', async () => {
    const contextMocked = ({
      isCandidateLogged: () => true,
    } as unknown) as RequestContext
    spy = jest.spyOn(candidatesCoreApiService, 'delete').mockImplementation(() => Promise.resolve(null))
    const result = await service.delEstudio(contextMocked, 1)
    expect(result).toMatchSnapshot()
  })

  it('should put estudio data', async () => {
    const contextMocked = ({
      isCandidateLogged: () => true,
    } as unknown) as RequestContext
    spy = jest.spyOn(candidatesCoreApiService, 'put').mockImplementation(() => Promise.resolve(null))
    const result = await service.putEstudio(contextMocked, 1, {})
    expect(result).toMatchSnapshot()
  })
})
