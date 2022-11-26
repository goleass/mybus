import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import axios from "axios"

import myBusIcon from '../assets/64284.png'

function AcompanhamentoOnibus() {

  const { codItinerario } = useParams()
  const [coordenadasOnibus, setCoordenadasOnibus] = useState([])
  const [myLocation, setMyLocation] = useState({
    lat: -29.923990, lng: -51.170316
  })

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_API_KEY
  })

  const buscaCoordenadasOnibus = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BUS_API}/coordenadas-onibus?codItinerario=${codItinerario}`)

      setCoordenadasOnibus(data.map(c => ({lat: c.lat, lng: c.long})))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const coordsByLS = JSON.parse(localStorage.getItem('coords'))
    setMyLocation({lat: parseFloat(coordsByLS.latitude), lng: parseFloat(coordsByLS.longitude)})
    buscaCoordenadasOnibus()
  }, [])

  return <div style={{ height: '100vh' }}>
    {isLoaded ? (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={myLocation}
        zoom={15}
        streetView={false}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <Marker position={myLocation}/>
        {console.log(myLocation)}

        {coordenadasOnibus.map(coords => (
          <Marker position={coords} icon={{
            url: myBusIcon,
            scaledSize: new google.maps.Size(25, 25), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          }}/>
        ))}
        <></>
      </GoogleMap>
    ) : <></>}
  </div>
}

export default AcompanhamentoOnibus