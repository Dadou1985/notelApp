import React, {useState, useEffect} from 'react'
import Map, {Marker} from 'react-map-gl'
import OverbookingBox from './overbookingBox'
import RedBar from './redBar'
import {Form, Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap'
import MarkerImg from './markerImgAdvisor'
import * as hotelData from '../../../hotel.json'
import Like from '../../svg/stars.svg'
import Team from '../../svg/team.svg'
import Management from '../../svg/management.svg'
import Customer from '../../svg/customer.svg'
import Wage from '../../svg/wage.svg'
import Divider from '@material-ui/core/Divider'
import Arrow from '../../svg/arrowDown.svg'
import ToggleDisplay from 'react-toggle-display'
import Close from '../../svg/close.svg'


export default function DeepMap2({user, firebase}) {

    const [info, setInfo] = useState([])
    const [selectedHotel, setselectedHotel] = useState(null)
    const [list, setList] = useState(false)
    const [field, setField] = useState("Region")
    const [filter, setFilter] = useState("Ile-de-France")
    const [geo, setGeo] = useState({geo: []})
    const [operator, setOperator] = useState("==")
    const [openData, setOpenData] = useState([])
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState(false)
    const [comment, setComment] = useState(false)

    const yes = "oui"
    const no = "non"


    const [formValue, setformValue] = useState({hotelName: "", client: "", pax: "", totalNight: "", totalRoom: "", initialPrice: "", pec: "", refHotel: ""})

    const handleChange = (event) =>{
        event.persist()
        setformValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

      const handleShowDetails = () =>{
          let arrowTop = document.getElementById("arrowTop")
        if(arrowTop.style.transform === "rotate(0turn)"){
            setShow(!show)
            return arrowTop.style.transform = "rotate(0.5turn)"
        }
        if(arrowTop.style.transform === "rotate(0.5turn)"){
            setShow(!show)
            return arrowTop.style.transform = "rotate(0turn)"
        }
        
    }  

    const handleShowComment = () =>{
        let arrowBottom = document.getElementById("arrowBottom")
        if(arrowBottom.style.transform === "rotate(0turn)"){
            setComment(!comment)
            return arrowBottom.style.transform = "rotate(0.5turn)"
        }
        if(arrowBottom.style.transform === "rotate(0.5turn)"){
            setComment(!comment)
            return arrowBottom.style.transform = "rotate(0turn)"
        }
    }  

    const handleShowWindowDetails = () =>{
        setDetails(false)
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

    const handleZone = () => {
        const dept = document.getElementById("zone")
        const deptValue = dept.options[dept.selectedIndex].text
        setField("Departement")
        setOperator("array-contains")
        setFilter(deptValue)
    }

    const handleStars = () => {
        const dept = document.getElementById("stars")
        const deptValue = dept.options[dept.selectedIndex].text
        setField("standing")
        setOperator("array-contains")
        setFilter(deptValue)
    }


    console.log(field)
    console.log(filter)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        firebase.filterOnAir({field: field, operator: operator, filter: filter, signal : signal}).onSnapshot(function(snapshot) {
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
     },[field, filter, operator])

     

     console.log(hotelData)

     
    return (
        <div
        style={{
        display: "flex",
        height: "85vh",
        width: "100vw",
        flexFlow: "row"}}>
            <Map 
            {...viewPort}
            mapboxApiAccessToken={"pk.eyJ1IjoiZGFkZG91MTk4NSIsImEiOiJja2hqbW55NzAxY2hjMnltY3E3NGFvc3VwIn0.2_N4X7hpHuVXErwXFTGBRA"}
            mapStyle="mapbox://styles/daddou1985/ckhjmqdia4iqa19qcjpu4darh"
            onViewportChange={viewPort => {
                setviewPort(viewPort)
            }}
            >
                {hotelData.map((hotel, key) =>(
                    <Marker 
                    key={key}
                    latitude={hotel.geometry.coordinates[1]} 
                    longitude={hotel.geometry.coordinates[0]}
                     > 
                     <OverlayTrigger
                        placement="top"
                        overlay={
                        <Tooltip id="title">
                            <h5 style={{padding: "5%"}}>{hotel.properties.nom_commercial}</h5>
                            <span style={{color: "green"}}>
                               <b>4</b> <img src={Like} alt="like" style={{width: "10%", background: "green", marginLeft: "1px"}} />
                            </span>
                        </Tooltip>
                        }>
                            <button style={{background: "none", border: "none"}}
                            onClick={(event) => {
                                    event.preventDefault()
                                    setselectedHotel(hotel)
                                    setDetails(true)
                                }}>
                                <MarkerImg />
                            </button>
                     </OverlayTrigger>
                    </Marker>
                ))}
                
                {selectedHotel ? (
                    <>
                        <ToggleDisplay show={details}>
                            <div style={{
                                display: "flex",
                                flexFlow: "column",
                                justifyContent: "flex-start",
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                maxHeight: "auto",
                                backgroundColor: "rgb(67, 66, 66)",
                                zIndex: "500",
                                padding: "3%",
                                opacity: "0.9",
                                overflow: "auto"
                            }}
                            defaultChecked={details}>
                                <div style={{
                                    display: "flex",
                                    flexFlow: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "4vh"
                                }}>
                                    <div style={{diplay: "flex", flexFlow: "row"}}>
                                        <h3>{selectedHotel.properties.nom_commercial}</h3>
                                        <span>Etablissement {selectedHotel.properties.classement}</span>
                                        <img src={Arrow} alt="arrow" style={{width: "1vw", cursor: "pointer", filter: "invert(100%)", marginLeft: "1vw", transform: "rotate(0turn)"}} id="arrowTop" onClick={handleShowDetails} />
                                    </div>
                                    <img src={Close}  alt="" style={{width:"2vw", filter: "invert(100%)", cursor: "pointer"}} onClick={handleShowWindowDetails} />
                                </div>
                            <ToggleDisplay show={show}>
                                    <div style={{
                                        display: "flex",
                                        flexFlow: "column", 
                                        width: "90%",
                                        marginBottom: "4vh"
                                    }}
                                    defaultChecked={show}>
                                        <Divider style={{height: "1vh", marginBottom: "4vh"}} />
                                        <span><b style={{color: "gray"}}>Adresse: </b> {selectedHotel.properties.adresse}, {selectedHotel.properties.code_postal} {selectedHotel.properties.commune}</span>
                                        <span><b style={{color: "gray"}}>Nombre de chambres: </b> {selectedHotel.properties.nombre_de_chambres}</span> 
                                        <span><b style={{color: "gray"}}>Type d'établissement: </b>{selectedHotel.properties.typologie_etablissement}</span>
                                        <span><b style={{color: "gray"}}>Téléphone: </b>0{selectedHotel.properties.telephone}</span> 
                                        <span><b style={{color: "gray"}}>Courriel: </b>{selectedHotel.properties.courriel}</span>
                                        <span><b style={{color: "gray"}}>Portail web: </b>{selectedHotel.properties.site_internet}</span>
                                    </div>
                            </ToggleDisplay>
                                <Divider style={{height: "1vh", marginBottom: "4vh"}} />
                                <div style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    alignItems: "center",
                                    marginBottom: "1vh"
                                }}>
                                    <h3>Statistiques de l'établissement</h3>
                                    <div style={{
                                    display: "flex",
                                    flexFlow: "row",
                                    justifyContent: "space-around",
                                    marginTop: "4vh"
                                }}>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column",
                                            alignItems: "center",
                                            width: "25%"
                                        }}>
                                            <h5>Team</h5>
                                            <img src={Team} alt="" style={{width: "30%", borderRadius: "25px", marginBottom: "2vh"}} />
                                            <p style={{color: "green", fontSize: "2em"}}>4.5</p>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column",
                                            alignItems: "center",
                                            width: "25%"
                                        }}>
                                            <h5>Management</h5>
                                            <img src={Management} alt="" style={{width: "30%", borderRadius: "25px", marginBottom: "2vh"}} />
                                            <p style={{color: "green", fontSize: "2em"}}>4.5</p>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column",
                                            alignItems: "center",
                                            width: "25%"
                                        }}>
                                            <h5>Clientèle</h5>
                                            <img src={Customer} alt="" style={{width: "30%", borderRadius: "25px", marginBottom: "2vh"}} />
                                            <p style={{color: "green", fontSize: "2em"}}>4.5</p>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column",
                                            alignItems: "center",
                                            width: "25%"
                                        }}>
                                            <h5>Salaire</h5>
                                            <img src={Wage} alt="" style={{width: "30%", borderRadius: "25px", marginBottom: "2vh"}} />
                                            <p style={{color: "green", fontSize: "2em"}}>4.5</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{display: "flex", flexFlow: "column", justifyContent: "center", marginBottom: "5vh"}}>
                                    <Divider style={{height: "1vh", marginBottom: "5vh"}} />
                                    <div style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center"}}>
                                        <Button size="lg" style={{width: "88%"}} onClick={handleShow}>Ajouter un avis</Button>
                                        <span>
                                           9 avis 
                                            <img src={Arrow} alt="arrow" style={{width: "1vw", cursor: "pointer", filter: "invert(100%)", marginLeft: "1vw", transform: "rotate(0turn)"}} id="arrowBottom" onClick={handleShowComment} />
                                        </span>
                                    </div>
                                </div>
                                <ToggleDisplay show={comment}>
                                    <div style={{
                                            display: "flex",
                                            flexFlow: "column",
                                            padding: "2%", 
                                            backgroundColor: "rgb(33, 35, 39)",
                                            borderRadius: "15px"
                                        }}
                                        defaultChecked={comment}>
                                        <div>
                                            <h4>"I'm in love with this hotel"</h4>
                                            <p>Ancien employé</p>
                                        </div>
                                        <div>
                                            <h6>Le Best Of</h6>
                                            <p>DATAtourisme est un dispositif national de collecte et de diffusion en open data des données touristiques institutionnelles. Porté par l’Etat, il est né d’une coopération inédite avec les réseaux des offices de tourisme, des agences départementales et des comités régionaux du tourisme de l’ensemble du territoire national.</p>
                                        </div>
                                        <div>
                                            <h6>Les BullShift</h6>
                                            <p>DATAtourisme est un dispositif national de collecte et de diffusion en open data des données touristiques institutionnelles. Porté par l’Etat, il est né d’une coopération inédite avec les réseaux des offices de tourisme, des agences départementales et des comités régionaux du tourisme de l’ensemble du territoire national.</p>
                                        </div>
                                        <div style={{textAlign: "right"}}>Mardi 17 novembre 2020</div>
                                    </div>
                                </ToggleDisplay>
                            </div>
                        </ToggleDisplay>
                            
                            
                            <Modal show={list}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                onHide={handleClose}
                                >
                                <Modal.Header closeButton className="bg-light">
                                    <Modal.Title id="contained-modal-title-vcenter">
                                    Délogement vers {selectedHotel.hotelName}
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
                                            <Form.Label>Montant du séjour</Form.Label>
                                            <Form.Control type="text" style={{width: "10vw", marginRight: "3vw"}} size="sm" value={formValue.initialPrice} name="initialPrice" onChange={handleChange} />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group controlId="exampleForm.SelectCustom">
                                            <Form.Label>P.E.C</Form.Label><br/>
                                            <select class="selectpicker" value={formValue.type} name="type" onChange={handleChange} 
                                            style={{width: "10vw", 
                                            height: "5vh", 
                                            border: "1px solid lightgrey", 
                                            borderRadius: "3px",
                                            backgroundColor: "white"}}>
                                                <option></option>
                                                <option>oui</option>
                                                <option>non</option>
                                            </select>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group controlId="description">
                                            <Form.Label>Référence de l'Hotel</Form.Label>
                                            <Form.Control type="text" style={{width: "12vw", marginLeft: "3vw"}} size="sm" value={formValue.refHotel} name="refHotel" onChange={handleChange} />
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
                                    
                                    setselectedHotel(null)
                                }}>Déloger</Button>
                                </Modal.Footer>
                            </Modal>                    
                </>) : null}
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
                <h5 className="text-center" style={{marginBottom: "5%"}}><b>Shift Advisor</b></h5>
                
                <h6 className="text-center"><b>Filtrer les recherches d'hôtels par :</b></h6>
                <div style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "space-around"}}>
                <Form.Row>
                <Form.Group style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center"
                }}>
                <Form.Label className="text-center" value={geo} style={{width: "12vw"}}>Département</Form.Label>
                <select className="selectpicker" id="zone" style={{width: "14vw", filter: "drop-shadow(2px 2px 5px black)", padding: "1%"}}>
                <option>Tous les départements</option>
                <option>Paris</option>
                <option>Hauts-de-Seine</option>
                <option>Val d'Oise</option>
                <option>Val de Marne</option>
                <option>Seine St Denis</option>
                <option>Seine et Marne</option>
                <option>Yvelines</option>
                </select>
                <Button variant="dark" size="sm" style={{width: "7vw", marginTop: "5%"}} onClick={handleZone}>Filtrer</Button>
                </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center"
                }}>
                    <Form.Label className="text-center" style={{width: "14vw"}}>Etoiles</Form.Label>
                    <select id="stars" style={{width: "12vw", filter: "drop-shadow(2px 2px 5px black)", padding: "1%"}}>
                        <option>Toutes les étoiles</option>
                        <option>1 étoile</option>
                        <option>2 étoiles</option>
                        <option>3 étoiles</option>
                        <option>4 étoiles</option>
                        <option>5 étoiles</option>
                    </select>

                    <Button variant="dark" size="sm" style={{width: "7vw", marginTop: "5%"}} onClick={handleStars}>Filtrer</Button>
                    </Form.Group>
                </Form.Row>
                </div>
            </div>
            
        </div>
    )
}
