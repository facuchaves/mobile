//LOGGER
// const infoLogger = loggerFactory.getInfoLogger(module);

class CacheService {
  generalCache
  constructor() {
    this.generalCache = {}
  }

  async getValue(key, callback) {
    if (this.hasValue(key)) {
      return this.getCachedValue(key)
    }

    const value = await callback()
    this.setValue(key, value)
    return value
  }

  getCachedValue(key) {
    // infoLogger.debug(`Devolviendo key ${key} de la cache`);
    return this.generalCache[key]
  }

  setValue(key, value) {
    // infoLogger.debug(`Seteando key ${key} con value ${value} en la cache`);
    this.generalCache[key] = value
  }

  resetValue(key) {
    this.generalCache[key] = null
  }

  hasValue(key) {
    // infoLogger.debug(`Buscando key ${key} en la cache`);
    const value = this.getCachedValue(key)
    return value !== null && value !== undefined
  }

  clearCache() {
    this.generalCache = {}
  }

  generalCacheToString() {
    let str = ''

    for (let key in this.generalCache) {
      let value = this.generalCache[key]
      str += ' Key : ' + key + ' Value : ' + value + '\n'
    }

    return str
  }
}

const cacheService = new CacheService()
export default cacheService
