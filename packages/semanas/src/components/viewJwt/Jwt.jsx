//REACT
import React, { Component } from 'react'
import axios from 'axios'
//ASSETS
import './Jwt.css'

class Jwt extends Component {
  constructor(props) {
    super(props)
    this.state = { jwt: '' }
  }

  componentDidMount() {
    axios
      .get('/getToken')
      .then(tokenResult => {
        const jsonWebToken = tokenResult.data
        localStorage.token = jsonWebToken
      })
      .catch(error => {
        console.log('Error al setear token')
      })
  }

  sendJWT = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.token,
      },
    }
    axios
      .get('/decodeToken', config)
      .then(decodedTokenResult => {
        console.log('DecodedTokenResult : ' + JSON.stringify(decodedTokenResult.data))
        this.setState({
          jwt: JSON.stringify(decodedTokenResult.data),
        })
      })
      .catch(error => {
        console.log('Error al setear token')
      })
  }

  render() {
    return (
      <div className="Jwt">
        <div className="container-fluid">
          <input type="submit" value="Submit" id="botonJWT" onClick={() => this.sendJWT()} />
          <label id="labelJWT">{this.state.jwt}</label>
        </div>
      </div>
    )
  }
}

export default Jwt
