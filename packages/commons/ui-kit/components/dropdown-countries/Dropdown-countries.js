import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select'
import { find } from 'lodash'

import { ItemCountry, PlaceholderFlag, PlaceholderCountry } from './mixins'
import flagAR from './images/flagAR.svg'
import flagCL from './images/flagCL.svg'
import flagEC from './images/flagEC.svg'
import flagMX from './images/flagMX.svg'
import flagPA from './images/flagPA.svg'
import flagPE from './images/flagPE.svg'
import flagVE from './images/flagVE.svg'

const customStyles = {
  indicatorSeparator: () => ({}),

  container: () => ({
    marginTop: '27px',
    display: 'inline-block',
  }),

  menu: provided => ({
    ...provided,
    width: '110px',
    borderRadius: '0px',
    textAlign: 'left',
    padding: '0',
    margin: '0 0 -17px',
  }),

  option: provided => ({
    ...provided,
    background: 'white',
    transition: 'background .3s ease-in-out',
    '&:hover': {
      background: '#f5f5f5',
    },
  }),

  control: provided => ({
    ...provided,
    width: '400%',
    maxWidth: '120px',
    minHeight: '0px',
    lineHeight: '16px',
    borderRadius: '0px',
    padding: '4px 8px 5px 8px',
    float: 'left',
    '&:focus, &:active, &:focus-within': {
      border: 0,
      boxShadow: 0,
    },
    '& > div': {
      padding: '0 !important',
    },
  }),

  singleValue: provided => ({
    ...provided,
    margin: '0',
  }),

  dropdownIndicator: provided => ({
    ...provided,
    padding: '0',
    '& > svg': {
      height: '14px',
      marginBottom: '-1.5px',
      cursor: 'pointer',
    },
  }),

  placeholder: provided => ({
    ...provided,
    fontSize: '10px',
    marginLeft: '0',
    marginRight: '0',
  }),
}

const countries = [
  {
    id: 1,
    siteUrl: 'http://www.bumeran.com.ar',
    name: 'Argentina',
    flagImage: flagAR,
  },
  {
    id: 1007,
    siteUrl: 'http://www.laborum.cl',
    name: 'Chile',
    flagImage: flagCL,
  },
  {
    id: 9,
    siteUrl: 'http://www.multitrabajos.com',
    name: 'Ecuador',
    flagImage: flagEC,
  },
  {
    id: 18,
    siteUrl: 'http://www.bumeran.com.mx',
    name: 'México',
    flagImage: flagMX,
  },
  {
    id: 20,
    siteUrl: 'http://www.konzerta.com',
    name: 'Panamá',
    flagImage: flagPA,
  },
  {
    id: 11,
    siteUrl: 'http://www.bumeran.com.pe',
    name: 'Perú',
    flagImage: flagPE,
  },
  {
    id: 13,
    siteUrl: 'http://www.bumeran.com.ve',
    name: 'Venezuela',
    flagImage: flagVE,
  },
]

class DropdownCountries extends React.Component {
  render() {
    const { idPais } = this.props

    const paisSeleccionado = find(countries, { id: idPais }) || {}

    /* Las props contienen el id y el nombre del país en el que se encuentra el usuario, así el default del dropdown es el lugar en el que se encuentra. Las options son las otras opciones de paises del dropdown. */
    return (
      <Select
        isSearchable={false}
        menuPlacement="top"
        styles={customStyles}
        options={countries.map(country => {
          return {
            id: country.id,
            label: (
              <ItemCountry href={country.siteUrl}>
                <PlaceholderFlag src={country.flagImage} alt={country.name} />
                <PlaceholderCountry>{country.name}</PlaceholderCountry>
              </ItemCountry>
            ),
          }
        })}
        value={{
          id: idPais,
          label: (
            <ItemCountry>
              <PlaceholderFlag src={paisSeleccionado.flagImage} alt={paisSeleccionado.name} />
              <PlaceholderCountry>{paisSeleccionado.name}</PlaceholderCountry>
            </ItemCountry>
          ),
        }}
      />
    )
  }
}

export default DropdownCountries

DropdownCountries.propTypes = {
  idPais: PropTypes.number.isRequired,
}
