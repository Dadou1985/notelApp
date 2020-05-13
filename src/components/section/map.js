import React from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps'
import * as hotelData from '../../../hotel_idf.json'

function Map() {
    return (
        <GoogleMap defaultZoom={12} defaultCenter={{ lat: 48.866667, lng: 2.333333 }}>
            
        </GoogleMap>
    )
}
console.log(hotelData[0].fields)
const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function HotelMap() {
    return(
        <div style={{ width: "65vw", height: "86vh" }} >
            <WrappedMap googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyColunikAOTOsRjP5MkgiB5wAljoXeBRIU&v=3.exp&libraries=geometry,drawing,places"} 
            loadingElement={<div style={{ height: "100%"}} />}
            containerElement={<div style={{ height: "100%", width: "65vw"}} />}
            mapElement={<div style={{ height: "100%", width: "65vw"}} />}
            />
            
        </div>
    )
}