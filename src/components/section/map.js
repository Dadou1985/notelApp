import React, { useEffect, useState, useContext } from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps'
import { FirebaseContext } from '../../Firebase'
import { Form, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'



function Map() {

    const { user, firebase } = useContext(FirebaseContext)


    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.phoneOnAir({collection: "hotels", signal : signal}).onSnapshot(function(snapshot) {
                    const snapInfo = []
                  snapshot.forEach(function(doc) {          
                    snapInfo.push({
                        id: doc.id,
                        ...doc.data()
                      })        
                    });
                    console.log(snapInfo)
                    setInfo(snapInfo)
                });
                return () => {
                    abortController.abort()
                }
     },[])

    return (
        <>

            {info.map(phone => (
                <GoogleMap defaultZoom={12} defaultCenter={{ lat: 48.866667, lng: 2.333333 }}>
                
                <OverlayTrigger
                    placement="top"
                    overlay={
                    <Tooltip id="title">
                       {phone.hotelName} 
                    </Tooltip>
                    }>
                    <Marker 
                    key={phone.id}
                    position={{ lat: phone.lat, lng: phone.lng }} />            
                </OverlayTrigger>

                
            </GoogleMap>
            ))}
        </>
    )
}

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