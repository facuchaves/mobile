import { RequestContext } from '../../models/request-context'
import { TestingModule, Test } from '@nestjs/testing'
import { CandidatesService } from './candidates.service'
import { RedisModule } from '../../cache/cache-redis/redis.module'
import { CandidatesCoreApiModule } from '../../candidates/candidates-core-api/candidates-core-api.module'
import { AuthModule } from '../../auth/auth.module'
import { ApplicationCoreApiModule } from '../../application-core-api/application-core-api.module'

describe('Candidates ', () => {
  let service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule, CandidatesCoreApiModule, AuthModule, ApplicationCoreApiModule],
      providers: [CandidatesService],
    }).compile()

    service = module.get<CandidatesService>(CandidatesService)
  })

  it('should completar req con solo nombre', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, { nombre: 'Nombre modificado' })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo apellido', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, {
      apellido: 'Apellido modificado',
    })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo email', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, { email: 'Email modificado' })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo paisNacimientoId', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, { paisNacimientoId: 2 })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo celularNumero', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, {
      celularNumero: 'CelularNumero modificado',
    })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo celularPrefijo', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, {
      celularPrefijo: 'CelularPrefijo modificado',
    })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo discapacidadDetalle', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, {
      discapacidadDetalle: 'DiscapacidadDetalle modificado',
    })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo documento', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, {
      documento: 'Documento modificado',
    })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo estadoCivilId', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, { estadoCivilId: 2 })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo fechaNacimiento', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, {
      fechaNacimiento: 'FechaNacimiento modificado',
    })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo genero', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, { genero: 'Genero modificado' })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo telefonoFijoNumero', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, {
      telefonoFijoNumero: 'TelefonoFijoNumero modificado',
    })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo telefonoFijoPrefijo', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, {
      telefonoFijoPrefijo: 'TelefonoFijoPrefijo modificado',
    })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo tieneLicenciaConducir', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, { tieneLicenciaConducir: false })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo tieneMovilidadPropia', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, { tieneMovilidadPropia: false })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })

  it('should completar req con solo tipoDocumentoId', async () => {
    const datosPostulanteLogueadoMock = require('./datos-postulante-logueado.mock')

    jest.spyOn(service, 'getDatosDePostulante').mockImplementation(() => Promise.resolve(datosPostulanteLogueadoMock))

    const result = await service.getDatosDePostulanteReqCoreDto({} as RequestContext, { tipoDocumentoId: 2 })

    expect(service.getDatosDePostulante).toHaveBeenCalledWith({} as RequestContext)

    expect(result).toMatchSnapshot()
  })
})
