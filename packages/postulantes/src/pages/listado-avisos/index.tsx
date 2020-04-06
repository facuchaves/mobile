import React, { useEffect, useState } from 'react'
import { Col, Row } from '@navent-jobs/ui-kit'
import { Route, Switch, useHistory } from 'react-router-dom'
import { ListaAvisosUI } from '../../components/listado-avisos'
import { createFetchAvisos } from './services'
import { FichaAvisoWithId } from '../../components/ficha-aviso'
import { HorizontalSelectBar } from '../../components/listado-avisos/horizontal-select-bar'
import { UltimasBusquedas } from '../../components/listado-avisos/ultimas-busquedas'

export interface ListaAvisosPageProps {
  location: { state: { puesto: string; lugar: string } }
  match: { patch: string; params: { idAviso: string }; url: string }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ListaAvisosPage = ({ location, match }: ListaAvisosPageProps) => {
  const [loading, setLoading] = useState(true)
  const [listado, setListado] = useState()
  const [loadingMore, setLoadingMore] = useState(false)
  const [nextPage, setNextPage] = useState(0)

  const [filtrosAplicables, setFiltrosAplicables] = useState({
    provinciasId: undefined, // string[] // [29]
    areasId: undefined, // string[]
    tipoTrabajoId: undefined, // number
    diasFechaPublicacion: undefined, // number
    salarioMaximo: undefined, // number
    salarioMinimo: undefined, // number
  })

  const history = useHistory()
  const onClickAviso = idAviso => history.push(`${match.url}/${idAviso}`)

  const initialFetch = createFetchAvisos({
    listado: null,
    setLoading,
    setListado,
    filtrosAplicables,
    page: 0,
    setPage: setNextPage,
  })
  const fetchMorePages = createFetchAvisos({
    listado,
    setLoading,
    setListado,
    filtrosAplicables,
    page: nextPage,
    setPage: setNextPage,
    setLoadingMore,
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useApiFirstRequest = useEffect(initialFetch, [match.params[0], filtrosAplicables])

  const RouteFicha = (
    <Switch>
      <Route path={`${match.url}`} exact render={() => <>COMPONENTE CUANDO NO SE TIENE FICHA SELECCIONADA</>} />
      <Route
        path={`${match.url}/:idAviso`}
        // eslint-disable-next-line no-shadow
        render={({ match }) => <FichaAvisoWithId id={match.params.idAviso} />}
      />
      <Route render={() => <>fail to route</>} />
    </Switch>
  )

  const haveMorePages = listado && (listado.number + 1) * listado.size < listado.total
  const loadMoreButton = !loadingMore && haveMorePages && (
    <button type="button" onClick={fetchMorePages}>
      Load More
    </button>
  )

  return (
    <>
      <UltimasBusquedas />
      <Row>
        <HorizontalSelectBar filters={listado && listado.filters}></HorizontalSelectBar>
      </Row>
      <Row>
        <Col xs={4}>
          <Route path="/">
            <ListaAvisosUI listado={listado} loading={loading} onClick={onClickAviso} />
          </Route>
        </Col>
        <Col>{RouteFicha}</Col>
      </Row>
      {loadMoreButton}
      {loadingMore && 'Loanding More...'}
    </>
  )
}
