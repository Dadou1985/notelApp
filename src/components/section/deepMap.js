import React, {useState, useEffect} from 'react'
import Map, {Marker, Popup} from 'react-map-gl'
import OverbookingBox from './overbookingBox'
import RedBar from './redBar'
import {Form, Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import * as Departement from '../../../zoneFrance/json/departments.json'
import * as Places from '../../../listHotel.json'


export default function DeepMap({user, firebase}) {

    const [info, setInfo] = useState([])
    const [selectedHotel, setselectedHotel] = useState(null)
    const [list, setList] = useState(false)
    const [place, setPlace] = useState([])


    const [formValue, setformValue] = useState({hotelName: "", client: "", pax: "", totalNight: "", totalRoom: "", pec: "", refHotel: ""})

    const handleChange = (event) =>{
        event.persist()
        setformValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)


    const [viewPort, setviewPort] = useState({
        latitude: 48.866667,
        longitude: 2.333333,
        width: "65%",
        height: "100%",
        zoom: 10
    })

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        firebase.phoneOnAir({signal : signal}).onSnapshot(function(snapshot) {
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

     const handleZone = () => {
         let dept = document.getElementById("zone").value
         setInfo(firebase.firestore().collection("hotels").where("departement", "==", dept))
     }

     
    return (
        <div
        style={{
        display: "flex",
        height: "85vh",
        width: "100vw",
        flexFlow: "row"}}>
            <Map 
            {...viewPort}
            mapboxApiAccessToken={"pk.eyJ1IjoiZGFkZG91MTk4NSIsImEiOiJja2FlODhicGExM250MnpvOGNiOTBhZzJjIn0.PPURM4ErbjbwMNRSqoLzVQ"}
            mapStyle="mapbox://styles/daddou1985/ckae8nbfw0zyu1ir3rs76zzjv"
            onViewportChange={viewPort => {
                setviewPort(viewPort)
            }}
            >
                {Places.map(hotel =>(
                    <Marker 
                    key={hotel.courriel}
                    latitude={hotel.lat} 
                    longitude={hotel.lng}
                     > 
                     <OverlayTrigger
                        placement="top"
                        overlay={
                        <Tooltip id="title">
                            <h5>{hotel.nom_commercial}</h5>
                            <b>Rack : {info.rac}€</b>
                            <h6 className="text-success">{info.roomAvailable} chambre(s) restante(s)</h6>
                        </Tooltip>
                        }>
                            <button onClick={(event) => {
                                event.preventDefault()
                                setselectedHotel(hotel)
                                handleShow()
                            }}>
                                <img src="/hostel.png" alt="hotel" />
                            </button>
                     </OverlayTrigger>

                     </Marker>
                ))}
                
                {selectedHotel ? (
                    
                            <Modal show={list}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                onHide={handleClose}
                                >
                                <Modal.Header closeButton className="bg-light">
                                    <Modal.Title id="contained-modal-title-vcenter">
                                    Délogement vers {selectedHotel.nom_commercial}
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                
                                <div id="overbookingForm" style={{
                                    display: "flex",
                                    flexFlow: "row wrap",
                                    width: "100%",
                                    justifyContent: "space-around",
                                    padding: "5%", 
                                    textAlign: "center"
                                    }}>
                                        <Form.Row>
                                            <Form.Group controlId="description">
                                            <Form.Label>Nom de votre établissement</Form.Label>
                                            <Form.Control type="text" placeholder="ex: Hôtel des 4 moulins" size="sm" style={{width: "22vw"}} value={formValue.hotelName} name="hotelName" onChange={handleChange} />
                                            </Form.Group>
                                        </Form.Row>
                                            <Form.Row>
                                            <Form.Group controlId="description">
                                            <Form.Label>Nom du client</Form.Label>
                                            <Form.Control type="text" placeholder="ex: Jane Doe" size="sm" style={{width: "22vw"}} value={formValue.client} name="client" onChange={handleChange} />
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
                                            <Form.Control type="number" style={{width: "12vw", marginRight: "5vw", marginLeft: "5vw"}} size="sm" value={formValue.totalRoom} name="totalRoom" onChange={handleChange} />
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
                                        <Form.Row>
                                            <Form.Group controlId="description">
                                            <Form.Label>Référence de l'Hotel</Form.Label>
                                            <Form.Control type="text" style={{width: "12vw"}} size="sm" value={formValue.refHotel} name="refHotel" onChange={handleChange} />
                                            </Form.Group>
                                        </Form.Row>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="success" 
                                style={{width: "20%"}} 
                                onClick={(event) => {
                                    event.preventDefault()
                                    setformValue("")
                                    let marker = Date.now()
                                    firebase.addRedPhone({hotelName: formValue.hotelName, totalRoom: formValue.totalRoom, totalNight: formValue.totalNight, client: formValue.client, markup: marker, pec: formValue.pec, pax: formValue.pax, refHotel: formValue.refHotel, doc: selectedHotel.id})
                                    setselectedHotel(null)
                                }}>Déloger</Button>
                                </Modal.Footer>
                            </Modal>                    
                ) : null}
            </Map>
            <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    width: "35%",
                    padding: "1%",
                    marginTop: "2%",
                    marginBottom: "2%"
                  }}>
                <h5 className="text-center" style={{marginBottom: "5%"}}><b>Red Phone</b> - <small>Dashboard</small></h5>
                <h6 className="text-center"><b>Filtrer les recherches d'hôtels par :</b></h6>
                <div style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "space-around"}}>
                <Form.Row>
                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label className="text-center" style={{width: "12vw"}}>Département</Form.Label>
                <Form.Control as="select" custom style={{width: "12vw", filter: "drop-shadow(2px 2px 5px black)"}} defaultValue="Paris">
                {Departement.map(zone => (
                    <option 
                    key={zone.id} 
                    id="zone"
                    onClick={handleZone}>
                        {zone.name}
                    </option>
                ))}
                </Form.Control>
                </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label className="text-center" style={{width: "12vw"}}>Etoiles</Form.Label>
                    <Form.Control as="select" custom style={{width: "12vw", filter: "drop-shadow(2px 2px 5px black)"}}>
                        <option>Toutes étoiles</option>
                        <option>1 étoile</option>
                        <option>2 étoiles</option>
                        <option>3 étoiles</option>
                        <option>4 étoiles</option>
                        <option>5 étoiles</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                </div>
                <OverbookingBox />
                <RedBar />
            </div>
            
        </div>
    )
}
