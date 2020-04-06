import React, { useState } from 'react'
import { Row, Link } from '@navent-jobs/ui-kit'
import styled from 'styled-components'
import { SearchStack } from './search-stack'

import { makeChip } from './mixins'

export const Chip = styled.a`
  ${props => makeChip(props)}
`

export const UltimasBusquedas = () => {
  const [stack] = useState(SearchStack.getInstance())
  const queue = stack.getHistory()
  return (
    <>
      <Row>
        Ultimas Busquedas:
        {queue.map(e => {
          return (
            <>
              <Link href={`/empleos-busqueda-${e.query}.html`}>
                <Chip>
                  <div key={JSON.stringify(e)}>{e.query}</div>
                </Chip>
              </Link>
            </>
          )
        })}
      </Row>
    </>
  )
}
