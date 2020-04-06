// eslint-disable-next-line no-unused-vars<
import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'
// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { Button } from '../../components'
import { MakeSearchbar, MakeForm, MakeInput } from './mixins'

const SearchbarComponent = styled.div`
  ${props => MakeSearchbar(props)}
`

const Form = styled.form`
  ${props => MakeForm(props)}
`

const Input = styled.input`
  ${props => MakeInput(props)}
`

const ButtonSearch = styled(Button)`
  background: rgba(0, 0, 24, 0.04);
  color: #000df1;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-left: 0;
  border-radius: 50%;
`
const customStyles = {
  indicatorSeparator: () => ({}),

  container: () => ({
    lineHeight: '32px',
    flexBasis: '208px',
    padding: '0 12px',
    borderRight: '1px solid rgba(0, 0, 24, 0.08)',
    position: 'relative',
  }),

  menu: provided => ({
    ...provided,
    width: '185px',
    maxHeight: '268px',
    background: '#f5f5f6',
    borderRadius: '8px',
    textAlign: 'left',
    padding: '0px 8px',
    margin: '-5px -20px -5px -5px',
    zIndex: '998',
    overflow: 'hidden',
    top: '50px',
    left: '25px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),

  option: provided => ({
    ...provided,
    background: 'transparent',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '36px',
    transition: 'background .3s ease-in-out',
    padding: '0px 15px',
    margin: '0px',
    borderRadius: '8px',
    zIndex: '997',
    '&:hover': {
      background: 'white',
    },
  }),

  control: provided => ({
    ...provided,
    verticalAlign: 'top',
    overflow: 'hidden',
    background: 'transparent',
    minHeight: '0px',
    border: '0px',
    borderRadius: '0px',
    '&:focus, &:active, &:focus-within': {
      border: 0,
      boxShadow: 'none',
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
    fontSize: '13px',
    marginLeft: '0',
    marginRight: '0',
  }),

  input: provided => ({
    ...provided,
    margin: '0px',
  }),
}

// eslint-disable-next-line no-unused-vars
export const Searchbar = props => {
  // eslint-disable-next-line no-unused-vars
  const [lugar, setLugar] = useState('')

  // eslint-disable-next-line no-unused-vars
  const [puesto, setPuesto] = useState('')

  // eslint-disable-next-line no-unused-vars
  const [focus, setFocus] = useState('')

  const handleChange = (e, seter) => seter(e.target.value)

  const history = useHistory()

  const options = [
    { value: 'Buenos Aires', label: 'Buenos Aires' },
    { value: 'Capital Federal', label: 'Capital Federal' },
    { value: 'Catamarca', label: 'Catamarca' },
    { value: 'Chaco', label: 'Chaco' },
    { value: 'Chubut', label: 'Chubut' },
    { value: 'Corrientes', label: 'Corrientes' },
    { value: 'Buenos Aires', label: 'Buenos Aires' },
    { value: 'Capital Federal', label: 'Capital Federal' },
    { value: 'Catamarca', label: 'Catamarca' },
    { value: 'Chaco', label: 'Chaco' },
    { value: 'Chubut', label: 'Chubut' },
    { value: 'Corrientes', label: 'Corrientes' },
  ]

  return (
    <SearchbarComponent>
      <Form className={focus}>
        <Input
          type="text"
          placeholder="Puesto, empresa o palabra clave"
          onFocus={() => setFocus('focusin')}
          onBlur={() => setFocus('')}
          onChange={e => handleChange(e, setPuesto)}
        />
        <Select
          placeholder="Lugar de trabajo"
          styles={customStyles}
          options={options}
          onFocus={() => setFocus('focusin')}
          onBlur={() => setFocus('')}
          onChange={e => handleChange(e, setLugar)}
        />
        <ButtonSearch
          variant="secondary"
          size="small"
          type="submit"
          onClick={() => history.push(`/empleos-busqueda-${puesto}.html`)}
        >
          B
        </ButtonSearch>
      </Form>
    </SearchbarComponent>
  )
}

Searchbar.propTypes = {}
Searchbar.defaultProps = {}
