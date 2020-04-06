export class PostulantePostulacionResponseCore {
  erroresFiltros?: Array<string>
  /**
   * Estado de la postulacion
   */
  estado?: PostulantePostulacionResponseCore.EstadoEnum
  id?: number
}

export namespace PostulantePostulacionResponseCore {
  export enum EstadoEnum {
    Realizada = <any>'realizada',
    Espera = <any>'espera',
  }
}
