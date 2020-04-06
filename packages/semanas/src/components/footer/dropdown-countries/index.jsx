import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import Select, { components } from 'react-select'
import DominioContext from '../../../context'

/**
 * Assets
 */
import { ItemCountry, PlaceholderFlag, PlaceholderCountry } from './styles'
import flagAR from '../../../assets/images/flagAR.svg'
import flagCL from '../../../assets/images/flagCL.svg'
import flagEC from '../../../assets/images/flagEC.svg'
import flagMX from '../../../assets/images/flagMX.svg'
import flagPA from '../../../assets/images/flagPA.svg'
import flagPE from '../../../assets/images/flagPE.svg'
import flagVE from '../../../assets/images/flagVE.svg'

const customOption = props => {
  const { data } = props
  return data.custom ? (
    <>
      <ItemCountry href="http://www.bumeran.com.ar">
        <img src={flagAR} alt="Argentina" />
        Argentina
      </ItemCountry>
      <ItemCountry href="http://www.laborum.cl">
        <img src={flagCL} alt="Chile" />
        Chile
      </ItemCountry>
      <ItemCountry href="http://www.multitrabajos.com">
        <img src={flagEC} alt="Ecuador" />
        Ecuador
      </ItemCountry>
      <ItemCountry href="http://www.bumeran.com.mx">
        <img src={flagMX} alt="México" />
        México
      </ItemCountry>
      <ItemCountry href="http://www.konzerta.com">
        <img src={flagPA} alt="Panamá" />
        Panamá
      </ItemCountry>
      <ItemCountry href="http://www.bumeran.com.pe">
        <img src={flagPE} alt="Perú" />
        Perú
      </ItemCountry>
      <ItemCountry href="http://www.bumeran.com.ve">
        <img src={flagVE} alt="Venezuela" />
        Venezuela
      </ItemCountry>
    </>
  ) : (
    <components.Option {...props} />
  )
}

const options = [{ custom: true }]

const customStyles = {
  indicatorSeparator: () => ({}),

  menu: provided => ({
    ...provided,
    width: '146px',
    borderRadius: '0px',
    textAlign: 'left',
  }),

  control: provided => ({
    ...provided,
    width: '100%',
    maxWidth: '146px',
    minHeight: '0px',
    height: '32px',
    marginTop: '20px',
    borderRadius: '0px',
    float: 'left',
  }),

  dropdownIndicator: provided => ({
    ...provided,
    padding: '0 10px 0 0',
  }),

  placeholder: provided => ({
    ...provided,
    fontSize: '11px',
    marginLeft: '0',
    marginRight: '0',
  }),
}

const Placeholder = props => {
  const flags = {
    1: flagAR,
    1007: flagCL,
    9: flagEC,
    18: flagMX,
    20: flagPA,
    11: flagPE,
    13: flagVE,
  }
  return (
    <DominioContext.Consumer>
      {context => (
        <components.Placeholder {...props}>
          <PlaceholderFlag src={flags[context.id_pais]} alt={context.configuracion_pais.nombre_pais} />
          <PlaceholderCountry>{context.configuracion_pais.nombre_pais}</PlaceholderCountry>
        </components.Placeholder>
      )}
    </DominioContext.Consumer>
  )
}

export default () => (
  <Select
    components={{ Option: customOption, Placeholder }}
    options={options}
    menuPlacement="top"
    styles={customStyles}
    isSearchable={false}
  />
)
