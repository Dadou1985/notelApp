import React, { useEffect, useState, useContext } from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
import { FirebaseContext } from '../../Firebase'
import { Form, Button, FormRow } from 'react-bootstrap'



function Map() {

    const { user, firebase } = useContext(FirebaseContext)

    const [info, setInfo] = useState([])
    const [selectedHotel, setselectedHotel] = useState(null)
    const [formValue, setformValue] = useState({hotelName: "", client: "", pax: "", totalNight: "", totalRoom: "", pec: ""})

    const handleChange = (event) =>{
        event.persist()
        setformValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

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
            
                    <Marker 
                    key={phone.id}
                    position={{ lat: phone.lat, lng: phone.lng }}
                    onClick={() => {
                        setselectedHotel(phone)
                    }} />            
                
                {selectedHotel && (
                    <>
                    <InfoWindow
                    position={{ lat: selectedHotel.lat, lng: selectedHotel.lng }}
                    onCloseClick={() => {
                        setselectedHotel(null)
                    }}>
                        <div style={{
                            display: "flex",
                            flexFlow: "column",
                            justifyContent: "center",
                            textAlign: "center"
                        }}>
                            <h5>{selectedHotel.hotelName}</h5>
                            <small>{selectedHotel.address}, {selectedHotel.city}</small>
                            <h6 className="text-success">{selectedHotel.roomAvailable} chambre(s) restante(s)</h6>
                            <a href="#" onClick={() => {
                                document.getElementById("overbookingForm").style.display = "flex"
                            }}>Remplir un formulare de délogement</a>
                            <div id="overbookingForm" style={{
                                display: "none",
                                flexFlow: "row wrap",
                                justifyContent: "space-around",
                                padding: "5%", 
                                textAlign: "center"
                                }}>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Nom de votre établissement</Form.Label>
                                        <Form.Control type="text" placeholder="ex: Hôtel des 4 moulins" size="sm" style={{width: "17vw"}} value={formValue.hotelName} name="hotelName" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                        <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Nom du client</Form.Label>
                                        <Form.Control type="text" placeholder="ex: Jane Doe" size="sm" style={{width: "17vw"}} value={formValue.client} name="client" onChange={handleChange} />
                                    </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Nombre de nuits</Form.Label>
                                        <Form.Control type="number" style={{width: "12vw"}}  size="sm" value={formValue.totalNight} name="totalNight" onChange={handleChange} />
                                        </Form.Group>
                                        </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Nombre de chambres</Form.Label>
                                        <Form.Control type="number" style={{width: "12vw"}} size="sm" value={formValue.totalRoom} name="totalRoom" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Nombre de personnes</Form.Label>
                                        <Form.Control type="number" style={{width: "12vw"}} size="sm" value={formValue.pax} name="pax" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>P.E.C</Form.Label>
                                        <Form.Control as="select" custom style={{width: "10vw"}} size="sm" defaultValue="Non" value={formValue.pec} name="pec" onChange={handleChange}>
                                            <option value="non" selected>Non</option>
                                            <option value="oui">Oui</option>
                                        </Form.Control>
                                    </Form.Group>
                                    </Form.Row>
                                    <Button variant="success" style={{width: "100%"}} size="sm" onClick={(event) => {
                                        event.preventDefault()
                                        setformValue("")
                                        let marker = Date.now()
                                        firebase.addRedPhone({hotelName: formValue.hotelName, totalRoom: formValue.totalRoom, totalNight: formValue.totalNight, client: formValue.client, markup: marker, pec: formValue.pec, pax: formValue.pax, doc: selectedHotel.id})
                                        setselectedHotel(null)
                                    }}>Déloger</Button>
                                </div>
                        </div>
                    </InfoWindow>                   
                    </>
                )}
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