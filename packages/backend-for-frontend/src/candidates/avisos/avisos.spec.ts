import { AvisosService } from './avisos.service'
import { RequestContext } from '../../models/request-context'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { searchDTOResponseExample } from './avisos.mock'
import { CandidatesService } from '../../candidates/services/candidates.service'
import { JwtService } from '@nestjs/jwt'
import { RedisService } from '../../cache/cache-redis/redis.service'

describe('Aviso de Candidates', () => {
  let service
  let candidatesCoreApiService
  let jwtService
  let httpService
  let configService

  beforeEach(async () => {
    candidatesCoreApiService = ({ post: () => {} } as unknown) as CandidatesCoreApiService
    jwtService = ({ post: () => {} } as unknown) as JwtService
    service = new AvisosService(jwtService, candidatesCoreApiService, httpService, configService)
  })

  it('should get all avisos data', async () => {
    const contextMocked = ({
      isCandidateLogged: () => true,
      site: {
        idPais: 1,
      },
    } as unknown) as RequestContext

    jest.spyOn(candidatesCoreApiService, 'post').mockImplementation(() => Promise.resolve(searchDTOResponseExample))

    const result = await service.search(contextMocked)

    expect(result).toMatchSnapshot()
  })
})
