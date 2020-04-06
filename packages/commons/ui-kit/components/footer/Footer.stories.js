import React from 'react'

import { storiesOf } from '@storybook/react'
import { Footer } from './Footer'

const context = {
  configuracion_pais: {
    analytics_tracking_id: 'UA-167099-2',
    baseurl: 'http://www.bumeran.com.ar',
    email: 'Bumeran <no_reply@bumeran.com>',
    email_ventas: 'ventas-ar@bumeran.com',
    emailatc: 'atc-ar@bumeran.com',
    facebookurl: 'http://www.facebook.com/bumerancom',
    google_maps_api_key: null,
    gtmcontainer_id: 'GTM-NQWSPT',
    id: 1,
    idPais: 1,
    id_pais: 1,
    iva: 0.21,
    legales: 'sdfadfdf',
    nombre_pais: 'Argentina',
    remitente: 'Bumeran.com',
    site: 'bumeran',
    sufijo: '.com',
    telefono: '(+54 11) 5030-1000 ',
    time_zone: 'GMT-3',
    time_zone_string: 'America/Buenos_Aires',
    twitterurl: 'http://twitter.com/bumeran',
  },
}
storiesOf('Footer', module).add('Footer', () => <Footer dominio={context} />)
