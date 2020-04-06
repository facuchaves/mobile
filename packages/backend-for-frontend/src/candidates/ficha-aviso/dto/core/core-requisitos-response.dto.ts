/**
 * Clase que repreenta los requisitos de un aviso.
 *
 * Esta clase la mantenemos para saber que esta en la respuesta del core, pero no se usa entonces no defino cada una de los requisitos.
 * Si se necesitara usar requisitos, habria que definirlos recien en esa instancia.
 *
 */
export class CoreRequisitosResponseDto {
  edad?: any //EdadRequisitoReadableResponse;
  educacion?: any //EducacionRequisitoReadableResponse;
  experiencia?: any //ExperienciaRequisitoReadableResponse;
  genero?: any //GeneroRequisitoReadableResponse;
  idiomas?: any //Array<IdiomaRequisitoReadableResponse>;
  residencia?: any //ResidenciaRequisitoReadableResponse;
  salario?: any //SalarioRequisitoReadableResponse;
}
