export default class Error {
  constructor(status, message, description) {
    this.status = status
    this.message = message
    this.description = description
  }

  getStatus() {
    return this.status
  }

  getMessage() {
    return this.message
  }

  getDescription() {
    return this.description
  }

  toString() {
    return `Status : ${this.status}\nMessage : ${this.message}\nDescription : ${this.description}\n`
  }
}
