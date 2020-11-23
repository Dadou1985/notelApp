import React, {useState, useEffect} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import {Form, Button, Modal, OverlayTrigger, Tooltip, Dropdown, DropdownButton} from 'react-bootstrap'
import MarkerImg from './markerImgAdvisor'
import Team from '../../svg/team.svg'
import Management from '../../svg/management.svg'
import Customer from '../../svg/customer.svg'
import Wage from '../../svg/wage.svg'
import Divider from '@material-ui/core/Divider'
import Arrow from '../../svg/arrowDown.svg'
import ToggleDisplay from 'react-toggle-display'
import Close from '../../svg/close.svg'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import DepartementDetails from '../../../hotels/departementDetailsSheet/idfDetailsSheet.json'
import RegionDetails from '../../../hotels/regionDetailsSheet.json'
import HotelRegistrator from './hotelRegitrator'


export default function DeepMap2({user, firebase}) {

    const [info, setInfo] = useState([])
    const [selectedHotel, setselectedHotel] = useState(null)
    const [list, setList] = useState(false)
    const [region, setRegion] = useState("ILE-DE-FRANCE")
    const [initialFilter, setInitialFilter] = useState("departement")
    const [filter, setFilter] = useState(["YVELINES", "Tous les départements"])
    const [geo, setGeo] = useState({geo: []})
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState(false)
    const [comment, setComment] = useState(false)
    const [zoom, setZoom] = useState(9)

    const [formValue, setformValue] = useState({commentTitle: "", status: "", bestOf: "", bullShift: "", team: 0, management: 0, customer: 0, wage: 0})

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
        latitude: 48.8534,
        longitude: 2.3488,
        width: "65%",
        height: "100%",
        zoom: zoom
    })

    const handleRegion = (newRegion, lat, lng) => {
        
        setRegion(newRegion)
        setviewPort({
            latitude: lat,
            longitude: lng,
            width: "65%",
            height: "100%",
            zoom: zoom
        })
    }

    const handleDepartement = (departement, lat, lng) => {
        
        setInitialFilter("departement")
        setFilter([departement, "Tous les départements"])
        setviewPort({
            latitude: lat,
            longitude: lng,
            width: "65%",
            height: "100%",
            zoom: zoom
        })
    }

    const handleStars = () => {
        const dept = document.getElementById("stars")
        const deptValue = dept.options[dept.selectedIndex].text
        setRegion("standing")
        setRegion(deptValue)
    }

    console.log(filter)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        firebase.hotelDataOnAir({region: region, initialFilter: initialFilter, filter: filter, signal : signal}).onSnapshot(function(snapshot) {
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
     },[region, filter, initialFilter])

     console.log(zoom)

    return (
        <div
        style={{
        display: "flex",
        height: "85vh",
        width: "100vw",
        flexFlow: "row"}}>
            <ReactMapGL 
            {...viewPort}
            mapboxApiAccessToken={"pk.eyJ1IjoiZGFkZG91MTk4NSIsImEiOiJja2hqbW55NzAxY2hjMnltY3E3NGFvc3VwIn0.2_N4X7hpHuVXErwXFTGBRA"}
            mapStyle="mapbox://styles/daddou1985/ckhjmqdia4iqa19qcjpu4darh"
            onViewportChange={viewPort => {
                setviewPort(viewPort)
            }}
            >
                {info.map((hotel, key) =>(
                    <Marker 
                    key={key}
                    latitude={hotel.lat} 
                    longitude={hotel.lng}
                     > 
                     <OverlayTrigger
                        placement="top"
                        overlay={
                        <Tooltip id="title">
                            <h5 style={{padding: "5%"}}>{hotel.hotelName}</h5>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend"></Typography>
                                <Rating
                                name="management"
                                value={formValue.management}
                                precision={0.5}
                                icon={<SentimentSatisfiedAltIcon fontSize="inherit" />}
                                readOnly
                                />
                            </Box>   
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
                                        <h3>{selectedHotel.hotelName}</h3>
                                        <span>Etablissement {selectedHotel.classement[0]}</span>
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
                                        <span><b style={{color: "gray"}}>Adresse: </b> {selectedHotel.adresse}, {selectedHotel.code_postal} {selectedHotel.city}</span>
                                        <span><b style={{color: "gray"}}>Nombre de chambres: </b> {selectedHotel.room}</span> 
                                        <span><b style={{color: "gray"}}>Téléphone: </b>{selectedHotel.phone}</span> 
                                        <span><b style={{color: "gray"}}>Courriel: </b>{selectedHotel.mail}</span>
                                        <span><b style={{color: "gray"}}>Portail web: </b>{selectedHotel.website}</span>
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
                                            borderRadius: "15px",
                                            marginBottom: "5vh"
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
                                tpp
                                onHide={handleClose}>
                                <Modal.Header closeButton className="bg-light">
                                    <Modal.Title id="contained-modal-title-vcenter" style={{textAlign: "center"}}>
                                    {selectedHotel.hotelName}
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{height: "65vh", overflow: "auto"}}>
                                <div style={{textAlign: "center"}}><h4 style={{marginTop: "2vh"}}>Faites-nous part de votre expérience</h4></div>
                                <div id="overbookingForm" style={{
                                    display: "flex",
                                    flexFlow: "row wrap",
                                    width: "100%",
                                    justifyContent: "space-around",
                                    alignItems: "flex-start",
                                    padding: "2%", 
                                    }}>
                                        <div>
                                            <Form.Row style={{width: "25%"}}>
                                                <Form.Group controlId="description">
                                                <Form.Label>Teamwork</Form.Label>
                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Typography component="legend"></Typography>
                                                    <Rating
                                                    name="team"
                                                    value={formValue.team}
                                                    onChange={handleChange}
                                                    precision={0.5}
                                                    />
                                                </Box>
                                            </Form.Group>
                                            </Form.Row>
                                            <Form.Row style={{width: "25%"}}>
                                                <Form.Group controlId="description">
                                                <Form.Label>Management</Form.Label>
                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Typography component="legend"></Typography>
                                                    <Rating
                                                    name="management"
                                                    value={formValue.management}
                                                    onChange={handleChange}
                                                    precision={0.5}
                                                    />
                                                </Box>                                        
                                            </Form.Group>
                                            </Form.Row>
                                            <Form.Row style={{width: "25%"}}>
                                                <Form.Group controlId="description">
                                                <Form.Label>Clientèle</Form.Label>
                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Typography component="legend"></Typography>
                                                    <Rating
                                                    name="customer"
                                                    value={formValue.customer}
                                                    onChange={handleChange}
                                                    precision={0.5}
                                                    />
                                                </Box>                                            
                                            </Form.Group>
                                            </Form.Row>
                                            <Form.Row style={{width: "25%"}}>
                                                <Form.Group controlId="description">
                                                <Form.Label>Salaire</Form.Label>
                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Typography component="legend"></Typography>
                                                    <Rating
                                                    name="wage"
                                                    value={formValue.wage}
                                                    onChange={handleChange}
                                                    precision={0.5}
                                                    />
                                                </Box>                                            
                                            </Form.Group>
                                            </Form.Row>
                                        </div>
                                        <div>
                                            <Form.Row>
                                                <Form.Group controlId="description" style={{width: "100%"}}>
                                                    <Form.Label>Résumez votre expérience en une phrase</Form.Label>
                                                    <Form.Control type="text" size="sm" style={{width: "100%"}} value={formValue.commentTitle} name="commentTitle" onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group controlId="exampleForm.SelectCustom" style={{width: "100%"}}>
                                                    <Form.Label>Quel est votre statut actuel vis-à-vis de l'établissement ?</Form.Label><br/>
                                                    <select class="selectpicker" value={formValue.status} name="status" onChange={handleChange} 
                                                    style={{width: "100%", 
                                                    height: "5vh", 
                                                    border: "1px solid lightgrey", 
                                                    borderRadius: "3px",
                                                    backgroundColor: "white"}}>
                                                        <option></option>
                                                        <option>employé actuel</option>
                                                        <option>ancien employé</option>
                                                    </select>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group controlId="description" style={{width: "100%"}}>
                                                    <Form.Label>Faites-nous un <i>Best of</i> des meilleurs moments</Form.Label>
                                                    <Form.Control as="textarea" type="text" size="sm" style={{width: "100%", resize: "none"}} value={formValue.bestOf} name="bestOf" onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group controlId="description" style={{width: "100%"}}>
                                                    <Form.Label>Faites-nous un <i>Best of</i> des moments <i>BullShift</i></Form.Label>
                                                    <Form.Control as="textarea" type="text" size="sm" style={{width: "100%", resize: "none"}} value={formValue.bullShift} name="bullShift" onChange={handleChange} />
                                                </Form.Group>
                                            </Form.Row>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="success" 
                                style={{width: "20%"}} 
                                onClick={(event) => {
                                    event.preventDefault()
                                    setformValue({commentTitle: "", status: "", bestOf: "", bullShift: "", team: 0, management: 0, customer: 0, wage: 0})
                                    firebase.addCommentOnHotel({
                                        hotelId: selectedHotel.id, 
                                        region: selectedHotel.region,
                                        commentTitle: formValue.commentTitle,
                                        status: formValue.status,
                                        bestOf: formValue.bestOf,
                                        bullShift: formValue.bullShift,
                                        team: formValue.team,
                                        management: formValue.management,
                                        customer: formValue.customer,
                                        wage: formValue.wage})
                                    setselectedHotel(null)
                                }}>Envoyer</Button>
                                </Modal.Footer>
                            </Modal>                    
                </>) : null}
            </ReactMapGL>
            <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    width: "35%",
                    padding: "1%",
                    marginTop: "2%",
                    marginBottom: "2%"
                  }}>
                <h3 className="text-center" style={{marginBottom: "3%"}}><b>Shift Advisor</b></h3>
                <Form.Group style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center"
                }}>
                <DropdownButton id="dropdown-basic-button" title="Choisir une région" drop="left">
                {RegionDetails.map(details => (
                    <Dropdown.Item  onClick={()=>{
                        console.log(details.view)
                        setZoom(details.view)
                        handleRegion(details.region, details.coordinates[0], details.coordinates[1])}}>{details.region}</Dropdown.Item>
                    ))}
                </DropdownButton>
                </Form.Group>
                
                <h6 className="text-center"><b>Filtrer les recherches d'hôtels par :</b></h6>
                <div style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    justifyContent: "space-around"}}>
                <Form.Row>
                <Form.Group style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center"
                }}>
                
                <DropdownButton id="dropdown-basic-button" title="Départements" variant='info'>
                {DepartementDetails.map(details => (
                    <Dropdown.Item  onClick={()=>{
                        console.log(details.view)
                        setZoom(details.view)
                        handleDepartement(details.nom, details.coordinates[0], details.coordinates[1])}}>{details.nom}</Dropdown.Item>
                    ))}
                </DropdownButton>
                </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center"
                }}>
                <DropdownButton id="dropdown-basic-button" title="Départements" variant='info'>
                    <Dropdown.Item>1 </Dropdown.Item>
                </DropdownButton>
                </Form.Group>
                </Form.Row>
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
                </Form.Group>
                </div>
            </div>
        </div>
    )
}

