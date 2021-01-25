import React, {useState, useEffect} from 'react'
import ReactMapGL, {Marker, FlyToInterpolator, NavigationControl, LinearInterpolator} from 'react-map-gl'
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
import DepartementDetails from '../../../hotels/departementDetailsSheet/ile_de_france.json'
import { paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur } from "../../../hotels"
import RegionDetails from '../../../hotels/regionDetailsSheet.json'
import HotelRegistrator from './hotelRegitrator'
import moment from 'moment'



export default function DeepMap2({user, firebase}) {

    const [info, setInfo] = useState([])
    const [ratingData, setRatingData] = useState([])
    const [commentData, setCommentData] = useState([])
    const [hotelRef, setHotelRef] = useState(null)
    const [selectedHotel, setselectedHotel] = useState(null)
    const [list, setList] = useState(false)
    const [region, setRegion] = useState("Région")
    const [initialFilter, setInitialFilter] = useState("region")
    const [departement, setDepartement] = useState("Département")
    const [filter, setFilter] = useState(region)
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState(false)
    const [comment, setComment] = useState(false)
    const [number, setNumber] = useState(0)
    const [zoom, setZoom] = useState(5)
    const [scrollZoom, setScrollZoom] = useState(true)

    const [formValue, setformValue] = useState({commentTitle: "", status: "", bestOf: "", bullShift: "", team: 0, management: 0, customer: 0, wage: 0})

    const deptDetails = [paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur]


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
        latitude: 47.2850,
        longitude: 1.4107,
        width: "96%",
        height: "80%",
        zoom: zoom
    })

    const handleRegion = (newRegion, lat, lng, zoom) => {
        
        setRegion(newRegion)
        setviewPort({
            latitude: lat,
            longitude: lng,
            width: "65%",
            height: "100%",
            zoom: zoom,
            transitionDuration: 500,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: t => t * (2 - t)
        })
    }

    const handleDepartement = (departement, lat, lng, zoom) => {
        
        setDepartement(departement)
        setviewPort({
            latitude: lat,
            longitude: lng,
            width: "65%",
            height: "100%",
            zoom: zoom,
            transitionDuration: 500,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: t => t * (2 - t)
        })
    }

    const handleStars = (classement) => {
        setInitialFilter("classement")
        setFilter([classement, "Toutes les étoiles"])
    }
    
    const getLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                setviewPort({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    width: "65%",
                    height: "100%",
                    zoom: zoom
                })
            })
        }else{
            alert("Geolocation is not supported by this browser")
        }
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        firebase.hotelDataOnAir({region: region, departement: departement, initialFilter: initialFilter, filter: filter, signal : signal}).onSnapshot(function(snapshot) {
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
     },[region, departement, filter, initialFilter])

     useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal    

        firebase.hotelRatingDataOnAir({region: region, departement: departement, hotelId: hotelRef, signal : signal}).onSnapshot(function(snapshot) {
            const snapInfo = []
          snapshot.forEach(function(doc) {          
            snapInfo.push({
                id: doc.id,
                ...doc.data()
              })        
            });
            console.log(snapInfo)
            setRatingData(snapInfo)
        });
      
                return () => {
                    abortController.abort()
                    }
     },[region, departement, hotelRef])

     useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal    

        firebase.hotelCommentDataOnAir({region: region, departement: departement, hotelId: hotelRef, signal : signal}).onSnapshot(function(snapshot) {
            const snapInfo = []
          snapshot.forEach(function(doc) {          
            snapInfo.push({
                id: doc.id,
                ...doc.data()
              })        
            });
            console.log(snapInfo)
            setCommentData(snapInfo)
        });
      
                return () => {
                    abortController.abort()
                    }
     },[region, departement, hotelRef])

     var flat = require('array.prototype.flat');

     console.log(info)
     

     const teamRate = ratingData.map(rate => rate.team)
     const managementRate = ratingData.map(rate => rate.management)
     const customerRate = ratingData.map(rate => rate.customer)
     const wageRate = ratingData.map(rate => rate.wage)
     const globalRate = flat([teamRate, managementRate, customerRate, wageRate])

     const reducer = (accumulator, currentValue) => accumulator + currentValue;

     console.log(flat([teamRate, managementRate, customerRate, wageRate]))

    return (
        <div
        style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexFlow: "row",
        overflow: "hidden"}}
        className="boomSkakalaka">
            <ReactMapGL 
            mapboxApiAccessToken={"pk.eyJ1IjoiZGFkZG91MTk4NSIsImEiOiJja2hqbW55NzAxY2hjMnltY3E3NGFvc3VwIn0.2_N4X7hpHuVXErwXFTGBRA"}
            mapStyle="mapbox://styles/daddou1985/ckhjmqdia4iqa19qcjpu4darh"
            onViewportChange={viewPort => {
                setviewPort(viewPort)
            }}
            {...viewPort}
            scrollZoom={scrollZoom}
            style={{marginTop: "4vh", marginLeft: "2vw", borderRadius: "10px"}}
            >
                {info.map((hotel, key) =>(
                    <Marker 
                    key={key}
                    latitude={hotel.lat} 
                    longitude={hotel.lng}
                    > 
                     <OverlayTrigger
                        onEnter={() => setHotelRef(hotel.id)}
                        placement="top"
                        overlay={
                        <Tooltip id="title">
                            <h5 style={{padding: "5%"}}>{hotel.hotelName}</h5>
                                {ratingData.length > 0 ?
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend"></Typography>
                                <Rating
                                name="management"
                                value={globalRate.reduce(reducer)/globalRate.length}
                                precision={0.5}
                                icon={<SentimentSatisfiedAltIcon fontSize="inherit" />}
                                readOnly
                                />
                            </Box> : "Notez-le"}
                            
                        </Tooltip>

                        }>
                            <button style={{background: "none", border: "none"}}
                            onClick={(event) => {
                                    event.preventDefault()
                                    setselectedHotel(hotel)
                                    setDetails(true) 
                                    setHotelRef(hotel.id)
                                    setScrollZoom(false)
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
                                width: "40%",
                                height: "100%",
                                maxHeight: "auto",
                                backgroundColor: "white",
                                zIndex: "500",
                                padding: "3%",
                                opacity: "0.9",
                                color: "black",
                                overflow: "auto",
                                float: "right"
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
                                        <img src={Arrow} alt="arrow" style={{width: "1vw", cursor: "pointer", marginLeft: "1vw", transform: "rotate(0turn)"}} id="arrowTop" onClick={handleShowDetails} />
                                    </div>
                                    <img src={Close}  alt="" style={{width:"2vw", cursor: "pointer"}} onClick={() => {
                                        setCommentData([])
                                        handleShowWindowDetails()
                                        setScrollZoom(true)}}
                                         />
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
                                            <p style={{color: "green", fontSize: "2em"}}>{teamRate.length > 0 ? <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Typography component="legend"></Typography>
                                                    <Rating
                                                    name="team"
                                                    value={teamRate.reduce(reducer)/teamRate.length}
                                                    onChange={handleChange}
                                                    precision={0.5}
                                                    readOnly/>
                                                </Box> : "euh..."}</p>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column",
                                            alignItems: "center",
                                            width: "25%"
                                        }}>
                                            <h5>Management</h5>
                                            <img src={Management} alt="" style={{width: "30%", borderRadius: "25px", marginBottom: "2vh"}} />
                                            <p style={{color: "green", fontSize: "2em"}}>{managementRate.length > 0 ? <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Typography component="legend"></Typography>
                                                    <Rating
                                                    name="team"
                                                    value={managementRate.reduce(reducer)/managementRate.length}
                                                    onChange={handleChange}
                                                    precision={0.5}
                                                    readOnly/>
                                                </Box> : "euh..."}</p>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column",
                                            alignItems: "center",
                                            width: "25%"
                                        }}>
                                            <h5>Clientèle</h5>
                                            <img src={Customer} alt="" style={{width: "30%", borderRadius: "25px", marginBottom: "2vh"}} />
                                            <p style={{color: "green", fontSize: "2em"}}>{customerRate.length > 0 ? <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Typography component="legend"></Typography>
                                                    <Rating
                                                    name="team"
                                                    value={customerRate.reduce(reducer)/customerRate.length}
                                                    onChange={handleChange}
                                                    precision={0.5}
                                                    readOnly/>
                                                </Box> : "euh..."}</p>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column",
                                            alignItems: "center",
                                            width: "25%"
                                        }}>
                                            <h5>Avantages</h5>
                                            <img src={Wage} alt="" style={{width: "30%", borderRadius: "25px", marginBottom: "2vh"}} />
                                            <p style={{color: "green", fontSize: "2em"}}>{wageRate.length > 0 ? <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Typography component="legend"></Typography>
                                                    <Rating
                                                    name="team"
                                                    value={wageRate.reduce(reducer)/wageRate.length }
                                                    onChange={handleChange}
                                                    precision={0.5}
                                                    readOnly/>
                                                </Box>: "euh..."}</p>
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
                                           {commentData.length} avis
                                            <img src={Arrow} alt="arrow" style={{width: "1vw", cursor: "pointer", marginLeft: "1vw", transform: "rotate(0turn)"}} id="arrowBottom" onClick={handleShowComment} />
                                        </span>
                                    </div>
                                </div>
                                <ToggleDisplay show={comment}>
                                    {commentData && commentData.map(commentData => (
                                        <div style={{
                                            display: "flex",
                                            flexFlow: "column",
                                            padding: "2%", 
                                            backgroundColor: "rgb(230, 232, 237)",
                                            borderRadius: "15px",
                                            marginBottom: "5vh"
                                        }}
                                        defaultChecked={comment}>
                                        <div>
                                            <h4>{commentData.commentTitle}</h4>
                                            <p>{commentData.status}</p>
                                        </div>
                                        <div>
                                            <h6>Le Best Of</h6>
                                            <p>{commentData.bestOf}</p>
                                        </div>
                                        <div>
                                            <h6>Les BullShift</h6>
                                            <p>{commentData.bullShift}</p>
                                        </div>
                                        <div style={{textAlign: "right"}}>{moment(commentData.markup).fromNow()}</div>
                                    </div>
                                    ))}
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
                                                    />
                                                </Box>                                            
                                            </Form.Group>
                                            </Form.Row>
                                            <Form.Row style={{width: "25%"}}>
                                                <Form.Group controlId="description">
                                                <Form.Label>Avantages</Form.Label>
                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Typography component="legend"></Typography>
                                                    <Rating
                                                    name="wage"
                                                    value={formValue.wage}
                                                    onChange={handleChange}
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
                                        region: region === "PARIS" ? selectedHotel.departement : selectedHotel.region,
                                        departement: region === "PARIS" ? selectedHotel.code_postal : selectedHotel.departement,
                                        commentTitle: formValue.commentTitle,
                                        status: formValue.status,
                                        bestOf: formValue.bestOf,
                                        bullShift: formValue.bullShift,
                                        team: parseInt(formValue.team),
                                        management: parseInt(formValue.management),
                                        customer: parseInt(formValue.customer),
                                        wage: parseInt(formValue.wage)})
                                    setselectedHotel(null)
                                }}>Envoyer</Button>
                                </Modal.Footer>
                            </Modal>                    
                            </>) : null}
                            <div style={{
                                display: "flex",
                                flexFlow: "column",
                                justifyContent: "space-around",
                                width: "12%",
                                height: "40vh",
                                marginTop: "4vh",
                                marginLeft: "2vw",
                                borderRadius: "5px",
                                backgroundColor: "rgb(33, 35, 39)",
                                opacity: "0.8",
                                position: "absolute",
                                padding: "1%"
                            }}>
                            <h3><b>Shift Advisor</b></h3>
                            <Divider style={{height: "1vh", backgr}} />
                            
                            <h6><b>Filtrer les hôtels par :</b></h6>
                            <div style={{
                                display: "flex",
                                flexFlow: "column",
                                justifyContent: "space-around",
                                alignItems: "start"}}>
                            <Form.Row>
                            <Form.Group style={{
                                display: "flex",
                                flexFlow: "column",
                                alignItems: "center"
                            }}>
                            <DropdownButton id="dropdown-basic-button" title={region} drop="left">
                            {RegionDetails.map(details => (
                                <Dropdown.Item  onClick={()=>{
                                    console.log(details.view)
                                    setZoom(details.view)
                                    setNumber(details.number)
                                    handleRegion(details.region, details.coordinates[0], details.coordinates[1], details.view)}}>{details.region}</Dropdown.Item>
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
                            
                            <DropdownButton id="dropdown-basic-button" title={departement} variant='info'>
                                
                            {region === "PARIS" ? deptDetails[number].map(details => (
                                <Dropdown.Item  onClick={()=>{
                                    console.log(details.view)
                                    setZoom(details.view)
                                    setInitialFilter("code_postal")
                                    setFilter(details.nom)
                                    handleDepartement(details.nom, details.coordinates[0], details.coordinates[1], details.view)}}>{details.nom}</Dropdown.Item>
                                )) : deptDetails[number].map(details => (
                                    <Dropdown.Item  onClick={()=>{
                                        console.log(details.view)
                                        setZoom(details.view)
                                        setInitialFilter("departement")
                                        setFilter(details.nom)
                                        handleDepartement(details.nom, details.coordinates[0], details.coordinates[1], details.view)}}>{details.nom}</Dropdown.Item>
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
                            <DropdownButton id="dropdown-basic-button" title={initialFilter === "classement" ? filter[0] : "Classement"} variant='warning'>
                                <Dropdown.Item onClick={()=>{handleStars("1 étoile")}}>1 étoile</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleStars("2 étoiles")}}>2 étoiles</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleStars("3 étoiles")}}>3 étoiles</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleStars("4 étoiles")}}>4 étoiles</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleStars("5 étoiles")}}>5 étoiles</Dropdown.Item>
                            </DropdownButton>
                            </Form.Group>
                            </Form.Row>
                            {/*<Form.Group style={{
                                display: "flex",
                                flexFlow: "column",
                                alignItems: "center"
                            }}>
                            <DropdownButton id="dropdown-basic-button" title="Réputation" variant='success'>
                                <Dropdown.Item onClick={()=>{handleStars("1 étoile")}}>1 smile</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleStars("2 étoiles")}}>2 smiles</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleStars("3 étoiles")}}>3 smiles</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleStars("4 étoiles")}}>4 smiles</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleStars("5 étoiles")}}>5 smiles</Dropdown.Item>
                            </DropdownButton>
                            </Form.Group>*/}
                            </div>
                        </div>
                    <div style={{position: 'absolute', right: 0}}>
                        <NavigationControl />
                    </div>
            </ReactMapGL>
            {!!firebase &&
            <HotelRegistrator firebase={firebase} />}
        </div>
    )
}

