import { useState, useCallback, useRef } from 'react'
import styled from 'styled-components/macro';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { markerAnimations } from "./consts/commonConsts";
import './App.css'

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 31.0461,
  lng: 34.8516
};
 
// this is how we use envioronment variables
console.log(import.meta.env.VITE_SOME_KEY) // 123

function App() {


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_SOME_KEY
  })

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


  const onLoadT = marker => {
    console.log('marker: ', marker)
  }

  const position = {
    lat: 32.72699722054079,
    lng: 35.05635978143032
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <Marker 
        position={position}
        animation={markerAnimations.bounce}
        label= {{
          text: 'שווארמה טיל',
          color: "white",
          fontSize: "30px",
          fontWeight: "bold",
          background: "tomato"
        }}
        onLoad={onLoadT}
        onClick={() => console.log('עספיא על הגריל')}
      />
      <></>
    </GoogleMap>
) : <></>
}

export default App

const AppCont = styled.div`

`;

const MapCont = styled.div`
  height: 100vh;
  width: 100vw;
`

const Markerlabel = styled.div`
  box-shadow: 2px 3px 5px rgba(0,0,0,0.19);
  font-weight: bold;
  background: white;
  color: tomato;
`;