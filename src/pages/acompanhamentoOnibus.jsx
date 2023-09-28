import {
  DirectionsRenderer,
  GoogleMap,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import myBusIcon from "../assets/64284.png";
import myBusStop from "../assets/64286.png";
import { Directions } from "@mui/icons-material";

function AcompanhamentoOnibus() {
  const { codItinerario } = useParams();
  const [coordenadasOnibus, setCoordenadasOnibus] = useState([]);
  const [coordenadasParadas, setCoordenadasParadas] = useState([]);
  const [myLocation, setMyLocation] = useState({
    lat: -29.92399,
    lng: -51.170316,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  const buscaCoordenadasParadas = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BUS_API
        }/coordenadas-intinerario?codItinerario=${codItinerario}`
      );

      setCoordenadasParadas(
        data.map((c) => ({ lat: c.coordY, lng: c.coordX }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const buscaCoordenadasOnibus = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BUS_API
        }/coordenadas-onibus?codItinerario=${codItinerario}`
      );

      setCoordenadasOnibus(data.map((c) => ({ lat: c.lat, lng: c.long })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const coordsByLS = JSON.parse(localStorage.getItem("coords"));
    setMyLocation({
      lat: parseFloat(coordsByLS.latitude),
      lng: parseFloat(coordsByLS.longitude),
    });
    buscaCoordenadasParadas();
    buscaCoordenadasOnibus();
  }, []);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          center={coordenadasOnibus[0]}
          zoom={15}
          options={{
            streetViewControl: false,
            controlSize: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
        >
          <Marker position={myLocation} />

          {coordenadasOnibus.map((coords, i) => (
              <Marker
                position={coords}
                key={i}
                icon={{
                  url: myBusIcon,
                  scaledSize: new google.maps.Size(25, 25), // scaled size
                  origin: new google.maps.Point(0, 0), // origin
                  anchor: new google.maps.Point(0, 0), // anchor
                }}
              />
          ))}

          {/* {coordenadasParadas.map(coords => (
          <Marker position={coords} icon={{
            url: myBusStop,
            scaledSize: new google.maps.Size(40, 20), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 10) // anchor
          }} />
        ))} */}

          <Polyline
            options={{
              path: coordenadasParadas,
            }}
          />
          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AcompanhamentoOnibus;
