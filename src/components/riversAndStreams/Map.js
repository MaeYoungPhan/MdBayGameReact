import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from "leaflet";
import { getRiverStream } from "../../managers/RiversStreamsManager"
import "./riversAndStreams.css"
import riverMarker from "./images/river-icon.png"
import riverShadow from "./images/river-shadow.png"
// import greenCat from "./images/greenCat.png"
// import catShadow from "./images/catShadow.png"


export const Map = (props) => {

    const [rivers, setRivers] = useState([])


    const getAllWater = () => {
        getRiverStream().then(data => setRivers(data))
    }

    useEffect(() => {
        getAllWater()
    }, [])
  
var riverIcon = L.icon({
    iconUrl: riverMarker,
    shadowUrl: riverShadow,

    iconSize:     [20, 20], // size of the icon
    shadowSize:   [22, 22], // size of the shadow
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    shadowAnchor: [11, 11],  // the same for the shadow
    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
});

// var colonyIcon = L.icon({
//     iconUrl: greenCat,
//     shadowUrl: catShadow,

//   iconSize:     [20, 20], // size of the icon
//   shadowSize:   [22, 22], // size of the shadow
//   iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
//   shadowAnchor: [11, 11],  // the same for the shadow
//   popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
// });

return (
    <>
   <MapContainer center={[38.488526, -75.812783]} zoom={12} scrollWheelZoom={false}>
   <TileLayer
     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />
   {rivers.map(
    (river) => {
   return <Marker key= {river.id} position={[river.latitude, river.longitude]} icon={riverIcon}>
     <Popup>
     <Link className="riverLink" to={`/river/${river.id}`}>{river.name}</Link>
     {/* <div><img className="riverImg" src={river.image} /></div> */}
     </Popup>
   </Marker>})}
   {/* {filteredColonies.map(
    (colony) => {
   return <Marker key= {colony.id} position={[colony.lat, colony.long]} icon={colonyIcon}>
     <Popup>
     <Link className="colonyLink" to={`/colony/${colony.id}`}>{colony.nickname}</Link>
     <div><img className="colonyImg" src={colony.image} /></div>
     </Popup>
   </Marker>})} */}
 </MapContainer></>)
}