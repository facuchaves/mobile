import { CurriculumService } from './curriculum.service'
import { RequestContext } from '../../models/request-context'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { CandidatesService } from '../../candidates/services/candidates.service'
import { JwtService } from '@nestjs/jwt'
import { RedisService } from '../../cache/cache-redis/redis.service'
import { StaticEntitiesService } from '../../static-entities/static-entities.service'

describe('Curriculum', () => {
  let service
  let candidatesCoreApiService
  let candidatesService
  let spy
  let staticEntitiesService
  beforeEach(async () => {
    candidatesCoreApiService = ({
      get: (context, url) => {},
      delete: () => {},
      put: () => {},
      post: () => {},
    } as unknown) as CandidatesCoreApiService

    candidatesService = ({
      getDatosDePostulante: () => {
        return { paisResidencia: { id: 1 } }
      },
    } as unknown) as CandidatesService

    const jwtService = ({
      decode: () => true,
      user_id: () => true,
    } as unknown) as JwtService

    const redisService = ({
      getValue: (key, callback) => callback(),
      del: (key) => {},
    } as unknown) as RedisService

    staticEntitiesService = ({
      provincias: key => [
        {
          id: 29,
          nombre: 'Buenos Aires',
        },
      ],
      localidades: key => [
        {
          id: 7,
          nombre: 'Capital Federal',
        },
      ],
    } as unknown) as StaticEntitiesService

    service = new CurriculumService(
      redisService,
      candidatesCoreApiService,
      jwtService,
      candidatesService,
      staticEntitiesService
    )
    spy = null
  })

  afterEach(async () => {
    if (spy) spy.mockClear()
  })

  it('should get curriculum data', async () => {
    const contextMocked = ({
      isCandidateLogged: () => true,
      oauthPostulante: () => {
        return { accessToken: 'accessToken' }
      },
    } as unknown) as RequestContext
    spy = jest.spyOn(candidatesCoreApiService, 'get').mockImplementation((context, url) => {
      if (url === `/v0/postulantes/residencia`) {
        return {
          level1: 'Buenos Aires',
          locality: 'Capital Federal',
        }
      }
      if (url === `/v0/postulantes/curriculum`) {
        return Promise.resolve(curriculumMock.curriculum)
      }
      return {}
    })
    const candidatesServiceMock = jest
      .spyOn(candidatesService, 'getDatosDePostulante')
      .mockImplementation(() => Promise.resolve(curriculumMock.datosPersonales))
    const result = await service.curriculum(contextMocked)
    expect(result).toMatchSnapshot()
    candidatesServiceMock.mockClear()
  })

  it('should put experiencia laboral', async () => {
    const contextMocked = ({
      isCandidateLogged: () => true,
      oauthPostulante: () => {
        return { accessToken: 'accessToken' }
      },
    } as unknown) as RequestContext
    spy = jest.spyOn(candidatesCoreApiService, 'put').mockImplementation(() => Promise.resolve(true))
    const result = await service.deleteExperienciaLaboral(contextMocked, '1')
    expect(result).toMatchSnapshot()
  })

  it('should get experiencia laboral', async () => {
    const contextMocked = ({
      isCandidateLogged: () => true,
      oauthPostulante: () => {
        return { accessToken: 'accessToken' }
      },
    } as unknown) as RequestContext
    spy = jest
      .spyOn(candidatesCoreApiService, 'get')
      .mockImplementation(() => Promise.resolve(getExperienciaLaboralMock))
    const result = await service.getExperienciaLaboral(contextMocked, 1038082580)
    expect(result).toMatchSnapshot()
  })

  it('should post experiencia laboral', async () => {
    const contextMocked = ({
      isCandidateLogged: () => true,
      oauthPostulante: () => {
        return { accessToken: 'accessToken' }
      },
    } as unknown) as RequestContext
    spy = jest.spyOn(candidatesCoreApiService, 'post').mockImplementation(() => Promise.resolve(1038082580))
    const result = await service.postExperienciaLaboral(contextMocked, putExperienciaLaboral)
    expect(result).toMatchSnapshot()
  })

  it('should delete experiencia laboral', async () => {
    const contextMocked = ({
      isCandidateLogged: () => true,
      oauthPostulante: () => {
        return { accessToken: 'accessToken' }
      },
    } as unknown) as RequestContext
    spy = jest.spyOn(candidatesCoreApiService, 'delete').mockImplementation(() => Promise.resolve(true))
    const result = await service.deleteExperienciaLaboral(contextMocked, '1')
    expect(result).toMatchSnapshot()
  })
})

