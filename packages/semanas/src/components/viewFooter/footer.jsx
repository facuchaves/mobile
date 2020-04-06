import React from 'react'
//ASSETS
import './footer.css'
import naventImg from '../../assets/images/logo-nav.png'

export default class Header extends React.PureComponent {
  render() {
    return (
      <footer className="footer mt-auto py-3">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-8">
              <ul className="url-footer">
                <li>
                  <a href="">Términos y Condiciones</a>
                </li>
                <li>
                  <a href="">Políticas de Privacidad</a>
                </li>
                <li>
                  <a href="">Condiciones de contratación</a>
                </li>
                <li>
                  <a href="">Protección de Datos Personales</a>
                </li>
                <li>
                  <a href="">Bumeran publicidad</a>
                </li>
                <li>
                  <a href="">Noticias</a>
                </li>
                <li>
                  <a href="">Ofertas de Empleo</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-12 col-md-4">
              <div className="copyright-footer">
                <div className="img-container">
                  <img src={naventImg} alt="" />
                </div>
                Copyright &reg; 1999 - 2017 Navent Corp.
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
