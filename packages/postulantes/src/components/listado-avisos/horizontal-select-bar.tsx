// import styled from 'styled-components'
import React from 'react'
import { Col, Select } from '@navent-jobs/ui-kit'

interface HorizontalSelectBarProps {
  filters?: [{ type: string; facets: [{ id: string; name: string; quantity: number }] }]
}
export const HorizontalSelectBar = ({ filters }: HorizontalSelectBarProps) => {
  // console.log({ filters })
  if (!filters) return null
  return (
    <>
      {filters.map(filtro => {
        // eslint-disable-next-line
        return (
          // eslint-disable-next-line react/jsx-key
          <Col>
            <Select
              type="text"
              name={filtro.type}
              placeholder={filtro.type}
              options={filtro.facets.map(facet => {
                return { value: facet.id, label: `${facet.name} (${facet.quantity})` }
              })}
              // hook form props:
              // validation={register({
              //   required: 'Debe seleccionar un motivo',
              // })}
              // errors={errors}
              setValue={(a, b) => {
                // eslint-disable-next-line no-console
                console.log('setValue', a, b)
              }}
              triggerValidation={() => {}}
            />
          </Col>
        )
      })}
    </>
  )
}
