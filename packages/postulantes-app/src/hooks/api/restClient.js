/* eslint-disable camelcase */
/* eslint-disable new-cap */
import querystring from 'querystring'
import util from 'util'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Config from 'react-native-config'

let sessionJwt = AsyncStorage.getItem('sessionJwt')

const persistJwt = async response => {
  sessionJwt = response.headers['x-session-jwt']
  if (sessionJwt) {
    await AsyncStorage.setItem('sessionJwt', sessionJwt)
  }
}

// Set sessionJwt to each request
axios.interceptors.request.use(config => {
  // eslint-disable-next-line no-param-reassign
  config.headers['x-session-jwt'] = sessionJwt
  return config
})

// Get sessionJwt from each response
axios.interceptors.response.use(
  response => {
    persistJwt(response)
    return response
  },
  error => {
    persistJwt(error.response)
    return Promise.reject(error)
  }
)

/**
 * Representacion de un request
 */
export default class Request {
  // PREPRO Config.API_URL,
  // http://172.16.2.134:5000

  constructor(baseURL = Config.API_URL, path, body, headers = {}, params = {}, method) {
    this.baseURL = baseURL
    this.path = path
    this.body = body
    this.headers = headers
    this.params = params
    this.method = method
  }

  getPath() {
    const queryUrl = querystring.stringify(this.params)
    return queryUrl ? `${this.path}?${queryUrl}` : this.path
  }

  getBody() {
    return JSON.stringify(this.body)
  }

  getHeaders = async () => {
    if (this.headers['Content-Type'] === null || this.headers['Content-Type'] === undefined) {
      this.headers['Content-Type'] = 'application/json'
    }

    if (this.headers.Accept === null || this.headers.Accept === undefined) {
      this.headers.Accept = 'application/json'
    }

    if (AsyncStorage.token !== null && AsyncStorage.token !== undefined) {
      this.headers.Authorization = `Bearer ${AsyncStorage.token}`
    }

    // REVISARLO ES PROVISORIO
    this.headers['CF-Access-Client-Id'] = '433291a9b3cd99c63da5db1d6fae91ea.access.bumeran.com.ar'
    this.headers['CF-Access-Client-Secret'] = '86daa71cfa93e98388172b291522e08fcae8d9d8c7f19c3d113c64f9a8e138fa'
    this.headers['x-site-id'] = Config.CODE_PAIS // 'BMAR'

    // HEADERS LOGIN POSTULANTE
    const token_auth_postulante = (await AsyncStorage.getItem('token_auth_postulante')) || null
    const refresh_token = (await AsyncStorage.getItem('refresh_token')) || null
    const expires_in = (await AsyncStorage.getItem('expires_in')) || null

    if (token_auth_postulante !== null && token_auth_postulante !== undefined) {
      this.headers.token_auth_postulante = token_auth_postulante
    }

    if (refresh_token !== null && refresh_token !== undefined) {
      this.headers.refresh_token_auth_postulante = refresh_token
    }

    if (expires_in !== null && expires_in !== undefined) {
      // eslint-disable-next-line radix
      this.headers.token_expiration_auth_postulante_milis = expires_in
    }
    return this.headers
  }

  validate() {}

  hasBaseURL() {
    return !this.isEmptyField(this.baseURL)
  }

  hasBody() {
    return !this.isEmptyField(this.body)
  }

  isEmptyField(field) {
    return field === null || field === undefined || field === ''
  }

  getConfig = async () => {
    return { baseURL: this.baseURL, headers: await this.getHeaders() }
  }

  call() {
    return new this.method().call(this).then(response => {
      return this.handleResponse(response)
    })
  }

  handleResponse(response) {
    // console.log(this.toString())
    // console.log('RESPONSE STATUS: ' + response.status)
    // console.log('Resp.data : ' + JSON.stringify(response.data))
    return response.data // TODO Ver de usar un parser dinamicamente, para los casos que no son JSON.
  }

  toString() {
    return (
      `REQUEST-METHOD : ${this.method} \n ` +
      `REQUEST-URL: : ${this.baseURL}${this.getPath()} \n ` +
      `REQUEST-BODY: \n ${this.getBody()} \n ` +
      `REQUEST-HEADERS: \n' ${util.inspect(this.headers, { showHidden: false, depth: null })} \n`
    )
  }
}

class Method {
  validateRequest(request) {
    request.validate()
  }

  call(request) {
    return new Promise((resolve, reject) => {
      try {
        this.validateRequest(request)
        resolve()
      } catch (error) {
        reject(error)
      }
    }).then(() => {
      return this.getRestCallback(request)
    })
  }

  getRestCallback() {}

  getName() {}
}

export class Get extends Method {
  validateRequest(request) {
    super.validateRequest(request)
    if (request.hasBody()) {
      throw new Error('No se puede hacer get con body')
    }
  }

  getRestCallback = async request => {
    return axios.get(request.getPath(), await request.getConfig())
  }

  getName() {
    return 'GET'
  }
}

export class Delete extends Method {
  validateRequest(request) {
    super.validateRequest(request)
    if (request.hasBody()) {
      throw new Error('No se puede hacer delete con body')
    }
  }

  getRestCallback = async request => {
    return axios.delete(request.getPath(), await request.getConfig())
  }

  getName() {
    return 'DELETE'
  }
}

export class Post extends Method {
  getRestCallback = async request => {
    return axios.post(request.getPath(), request.getBody(), await request.getConfig())
  }

  getName() {
    return 'POST'
  }
}

export class Patch extends Method {
  getRestCallback = async request => {
    return axios.patch(request.getPath(), request.getBody(), await request.getConfig())
  }

  getName() {
    return 'PATCH'
  }
}

export class Put extends Method {
  getRestCallback = async request => {
    return axios.put(request.getPath(), request.getBody(), await request.getConfig())
  }

  getName() {
    return 'PUT'
  }
}