export const curriculumMock = {
  curriculum: {
    descripcion:
      'Buenos días,\nAdjunto el link de mi pagina con trabajos realizados.\nwww.barragandiseño.com.ar\nSoy Diseñador Grafico recientemente graduado de la UBA y tengo conocimientos en desarrollo web sobre Html5, Css3, JavaScript, ActionScript y Jquery.',
    salarioPreferencia: 1110,
    referencias: [
      {
        nombre: 'Bdj',
        apellido: 'Ndj',
        relacion: 'jefe',
        estado: 'sin_confirmar',
        email: 'adro@yopmail.com',
        detalle: 'a - asd',
        tipo: 'laboral',
        referenciaId: 1038082580,
        puesto: 'asd',
        id: 9127055,
        telefono: {
          prefijo: '11',
          numero: '73737',
        },
      },
      {
        nombre: 'jsj',
        apellido: 'ndj',
        relacion: 'jefe',
        estado: 'sin_confirmar',
        email: 'adro@yopmail.com',
        detalle: 'a - asd',
        tipo: 'laboral',
        referenciaId: 1038082580,
        puesto: 'asd',
        id: 9127171,
        telefono: {
          prefijo: '11',
          numero: '54848',
        },
      },
    ],
    estudios: [
      {
        titulo: 'Ingeniero en Informatica',
        fechaInicio: '01-01-2002',
        fechaFin: '01-05-2003',
        promedio: null,
        cantidadMateriasTotal: 40,
        cantidadMateriasAprobadas: 4,
        institucionEducativa: {
          id: 203,
          nombre: 'Universidad de Buenos Aires',
          alias: null,
        },
        rangoPromedio: null,
        id: 75668500,
        pais: {
          id: 1,
          nombre: 'Argentina',
          isoCode: 'ar',
        },
        areaEstudio: {
          id: 30,
          nombre: 'Ing. Informática',
        },
        estadoEstudio: {
          id: 3,
          nombre: 'Abandonado',
        },
        tipoEstudio: {
          id: 3,
          nombre: 'Universitario',
        },
      },
      {
        titulo: 'FGHFGH',
        fechaInicio: '01-08-2002',
        fechaFin: '01-08-2008',
        promedio: '4,654',
        cantidadMateriasTotal: null,
        cantidadMateriasAprobadas: null,
        institucionEducativa: {
          id: 199,
          nombre: 'UADE',
          alias: null,
        },
        rangoPromedio: {
          id: 11,
          nombre: 'desde 1 hasta 100',
        },
        id: 1017522464,
        pais: {
          id: 1,
          nombre: 'Argentina',
          isoCode: 'ar',
        },
        areaEstudio: {
          id: 233,
          nombre: 'Actuaría',
        },
        estadoEstudio: {
          id: 2,
          nombre: 'Graduado',
        },
        tipoEstudio: {
          id: 1,
          nombre: 'Secundario',
        },
      },
      {
        titulo: 'Diseñador Grafico',
        fechaInicio: '01-06-2003',
        fechaFin: '01-06-2011',
        promedio: '14',
        cantidadMateriasTotal: null,
        cantidadMateriasAprobadas: null,
        institucionEducativa: {
          id: 203,
          nombre: 'Universidad de Buenos Aires',
          alias: null,
        },
        rangoPromedio: {
          id: 11,
          nombre: 'desde 1 hasta 100',
        },
        id: 75666680,
        pais: {
          id: 1,
          nombre: 'Argentina',
          isoCode: 'ar',
        },
        areaEstudio: {
          id: 13,
          nombre: 'Diseño Gráfico',
        },
        estadoEstudio: {
          id: 2,
          nombre: 'Graduado',
        },
        tipoEstudio: {
          id: 3,
          nombre: 'Universitario',
        },
      },
      {
        titulo: 'jdkd',
        fechaInicio: '15-10-2007',
        fechaFin: null,
        promedio: null,
        cantidadMateriasTotal: null,
        cantidadMateriasAprobadas: null,
        institucionEducativa: {
          id: 100996,
          nombre: '"Instituto Universitario de Tecnología ""General Pedro María Freites"""',
          alias: null,
        },
        rangoPromedio: null,
        id: 1017801120,
        pais: {
          id: 1,
          nombre: 'Argentina',
          isoCode: 'ar',
        },
        areaEstudio: {
          id: 62,
          nombre: 'Antropología',
        },
        estadoEstudio: {
          id: 2,
          nombre: 'Graduado',
        },
        tipoEstudio: {
          id: 4,
          nombre: 'Posgrado',
        },
      },
    ],
    experienciasLaborales: [
      {
        empresa: 'ventas',
        puesto: 'ventas',
        fechaInicio: '01-03-2013',
        fechaFin: '01-02-2014',
        areaId: null,
        detalle: 'ventas',
        manejaPresupuesto: true,
        cantidadPersonasACargo: 3,
        area: {
          id: 6,
          nombre: 'Comercial, Ventas y Negocios',
        },
        subArea: {
          id: 35,
          nombre: 'Ventas',
        },
        industria: {
          id: 12,
          nombre: 'Comercio',
        },
        nivelPuesto: {
          id: 4,
          nombre: 'Senior',
        },
        id: 1041072093,
        pais: {
          id: 1,
          nombre: 'Argentina',
          isoCode: 'ar',
        },
      },
      {
        empresa: 'empresa de admin',
        puesto: 'puesto de test',
        fechaInicio: '15-09-2014',
        fechaFin: '15-09-2016',
        areaId: null,
        detalle: 'Jfjgkfjfbcjcj',
        manejaPresupuesto: false,
        cantidadPersonasACargo: 4,
        area: {
          id: 1,
          nombre: 'Administración, Contabilidad y Finanzas',
        },
        subArea: {
          id: 22,
          nombre: 'Administración',
        },
        industria: {
          id: 71,
          nombre: 'Alimenticia',
        },
        nivelPuesto: {
          id: 4,
          nombre: 'Senior',
        },
        id: 1036968401,
        pais: {
          id: 1,
          nombre: 'Argentina',
          isoCode: 'ar',
        },
      },
      {
        empresa: 'a',
        puesto: 'asd',
        fechaInicio: '16-12-2015',
        fechaFin: '07-12-2016',
        areaId: null,
        detalle: 'asdasdasdasd',
        manejaPresupuesto: false,
        cantidadPersonasACargo: null,
        area: {
          id: 1,
          nombre: 'Administración, Contabilidad y Finanzas',
        },
        subArea: {
          id: 22,
          nombre: 'Administración',
        },
        industria: {
          id: 60,
          nombre: 'Agro-Industrial',
        },
        nivelPuesto: {
          id: 3,
          nombre: 'SemiSenior',
        },
        id: 1038082580,
        pais: {
          id: 34,
          nombre: 'Alemania',
          isoCode: 'de',
        },
      },
    ],
    conocimientosNormalizados: [
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 2,
          nombre: 'Francés',
        },
        calificador: {
          id: 16,
          nombre: 'Escrito',
        },
        nivel: {
          id: 11,
          nombre: 'Intermedio',
        },
        conocimientoEspecifico: null,
        id: 60065614,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 2,
          nombre: 'Francés',
        },
        calificador: {
          id: 16,
          nombre: 'Escrito',
        },
        nivel: {
          id: 11,
          nombre: 'Intermedio',
        },
        conocimientoEspecifico: null,
        id: 60065617,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 2,
          nombre: 'Francés',
        },
        calificador: {
          id: 17,
          nombre: 'Oral',
        },
        nivel: {
          id: 11,
          nombre: 'Intermedio',
        },
        conocimientoEspecifico: null,
        id: 60065613,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 2,
          nombre: 'Francés',
        },
        calificador: {
          id: 17,
          nombre: 'Oral',
        },
        nivel: {
          id: 10,
          nombre: 'Avanzado',
        },
        conocimientoEspecifico: null,
        id: 60065616,
      },
      {
        grupo: {
          id: 3,
          nombre: 'Informatica',
        },
        tipo: {
          id: 8,
          nombre: 'Office',
        },
        calificador: {
          id: 18,
          nombre: 'Manejo',
        },
        nivel: {
          id: 10,
          nombre: 'Avanzado',
        },
        conocimientoEspecifico: null,
        id: 13193502,
      },
      {
        grupo: {
          id: 3,
          nombre: 'Informatica',
        },
        tipo: {
          id: 9,
          nombre: 'Base de Datos',
        },
        calificador: {
          id: 18,
          nombre: 'Manejo',
        },
        nivel: {
          id: 11,
          nombre: 'Intermedio',
        },
        conocimientoEspecifico: null,
        id: 13193503,
      },
      {
        grupo: {
          id: 3,
          nombre: 'Informatica',
        },
        tipo: {
          id: 11,
          nombre: 'Herramientas Graficas',
        },
        calificador: {
          id: 18,
          nombre: 'Manejo',
        },
        nivel: {
          id: 10,
          nombre: 'Avanzado',
        },
        conocimientoEspecifico: null,
        id: 13193505,
      },
      {
        grupo: {
          id: 3,
          nombre: 'Informatica',
        },
        tipo: {
          id: 1013,
          nombre: 'Aplicaciones Laborales',
        },
        calificador: {
          id: 19,
          nombre: 'Seniority',
        },
        nivel: {
          id: 1,
          nombre: 'Intermedio',
        },
        conocimientoEspecifico: {
          nombre: 'MS Office',
          id: 463,
        },
        id: 55324019,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 1102,
          nombre: 'Chino Mandarín',
        },
        calificador: {
          id: 16,
          nombre: 'Escrito',
        },
        nivel: {
          id: 12,
          nombre: 'Nativo',
        },
        conocimientoEspecifico: null,
        id: 60066559,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 1102,
          nombre: 'Chino Mandarín',
        },
        calificador: {
          id: 16,
          nombre: 'Escrito',
        },
        nivel: {
          id: 9,
          nombre: 'Básico',
        },
        conocimientoEspecifico: null,
        id: 60066565,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 1102,
          nombre: 'Chino Mandarín',
        },
        calificador: {
          id: 17,
          nombre: 'Oral',
        },
        nivel: {
          id: 10,
          nombre: 'Avanzado',
        },
        conocimientoEspecifico: null,
        id: 60066558,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 1102,
          nombre: 'Chino Mandarín',
        },
        calificador: {
          id: 17,
          nombre: 'Oral',
        },
        nivel: {
          id: 9,
          nombre: 'Básico',
        },
        conocimientoEspecifico: null,
        id: 60066564,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 1103,
          nombre: 'Coreano',
        },
        calificador: {
          id: 16,
          nombre: 'Escrito',
        },
        nivel: {
          id: 10,
          nombre: 'Avanzado',
        },
        conocimientoEspecifico: null,
        id: 60065104,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 1103,
          nombre: 'Coreano',
        },
        calificador: {
          id: 16,
          nombre: 'Escrito',
        },
        nivel: {
          id: 12,
          nombre: 'Nativo',
        },
        conocimientoEspecifico: null,
        id: 60067215,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 1103,
          nombre: 'Coreano',
        },
        calificador: {
          id: 17,
          nombre: 'Oral',
        },
        nivel: {
          id: 11,
          nombre: 'Intermedio',
        },
        conocimientoEspecifico: null,
        id: 60065103,
      },
      {
        grupo: {
          id: 2,
          nombre: 'Idiomas',
        },
        tipo: {
          id: 1103,
          nombre: 'Coreano',
        },
        calificador: {
          id: 17,
          nombre: 'Oral',
        },
        nivel: {
          id: 12,
          nombre: 'Nativo',
        },
        conocimientoEspecifico: null,
        id: 60067214,
      },
    ],
    conocimientosDesnormalizados: [
      {
        titulo: 'Fotografia',
        descripcion: 'Conocimientos generales en composicion y pos-edicion de imagen',
        id: 42789980,
      },
    ],
    id: 61782940,
  },
  datosPersonales: {
    email: 'abarragan@navent.com',
    nombre: 'Adrián Guillermo',
    apellido: 'Barragánn',
    fotoURL: 'http://imgbum.prepro.jobscdn.com/portal/img/postulantes/1/static/cvMainPic_68562460_bum_v64776769.jpg',
    cvAdjuntoURL: 'applicant_68562460_CV_61782940.mp4',
    disabilityCertificateURL: null,
    tipoDocumento: {
      id: 45,
      nombre: 'D.N.I.',
    },
    numeroDocumento: '31034553',
    fechaNacimiento: '19-08-1983',
    genero: 'masculino',
    paisResidencia: {
      id: 1,
      nombre: 'Argentina',
      isoCode: 'ar',
    },
    codigoPostal: null,
    direccion: 'caa guazu 986, Curuzú Cuatiá, Corrientes, Argentina',
    paisNacimiento: {
      id: 1,
      nombre: 'Argentina',
      isoCode: 'ar',
    },
    paisRegistro: {
      id: 1,
      nombre: 'Argentina',
      isoCode: 'ar',
    },
    telefonoCelular: {
      prefijo: '5415',
      numero: '64738023',
    },
    telefonoFijo: {
      prefijo: '5411',
      numero: '35284312',
    },
    estadoCivil: {
      id: 1,
      nombre: 'Soltero/a',
    },
    discapacidad: null,
    tieneMovilidadPropia: null,
    tieneLicenciaConducir: null,
    id: 68562460,
  },
}

const putExperienciaLaboral = {
  empresa: {
    empresaId: '1',
    nombre: 'nombre',
  },
  puesto: { nombre: 'aaaa', puestoId: 1 },
  fechaInicio: '16-12-2015',
  fechaFin: '07-12-2016',
  areaId: 1,
  detalle: 'asdasdasdasd',
  manejaPresupuesto: false,
  cantidadPersonasACargo: null,
  industriaId: 60,
  nivelPuestoId: 3,
  paisId: 34,
  subAreaId: 22,
}

const getExperienciaLaboralMock = {
  empresa: 'vago',
  puesto: 'senior',
  fechaInicio: '01-03-2014',
  fechaFin: '01-03-2013',
  areaId: null,
  detalle: 'string',
  manejaPresupuesto: true,
  cantidadPersonasACargo: 0,
  area: {
    id: 6,
    nombre: 'Comercial, Ventas y Negocios',
  },
  subArea: {
    id: 35,
    nombre: 'Ventas',
  },
  industria: {
    id: 12,
    nombre: 'Comercio',
  },
  nivelPuesto: {
    id: 4,
    nombre: 'Senior',
  },
  id: 1047610058,
  pais: {
    id: 1,
    nombre: 'Argentina',
    isoCode: 'ar',
  },
}
