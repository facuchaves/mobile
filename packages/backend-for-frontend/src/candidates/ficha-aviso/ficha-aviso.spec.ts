import { FichaAvisoService } from './ficha-aviso.service'
import { RequestContext } from '../../models/request-context'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { ApplicationCoreApiService } from '../../application-core-api/application-core-api.service'
import { ApplicationAvisosService } from '../../application-services/application-avisos.service'
import { FichaAvisoResponseDto } from '../../candidates/ficha-aviso/dto/ficha-aviso-response.dto'
import { RedisService } from '../../cache/cache-redis/redis.service'
import { AvisosService } from '../avisos/avisos.service'

describe('Ficha aviso', () => {
  afterEach(() => {
    jest.restoreAllMocks() // Se usa para los mocks de metodos estaticos que queda mockeado en todos los tests.
  })

  it('should get informacion solo de aviso usuario logeado', async () => {
    const candidatesCoreAvisosResponseMock = require('./candidates-core-aviso-response.mock.json')

    const candidatesCoreApiService = ({ get: () => {} } as unknown) as CandidatesCoreApiService
    const service = new FichaAvisoService(null, candidatesCoreApiService, null, null, null, null)

    const contextMocked = ({
      isCandidateLogged: () => true,
    } as unknown) as RequestContext

    jest
      .spyOn(candidatesCoreApiService, 'get')
      .mockImplementation(() => Promise.resolve(candidatesCoreAvisosResponseMock))

    const result = await service.getAviso(contextMocked, 1234)

    expect(candidatesCoreApiService.get).toHaveBeenCalledWith(contextMocked, `/v0/postulantes/avisos/1234`)

    expect(result).toMatchSnapshot()
  })

  it('should get informacion solo de aviso usuario no logeado', async () => {
    const applicationCoreAvisosResponseMock = require('./application-core-aviso-response.mock.json')

    const applicationCoreApiService = ({ get: () => {} } as unknown) as ApplicationCoreApiService

    const service = new FichaAvisoService(applicationCoreApiService, null, null, null, null, null)

    const contextMocked = ({
      isCandidateLogged: () => false,
    } as unknown) as RequestContext

    jest
      .spyOn(applicationCoreApiService, 'get')
      .mockImplementation(() => Promise.resolve(applicationCoreAvisosResponseMock))

    const result = await service.getAviso(contextMocked, 1234)

    expect(applicationCoreApiService.get).toHaveBeenCalledWith(contextMocked, `/v0/application/avisos/1234`)

    expect(result).toMatchSnapshot()
  })

  it('should get look and feel ok', async () => {
    const lookAndFeelMocked = require('./look-and-feel-response.mock.json')
    const empresaMocked = require('./application-core-empresa-response.mock.json')

    const applicationCoreApiService = ({ get: () => {} } as unknown) as ApplicationCoreApiService
    const applicationAvisosService = ({
      avisoLookAndFeel: (context, idAviso) => {
        lookAndFeelMocked
      },
    } as unknown) as ApplicationAvisosService

    const service = new FichaAvisoService(applicationCoreApiService, null, applicationAvisosService, null, null, null)

    const contextMocked = {} as RequestContext

    const avisoIdMock = 1234
    const empresaMock = {
      confidencial: false,
      denominacion: 'Denominacion empresa',
      id: 1,
    }

    jest
      .spyOn(applicationAvisosService, 'avisoLookAndFeel')
      .mockImplementation(() => Promise.resolve(lookAndFeelMocked))
    jest.spyOn(applicationCoreApiService, 'get').mockImplementation(() => Promise.resolve(empresaMocked))

    const productoLookAndFeel = await service.getProductoLookAndFeel(contextMocked, avisoIdMock, empresaMock)

    expect(applicationAvisosService.avisoLookAndFeel).toHaveBeenCalledWith(contextMocked, avisoIdMock)
    expect(applicationCoreApiService.get).toHaveBeenCalledWith(
      contextMocked,
      `/v0/application/empresas/empresas/${empresaMock.id}`
    )

    expect(productoLookAndFeel).toMatchSnapshot()
  })

  it('should get estadisticas ok', async () => {
    const estadisticasMocked = require('./estadisticas.mock.json')
    const redisService = ({ getValue: () => {} } as unknown) as RedisService
    const service = new FichaAvisoService(null, null, null, redisService, null, null)

    const contextMocked = ({
      site: {
        idPais: 1,
      },
    } as unknown) as RequestContext

    const avisoMock = ({
      aviso: {
        titulo: 'Titulo Aviso',
        id: 1234,
        puesto: {
          puestoId: 611,
          nombre: 'Nombre puesto mocked',
        },
        subArea: {
          nombre: 'Nombre area mocked',
        },
        empresa: {
          denominacion: 'Denominacion Empresa',
          id: 1,
        },
      },
    } as unknown) as FichaAvisoResponseDto

    jest.spyOn(redisService, 'getValue').mockImplementation(() => Promise.resolve(estadisticasMocked))

    const linkSeoSalario = await service.getEstadisticasPuesto(contextMocked, avisoMock)

    expect(linkSeoSalario).toMatchSnapshot()
  })

  it('should get avisos similares ok', async () => {
    const coreAvisosSimilaresMock = require('./core-avisos-similares.mock.json')
    const applicationCoreApiService = ({ get: () => {} } as unknown) as ApplicationCoreApiService
    const service = new FichaAvisoService(applicationCoreApiService, null, null, null, null, null)

    const contextMocked = ({} as unknown) as RequestContext

    const avisoIdMock = 1234

    jest.spyOn(applicationCoreApiService, 'get').mockImplementation(() => Promise.resolve(coreAvisosSimilaresMock))

    const avisosSimilares = await service.getAvisosSimilares(contextMocked, avisoIdMock)

    expect(applicationCoreApiService.get).toHaveBeenCalledWith(
      contextMocked,
      `/v0/application/avisos/${avisoIdMock}/similares?excluyeEmpresa=true`
    )

    expect(avisosSimilares).toMatchSnapshot()
  })

  it('should add video vimeo a aviso logueado', async () => {
    const candidatesCoreAvisosResponseMock = require('./candidates-core-aviso-response.mock.json')
    const service = new FichaAvisoService(null, null, null, null, null, null)

    const videoUrl = await service.getVideoUrl(candidatesCoreAvisosResponseMock.aviso.videoUrl)

    expect(videoUrl).toBeDefined()
    expect(videoUrl).toEqual('https://player.vimeo.com/video/136332115')
  })

  it('should add video youtube a aviso logueado', async () => {
    const applicationCoreAvisosResponseMock = require('./application-core-aviso-youtube-response.mock.json')
    const service = new FichaAvisoService(null, null, null, null, null, null)

    const videoUrl = await service.getVideoUrl(applicationCoreAvisosResponseMock.videoUrl)

    expect(videoUrl).toBeDefined()
    expect(videoUrl).toEqual('https://www.youtube.com/embed/Ri2aMOoEnpM?wmode=transparent')
  })

  it('should add seoFriendlyUrl a aviso logueado', async () => {
    const candidatesCoreAvisosResponseMock = require('./candidates-core-aviso-response.mock.json')
    const service = new FichaAvisoService(null, null, null, null, null, null)

    const { aviso } = candidatesCoreAvisosResponseMock
    const seoFriendlyUrl = await service.getSeoFriendlyUrl(aviso.titulo, aviso.empresa.denominacion, aviso.id)

    expect(seoFriendlyUrl).toBeDefined()
    expect(seoFriendlyUrl).toEqual('/empleos/analista-bi-sr.-navent-1113468691.html')
  })

  it('should ocultar info si es empresa confidencial', async () => {
    let empresaConfidencial = {
      denominacion: 'Confidencial',
      logoURL: null,
      confidencial: true,
      id: 13062978,
    }
    const service = new FichaAvisoService(null, null, null, null, null, null)

    await service.ocultarInformacionEmpresaConfidencial(empresaConfidencial)

    expect(empresaConfidencial).toBeDefined()
    expect(empresaConfidencial.confidencial).toBeDefined()
    expect(empresaConfidencial.confidencial).toBeTruthy()
    expect(empresaConfidencial.logoURL).toBe(undefined) //TODO Revisar esto
    expect(empresaConfidencial.id).toBe(undefined) //TODO Revisar esto
    expect(empresaConfidencial.denominacion).toBe(undefined) //TODO Revisar esto
  })

  it('should get avisos sugeridos', async () => {
    const candidatesCoreAvisosSugeridosMock = require('./candidates-core-avisos-sugeridos.mock.json')
    const avisosService = ({ search: () => {} } as unknown) as AvisosService

    const service = new FichaAvisoService(null, null, null, null, avisosService, null)

    jest.spyOn(avisosService, 'search').mockImplementation(() => Promise.resolve(candidatesCoreAvisosSugeridosMock))

    const result = await service.getAvisosSugeridos({} as RequestContext, 12, 34)

    expect(avisosService.search).toHaveBeenCalledWith({} as RequestContext, {
      filterData: { subAreasId: [34] },
    })

    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toBeDefined()
    expect(result[0].empresa).toBeDefined()
    expect(result[0].localizacion).toBeDefined()
    expect(result[0].link).toBeDefined()
    expect(result[0].titulo).toBeDefined()
    expect(result).toMatchSnapshot()
  })
})
