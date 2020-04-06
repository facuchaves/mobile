/* eslint-disable no-console */
/* eslint-disable func-names */
import Config from 'react-native-config'

const apiGoogleMaps = {}

apiGoogleMaps.searchGoogleMaps = async (pais, provincia, localidad, direccion) => {
  let results = []
  let location = direccion ? `${direccion}+${localidad}+${provincia}+${pais}` : `${localidad}+${provincia}+${pais}`
  location = location.replace(/\s/g, '+')

  // separo calle y numero por si no tiene resultados desde maps
  const regex = /(\d+)/g
  const numeroDomicilio = direccion.match(regex) ? direccion.match(regex).toString() : null
  const domicilio = direccion ? direccion.substring(0, direccion.lastIndexOf(numeroDomicilio)).trim() : null

  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${Config.GOOGLE_MAPS_API_KEY}&address=${location}`)
    .then(response => {
      return response.json()
    })
    .then(response => {
      const geoResponse = response.results
      const geolocalizacion = {
        route: geoResponse[0].address_components[1].long_name || domicilio,
        neighborhood: '',
        premise: '',
        northEast: '',
        locality: localidad, // geoResponse[0].address_components[3].long_name || // no se usa por que retorna comuna
        latitude: geoResponse[0].geometry.location.lat || null,
        longitude: geoResponse[0].geometry.location.lng || null,
        pointInterest: '',
        postalCode: '',
        southWest: '',
        streetNumber: geoResponse[0].address_components[0].long_name || numeroDomicilio,
        streetAddress: geoResponse[0].address_components[1].long_name || domicilio,
        subLocality: '',
        subPremise: '',
        level1: geoResponse[0].address_components[4] ? geoResponse[0].address_components[4].long_name : provincia,
        level2: localidad,
        level3: '',
        locationType: 'street_address',
        type: 'street_address',
        country: geoResponse[0].address_components[5] ? geoResponse[0].address_components[5].long_name : pais,
      }

      results = geolocalizacion
    })
  return results
}

export default apiGoogleMaps
