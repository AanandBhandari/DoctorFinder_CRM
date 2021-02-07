import React, { useState , useRef} from 'react'
import Layout from '../layout/Layout'
import { Map, TileLayer, Marker, Popup} from "react-leaflet";
import Routing from './Routing'
// import ReactMapGL, { GeolocateControl, NavigationControl, Marker, Popup,} from 'react-map-gl';
// const geolocateStyle = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     margin: 10
// };
const GeoMap = props => {
    // const [viewPort, setViewPort] = useState({
    //     width: 1000,
    //     height: 600,
    //     latitude: 28.683359,
    //     longitude: 80.608063,
    //     zoom: 12
    // })
    // const [selectedPoint , setSelectedPoint] =useState(false)
    const [view, setView] = useState({
        lat: 28.701542,
        lng: 80.569047,
        zoom: 13,
    })
    const position = [view.lat, view.lng];
    const [mapInit,setMapInit] = useState(false)
    const [map,setMap] = useState(null)
    const saveMap = m => {
        setMapInit(true);
        setMap(m)
    };

    return (
        <Layout>
            <Map style={{height:"80vh"}} center={position} zoom={13} ref={saveMap}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/* <Marker position={position}>
                    <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                </Marker> */}
                {mapInit && <Routing map={map}/>}
            </Map>
            {/* <ReactMapGL
            {...viewPort}
                mapboxApiAccessToken="pk.eyJ1IjoiYWFuYW5kYmhhbmRhcmkiLCJhIjoiY2s5OWh2dGVkMDQ0dDNlbnI1OGF2YXdnOSJ9.bYh6c9w2KoOu5WY-urL08A"
                mapStyle="mapbox://styles/aanandbhandari/ck99m08yy0gcf1imgnpij9zya"
                onViewportChange={viewPort=>setViewPort(viewPort)}
            >
                <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={{ enableHighAccuracy: false }}
                    trackUserLocation={true}
                />
                <div style={{ position: 'absolute', right: 0 , top :0}}>
                    <NavigationControl />
                </div>
                <Marker
                    key={1}
                    latitude={28.683359}
                    longitude={80.608063}
                >
                    <button style={{background:'none',boder:'line',cursor:'pointer'}} onClick={e=>{e.preventDefault()
                    setSelectedPoint(true)}}>
                        <img style={{height:'20px',width:'20px'}} src='./logo192.png' alt='react logo'/>
                    </button>
                </Marker>
                {selectedPoint && (
                    <Popup latitude={28.683359} longitude={80.608063} onClose={e=>setSelectedPoint(false)}>
                        <div>clicked!</div>
                    </Popup>
                )}
            </ReactMapGL> */}
        </Layout>
    )
}

// GeoMap.propTypes = {

// }

export default GeoMap
