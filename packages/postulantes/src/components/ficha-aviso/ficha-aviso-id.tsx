import React, { useState, useEffect } from 'react'
import { FichaAviso } from '../ficha-aviso'
import { get } from '@navent-jobs/utils'

const getFichaAviso = idAviso => get(`api/candidates/fichaAviso/${idAviso}`, { sendCookies: true })

const crearFichaAvisoComponent = fichaData => {
  return (
    <FichaAviso {...fichaData.aviso} onPostularClick={null} postulacion={fichaData.postulacion} id={fichaData.id} />
  )
}

export interface FichaAvisoProps {
  id: string
  afterLoadingFicha?: (args: any) => void
}

export const FichaAvisoWithId = ({ id, afterLoadingFicha }: FichaAvisoProps) => {
  const loadingComponent = (
    <img
      alt="loading"
      src="https://3.bp.blogspot.com/-T_2Mk0VWsPs/WKh_DNP_02I/AAAAAAAABF4/oBTlwNI52u8mdo9Y5deIxBzg7Em4n2pvQCLcB/s400/loading%2Bgif%2B1.gif"
    />
  )
  const [ficha, setFicha] = useState(<></>)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useFetchFichaAvisoData = useEffect(() => {
    if (!id) return
    setFicha(loadingComponent)
    getFichaAviso(id)
      .then(fichaData => {
        const fichaComponent = crearFichaAvisoComponent({ ...fichaData, id })
        setFicha(fichaComponent)
        if (afterLoadingFicha) afterLoadingFicha({ ...fichaData, id })
      })
      .catch(() => setFicha(<>404 COMPONENTE CUANDO NO SE ENCONTRO LA FICHA</>))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // render
  if (!id) return null
  return ficha
}
