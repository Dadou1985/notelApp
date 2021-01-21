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
import { Loading } from 'react-loading-wrapper'
import 'react-loading-wrapper/dist/index.css'


export default function DeepMap2({user, firebase}) {

    const [info, setInfo] = useState([])
    const [ratingData, setRatingData] = useState([])
    const [commentData, setCommentData] = useState([])
    const [hotelRef, setHotelRef] = useState(null)
    const [selectedHotel, setselectedHotel] = useState(null)
    const [list, setList] = useState(false)
    const [region, setRegion] = useState("nowhere")
    const [initialFilter, setInitialFilter] = useState("region")
    const [departement, setDepartement] = useState("nowhere")
    const [filter, setFilter] = useState(region)
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState(false)
    const [comment, setComment] = useState(false)
    const [number, setNumber] = useState(0)
    const [zoom, setZoom] = useState(5)
    const [loading, setLoading] = useState(true)


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
            zoom: zoom,
            transitionDuration: 500,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: t => t * (2 - t)
        })
    }

    const handleDepartement = (departement, lat, lng) => {
        
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
    

    console.log(filter)

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
        height: "85vh",
        width: "100vw",
        flexFlow: "row",
        overflow: "hidden"}}>
            <Loading 
      loading={loading}
      // Optional props
      color='orange'
      backgroundColor='blue'
      fullPage
      size={100}
      speed='fast'
      // Use your own component, or the 'threeDots' component for the loading screen (default is spinner).
      loadingComponent={<YourLoadingComponent />} 
      loadingComponent='threeDots' 
    >


    </Loading>
            
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

