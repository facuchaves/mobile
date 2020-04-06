/**
 * Clase que maneja errores de forma general
 */
class ErrorUtils {
  /**
   * TODO Implementar un modal de error con el mensaje de error pasado por parametro.
   * @param {mensaje de error a mostrar} messageError
   */
  openModalError(messageError) {
    alert(`Error : ${messageError}`)
  }

  /**
   * TODO Implementar para que muestre el error en un div superior.
   * @param {mensaje de error a mostrar} messageError
   */
  displayError(messageError) {
    console.log(`Error : ${messageError}`)
  }
}

const errorUtils = new ErrorUtils()
export default errorUtils
