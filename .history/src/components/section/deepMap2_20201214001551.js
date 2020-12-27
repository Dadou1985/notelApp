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
import DepartementDetails from '../../../hotels/departementDetailsSheet/ile_de_france.json'
import { paris_arrondissement, ile_de_france, auvergne_rhone_alpes, bourgogne_franche_comte, bretagne, centre_val_de_loire, corse, grand_est, hauts_de_france, normandie, nouvelle_aquitaine, occitanie, pays_de_la_loire,provence_alpes_cote_d_azur } from "../../../hotels"
import RegionDetails from '../../../hotels/regionDetailsSheet.json'
import HotelRegistrator from './hotelRegitrator'


export default function DeepMap2({user, firebase}) {

    const [info, setInfo] = useState([])
    const [commentData, setCommentData] = useState([])
    const [hotelRef, setHotelRef] = useState(null)
    const [selectedHotel, setselectedHotel] = useState(null)
    const [list, setList] = useState(false)
    const [region, setRegion] = useState("ILE-DE-FRANCE")
    const [initialFilter, setInitialFilter] = useState("region")
    const [departement, setDepartement] = useState("YVELINES")
    const [filter, setFilter] = useState(region)
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState(false)
    const [comment, setComment] = useState(false)
    const [number, setNumber] = useState(0)
    const [zoom, setZoom] = useState(9)

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
        
        setDepartement(departement)
        setviewPort({
            latitude: lat,
            longitude: lng,
            width: "65%",
            height: "100%",
            zoom: zoom
        })
    }

    const handleStars = (classement) => {
        setInitialFilter("classement")
        setFilter([classement, "Toutes les étoiles"])
    }

    console.log(filter)

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
                setCommentData(snapInfo)
            });

      
                return () => {
                    abortController.abort()
                    }
     },[region, departement, hotelRef])


     console.log()
     console.log(commentData)

    return (
        <div
        style={{
        display: "flex",
        height: "85vh",
        width: "100vw",
        flexFlow: "row",
        overflow: "hidden"}}>
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
                        <Tooltip id="title" 
                        onMouseOver={()=>{setHotelRef(hotel.id)}} 
                        onMouseLeave={()=>{
                            setHotelRef(null)
                            setCommentData([])}}>
                            <h5 style={{padding: "5%"}}>{hotel.hotelName}</h5>
                            {commentData === [] ? <div style={{backgroundColor: "red"}}>No score !</div> : <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend"></Typography>
                                <Rating
                                name="management"
                                value={commentData[0]}
                                precision={0.5}
                                icon={<SentimentSatisfiedAltIcon fontSize="inherit" />}
                                readOnly
                                />
                            </Box> }
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
                                backgroundColor: "white",
                                zIndex: "500",
                                padding: "3%",
                                opacity: "0.9",
                                color: "black",
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
                                        <img src={Arrow} alt="arrow" style={{width: "1vw", cursor: "pointer", marginLeft: "1vw", transform: "rotate(0turn)"}} id="arrowTop" onClick={handleShowDetails} />
                                    </div>
                                    <img src={Close}  alt="" style={{width:"2vw", cursor: "pointer"}} onClick={handleShowWindowDetails} />
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
                                            <h5>Avantages</h5>
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
                                            <img src={Arrow} alt="arrow" style={{width: "1vw", cursor: "pointer", marginLeft: "1vw", transform: "rotate(0turn)"}} id="arrowBottom" onClick={handleShowComment} />
                                        </span>
                                    </div>
                                </div>
                                <ToggleDisplay show={comment}>
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
                                                    value={Number(formValue.team)}
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
                                                    value={Number(formValue.management)}
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
                                                    value={Number(formValue.customer)}
                                                    onChange={handleChange}
                                                    precision={0.5}
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
                                                    value={Number(formValue.wage)}
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
                                        region: region === "PARIS" ? selectedHotel.departement : selectedHotel.region,
                                        departement: region === "PARIS" ? selectedHotel.code_postal : selectedHotel.departement,
                                        commentTitle: formValue.commentTitle,
                                        status: formValue.status,
                                        bestOf: formValue.bestOf,
                                        bullShift: formValue.bullShift,
                                        team: selectedHotel.team.push(formValue.team),
                                        management: selectedHotel.management.push(formValue.management),
                                        customer: selectedHotel.customer.push(formValue.customer),
                                        wage: selectedHotel.wage.push(formValue.wage)})
                                    setselectedHotel(null)
                                }}>Envoyer</Button>
                                </Modal.Footer>
                            </Modal>                    
                            </>) : null}
            </ReactMapGL>
            {<div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    width: "35%",
                    padding: "1%",
                  }}>
                <h3 className="text-center"><b>Shift Advisor</b></h3>
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
                        setNumber(details.number)
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
                    
                {region === "PARIS" ? deptDetails[number].map(details => (
                    <Dropdown.Item  onClick={()=>{
                        console.log(details.view)
                        setZoom(details.view)
                        setInitialFilter("code_postal")
                        setFilter(details.nom)
                        handleDepartement(details.nom, details.coordinates[0], details.coordinates[1])}}>{details.nom}</Dropdown.Item>
                    )) : deptDetails[number].map(details => (
                        <Dropdown.Item  onClick={()=>{
                            console.log(details.view)
                            setZoom(details.view)
                            setInitialFilter("departement")
                            setFilter(details.nom)
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
                <DropdownButton id="dropdown-basic-button" title="Classement" variant='warning'>
                    <Dropdown.Item onClick={()=>{handleStars("1 étoile")}}>1 étoile</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleStars("2 étoiles")}}>2 étoiles</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleStars("3 étoiles")}}>3 étoiles</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleStars("4 étoiles")}}>4 étoiles</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleStars("5 étoiles")}}>5 étoiles</Dropdown.Item>
                </DropdownButton>
                </Form.Group>
                </Form.Row>
                <Form.Group style={{
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
                </Form.Group>
                </div>
            </div>}
            {!!firebase &&
            <HotelRegistrator firebase={firebase} />}
        </div>
    )
}

