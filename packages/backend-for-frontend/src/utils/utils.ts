/**
 * Clase que resuelve cosas comunes cross proyecto, como saber el portal o el ambiente en el que se esta.
 */
class Utils {
  constructor() {}

  getNodeEnv() {
    if (process.env.NODE_ENV !== null && process.env.NODE_ENV !== undefined) {
      return process.env.NODE_ENV.split('-')
    }
    return ''
  }

  getPortal() {
    return this.getNodeEnv()[0]
  }

  getEnviroment() {
    return this.getNodeEnv()[1]
  }

  isProduction() {
    return this.getNodeEnv()[1] == 'prod' ? true : false
  }

  isPrepro() {
    return this.getNodeEnv()[1] == 'prepro' ? true : false
  }

  isDevelop() {
    return this.getNodeEnv()[1] == 'dev' ? true : false
  }

  isLocal() {
    return this.getNodeEnv()[1] == 'local' ? true : false
  }
}

const utils = new Utils()
export default utils
