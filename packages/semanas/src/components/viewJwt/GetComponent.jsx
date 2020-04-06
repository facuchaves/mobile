//REACT
import React, { Component } from 'react'

//RestClient
import Request, { Get, Delete, Put, Post } from '../../models/restClient'

class GetComponent extends Component {
  constructor(props) {
    super(props)

    this.request = new Request()
    this.request.baseURL = 'http://httpbin.org'

    this.state = { texto: '' }
  }

  sendGet = () => {
    this.request.path = '/get'
    this.request.method = Get

    this.request.call().then(result => {
      this.setState({ texto: JSON.stringify(result) })
    })
  }

  sendPost = () => {
    this.request.path = '/post'
    this.request.method = Post

    this.request.call().then(result => {
      this.setState({ texto: JSON.stringify(result) })
    })
  }

  sendPut = () => {
    this.request.path = '/put'
    this.request.method = Put

    this.request.call().then(result => {
      this.setState({ texto: JSON.stringify(result) })
    })
  }

  sendDelete = () => {
    this.request.path = '/delete'
    this.request.method = Delete

    this.request.call().then(result => {
      this.setState({ texto: JSON.stringify(result) })
    })
  }

  render() {
    return (
      <div className="Jwt">
        <div className="container-fluid">
          <input type="submit" value="Get" onClick={() => this.sendGet()} />
          <input type="submit" value="Post" onClick={() => this.sendPost()} />
          <input type="submit" value="Put" onClick={() => this.sendPut()} />
          <input type="submit" value="Delete" onClick={() => this.sendDelete()} />
          <br />
          <label id="labelJWT">{this.state.texto}</label>
        </div>
      </div>
    )
  }
}

export default GetComponent
