import React from 'react'
import logo from '../../assets/images/logoSemana.svg'

//ASSETS
import './header.css'

export default class Header extends React.PureComponent {
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-light bg-light">
          <img src={logo} className="nav-logo" alt="logo" />
        </nav>
      </div>
    )
  }
}
