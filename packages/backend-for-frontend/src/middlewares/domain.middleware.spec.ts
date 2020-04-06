import { DomainMiddleware } from './domain.middleware'
import DomainService from '../domain/domain.service'
import { ConfigService } from '../config/config.service'
import { Domain } from '../interface/domain.interface'
import { Logger } from '../logger/logger.service'

describe('DomainMiddleware', () => {
  let domainService: DomainService
  let domainMiddleware: DomainMiddleware

  beforeEach(() => {
    const configService = new ConfigService(`${process.env.NODE_ENV}.env`)
    domainService = new DomainService(configService)
    domainMiddleware = new DomainMiddleware(domainService)
  })

  it('should be defined', () => {
    expect(domainMiddleware).toBeDefined()
  })

  it('should populate domain by hostname', async () => {
    const req: any = {
      hostname: 'mock-hostname',
      context: { logger: new Logger({ hostname: 'localhost' }) },
    }
    const mockDomain: Domain = { idPais: 'AR', portal: 'bumeran', cdnSemana: 'mockCdn' }

    const getDomainMock = jest.spyOn(domainService, 'getDomain').mockImplementation(() => Promise.resolve(mockDomain))

    await domainMiddleware.use(req, null, () => {
      expect(req.context).toBeDefined()
      expect(req.context.domain).toBeDefined()
      expect(req.context.domain).toEqual(mockDomain)

      expect(getDomainMock).toHaveBeenCalledWith('mock-hostname')
    })
  })
})
