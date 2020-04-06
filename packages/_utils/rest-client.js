/* eslint-disable new-cap */
import querystring from 'querystring'
import util from 'util'
import axios from 'axios'
import { isEmpty } from 'lodash'

let sessionJwt = localStorage.getItem('sessionJwt')
let siteIdHeader = process.env.REACT_APP_SITE_ID

const persistJwt = response => {
  if (response) {
    sessionJwt = response.headers['x-session-jwt']
    if (sessionJwt) {
      localStorage.setItem('sessionJwt', sessionJwt)
    }
  }
}

axios.interceptors.request.use(config => {
  // Set 4 characters SITE_ID
  config.headers['x-site-id'] = siteIdHeader // eslint-disable-line no-param-reassign

  // Set sessionJwt to each request
  if (!isEmpty(sessionJwt)) {
    config.headers['x-session-jwt'] = sessionJwt // eslint-disable-line no-param-reassign
  }
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

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/'

// TODO: refactorear para exportar solamente funciones (get/post/...)
export const initApiClient = siteId => {
  siteIdHeader = siteId
}

/**
 * Representacion de un request
 */
export class Request {
  constructor(baseURL = API_BASE_URL, path, body, headers = {}, params = {}, method) {
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

  getHeaders() {
    if (this.headers['Content-Type'] === null || this.headers['Content-Type'] === undefined) {
      this.headers['Content-Type'] = 'application/json'
    }

    if (this.headers.Accept === null || this.headers.Accept === undefined) {
      this.headers.Accept = 'application/json'
    }

    if (localStorage.token !== null && localStorage.token !== undefined) {
      this.headers.Authorization = `Bearer ${localStorage.token}`
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

  getConfig() {
    return { baseURL: this.baseURL, headers: this.getHeaders() }
  }

  call() {
    return new this.method().call(this).then(response => {
      return this.handleResponse(response)
    })
  }

  handleResponse(response) {
    // console.log(this.toString());
    // console.log("RESPONSE STATUS: " + response.status);
    // console.log("Resp.data : " + JSON.stringify(response.data));
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

  getRestCallback(request) {
    return axios.get(request.getPath(), request.getConfig())
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

  getRestCallback(request) {
    return axios.delete(request.getPath(), request.getConfig())
  }

  getName() {
    return 'DELETE'
  }
}

export class Post extends Method {
  getRestCallback(request) {
    return axios.post(request.getPath(), request.getBody(), request.getConfig())
  }

  getName() {
    return 'POST'
  }
}

export class Put extends Method {
  getRestCallback(request) {
    return axios.put(request.getPath(), request.getBody(), request.getConfig())
  }

  getName() {
    return 'PUT'
  }
}

/**
 * Funciones
 */

export const init = ({ baseURL = API_BASE_URL } = {}) => {
  axios.defaults.baseURL = baseURL
}

export const get = async (url, { sendCookies = false, ...config } = {}) => {
  let callEntity = axios
  if (sendCookies) {
    callEntity = axios.create({
      withCredentials: true,
    })
  }
  const { data } = await callEntity.get(url, { ...config, headers: { 'x-site-id': siteIdHeader } })
  return data
}

export const post = async (url, body, { sendCookies = false, ...config } = {}) => {
  let callEntity = axios
  if (sendCookies) {
    callEntity = axios.create({
      withCredentials: true,
    })
  }
  const { data } = await callEntity.post(url, body, { ...config, headers: { 'x-site-id': siteIdHeader } })
  return data
}
