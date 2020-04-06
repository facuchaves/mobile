import { parseQuery } from './services'

describe('Parse query', () => {
  let service

  beforeEach(async () => {
    service = parseQuery
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should parse query with 1 word', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-busqueda-programador.html')
    expect(filtros.busqueda).toEqual('programador')
  })

  it('should parse query with 2 words', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-busqueda-programador-java.html')
    expect(filtros.busqueda).toEqual('programador java')
  })

  it('should parse categoria', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-categoria-administracion.html')
    expect(filtros.categoria).toEqual('administracion')
  })

  it('should parse area', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-area-ingenierias.html')
    expect(filtros.area).toEqual('ingenierias')
  })

  it('should parse subarea', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-subarea-administracion.html')
    expect(filtros.subarea).toEqual('administracion')
  })

  it('should parse publicacion', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-publicacion-hoy.html')
    expect(filtros.publicacion).toEqual('hoy')
  })

  it('should parse seniority', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-seniority-senior-semi-senior.html')
    expect(filtros.seniority).toEqual('senior semi senior')
  })

  /*
  
  it('should parse provincia', () => {
    const filtros = service('https://www.bumeran.com.ar/catamarca/empleos.html')
    expect(filtros.provincia).toEqual('catamarca')
  })

  it('should parse CABA', () => {
    const filtros = service('https://www.bumeran.com.ar/capital-federal-buenos-aires/empleos.html')
    expect(filtros.ciudad).toEqual('programador java')
    expect(filtros.provincia).toEqual('programador java')
    expect(undefined).toBeDefined()
  })

  it('should parse ciudad', () => {
    const filtros = service(
      'https://www.bumeran.com.ar/vicente-lopez-buenos-aires/empleos-salario-sin-especificar.html'
    )
    expect(filtros.ciudad).toEqual('programador java')
    expect(filtros.provincia).toEqual('programador java')
    expect(undefined).toBeDefined()
  })

  it('should parse all', () => {
    const filtros = service(
      'https://www.bumeran.com.ar/capital-federal-buenos-aires/empleos-subarea-contabilidad-full-time-discapacitados-apto-busqueda-programador-publicacion-hoy-salario-sin-especificar-seniority-senior-semi-senior.html'
    )

    expect(filtros.subarea).toEqual('contabilidad')
    expect(filtros.busqueda).toEqual('programador')
    expect(filtros.publicacion).toEqual('hoy')
    expect(filtros.salario).toEqual('sin especificar')
    expect(filtros.seniority).toEqual('senior semi senior')
    expect(filtros.aptoDiscapacitados).toBeTruthy()
    expect(filtros.tipotrabajo).toEqual('full time')
  })

  
  it('should parse muchas areas', () => {
    expect(undefined).toBeDefined()
  })

  it('should parse muchas subareas', () => {
    expect(undefined).toBeDefined()
  })

  it('should parse salario', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-discapacitados-apto-$8001-$*.html')
    expect(filtros.salarioDesde).toEqual(8001)
  })

  it('should parse varias provincias', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-provincias-42746-146943.html')
    expect(filtros.provincias).toEqual([42746, 146943])
  })

  it('should parse varias ciudades', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-busqueda-programador-java.html')
    expect(filtros.busqueda).toEqual('programador java')
    expect(undefined).toBeDefined()
  })

  it('should parse full time', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-full-time.html')
    expect(filtros.tipotrabajo).toEqual('full time')
  })

  it('should parse discapacitado apto', () => {
    const filtros = service('https://www.bumeran.com.ar/empleos-discapacitados-apto.html')
    expect(filtros.aptoDiscapacitados).toBeTruthy()
  })
  */
})
