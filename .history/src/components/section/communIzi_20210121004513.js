import React, { useState, useEffect } from 'react'
import { Form, Input, FormGroup } from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import Send from '../../svg/paper-plane.svg'
import Plus from '../../svg/plus.svg'
import AngryBear from '../../svg/angry-bear.jpg'
import Chill from '../../svg/chill.png'
import Emergency from '../../svg/gyrophare.jpg'
import LowBattery from '../../svg/low-battery.jpg'
import Smile from '../../svg/smile.jpg'
import Scared from '../../svg/scared-icon.png'
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ChatRoom from './chatRoom'
import { OverlayTrigger, Tooltip, Modal, Button, Accordion, Card } from 'react-bootstrap'

export default function CommunIzi({firebase, user}) {
    
    const [info, setInfo] = useState([])
    const [note, setNote] = useState('')
    const [mood, setMood] = useState('')
    const [room, setRoom] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [expanded, setExpanded] = useState('')
    const [showModal, setShowModal] = useState(false)


    const handleChange = event =>{
        setNote(event.currentTarget.value)
    }

    const handleChangeRoomName = event =>{
      setRoom(event.currentTarget.value)
  }

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    let hours = new Date().getHours() + "h"
    let minutes = new Date().getMinutes()
    let time = hours + minutes

    const renderSwitch = (mood) => {
        switch(mood) {
          case 'angry':
            return <img src={AngryBear} alt="angry" style={{width: "30%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
          case 'happy':
            return <img src={Smile} alt="happy" style={{width: "25%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
          case 'scared':
            return <img src={Scared} alt="scared" style={{width: "30%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
          case 'depressed':
            return <img src={LowBattery} alt="depressed" style={{width: "30%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
          case 'emergency':
            return <img src={Emergency} alt="emergency" style={{width: "30%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
          default:
            return <img src={Chill} alt="chill" style={{width: "30%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
        }
      }
      

    Date.prototype.yyyymmdd = function() {
        let day = this.getDate()
        let month = this.getMonth()
        let calendar = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
        let year = this.getFullYear()

        let date = day + " " + calendar[month] + " " + year
        return date
    };

    let dayIn = new Date()
    let today = dayIn.yyyymmdd()

    const handleSubmit = (event) =>{
        event.preventDefault()
        setNote("")
        let date = startDate.yyyymmdd()
        firebase.addMessageIziChat({roomName: expanded, author: user.username, text: note, mood: mood, hour: time, userId: user.uid, date: date})

    }

    const handleRoomnameSubmit = (event) => {
      event.preventDefault()
      setRoom('')
      firebase.addChatRoom({roomName: room, userId: user.uid})
      handleClose()
    }

    const handleShowMoodList = () => {
      let moodList = document.getElementById('moodList')
      moodList.classList.toggle('moodList')
    }

    const Accordion = withStyles({
      root: {
        backgroundColor: "transparent",
        boxShadow: 'none',
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
        '&$expanded': {
          margin: 'auto',
        },
      },
      expanded: {},
    })(MuiAccordion);
    
    const AccordionSummary = withStyles({
      root: {
        color: "white",
        backgroundColor: 'rgb(33, 35, 39)',
        borderBottom: 'none',
        borderRadius: "5px",
        marginBottom: 2,
        minHeight: 56,
        '&$expanded': {
          minHeight: 56,
        },
      },
      content: {
        '&$expanded': {
          margin: '12px 0',
        },
      },
      expanded: {},
    })(MuiAccordionSummary);
    
    const AccordionDetails = withStyles((theme) => ({
      root: {},
    }))(MuiAccordionDetails);

    const handleChangePanel = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziChatOnAir({signal : signal}).onSnapshot(function(snapshot) {
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

     console.log(info)


    return (
        <div style={{width: "90%"}}>
          
            <PerfectScrollbar>
            <div className="communizi_notebox">
                {info.map((flow, index) => (
                      
                          <Accordion defaultActiveKey={index}>
                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey={index}>
                                {flow.id}
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                  {!!firebase &&
                                  <ChatRoom title={flow.id} firebase={firebase} />}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                ))}
            </div>
            </PerfectScrollbar>
            <div>
                <Form inline className="communizi_form">
                <FormGroup  className="communizi_form_input_container"> 
                    <Input type="text" placeholder="Participer à la conversation..."  
                    value={note}
                    onChange={handleChange}
                    id="dark_message_note" />
                </FormGroup>
                    <div style={{
                        display: "flex",
                        flexFlow: "row",
                        justifyContent: "space-between",
                        width: "25%"}}>
                        <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="title">
                            Créer une conversation
                          </Tooltip>
                        }>
                        <img src={Plus} alt="sendIcon" style={{width: "25%", cursor: "pointer"}} onClick={handleShow} />          
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="title">
                            Changer de <i>mood</i>
                          </Tooltip>
                        }>
                        {renderSwitch(mood)}
                    </OverlayTrigger>
                        <img src={Send} alt="sendIcon" style={{width: "25%", cursor: "pointer"}} onClick={handleSubmit} />          
                    </div>
                    <ul style={{position: "absolute", zIndex: "6", listStyleType: "none", bottom: "15%", left: "28vw"}} id="moodList" className="moodList">
                        <li onClick={() => {
                          setMood("angry")
                          handleShowMoodList()}}><img src={AngryBear} alt="angry" className="moodListIcon" /></li>
                        <li onClick={() => {
                          setMood("happy")
                          handleShowMoodList()}}><img src={Smile} alt="smile" className="moodListIcon" /></li>
                        <li onClick={() => {
                          setMood("scared")
                          handleShowMoodList()}}><img src={Scared} alt="scared" className="moodListIcon" /></li>
                        <li onClick={() => {
                          setMood("depressed")
                          handleShowMoodList()}}><img src={LowBattery} alt="lowBattery" className="moodListIcon" /></li>
                        <li onClick={() => {
                          setMood("emergency")
                          handleShowMoodList()}}><img src={Emergency} alt="emergency" className="moodListIcon" /></li>
                        <li onClick={() => {
                          setMood("")
                          handleShowMoodList()}}><img src={Chill} alt="chill" className="moodListIcon" /></li>
                    </ul>
                </Form>
            </div>
            <Modal show={showModal} 
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Donner un titre à la conversation
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input type="text" placeholder="nom de la conversation" value={room} style={{borderTop: "none", borderLeft: "none", borderRight: "none"}} maxLength="60" onChange={handleChangeRoomName} />
                </Modal.Body>
                <Modal.Footer style={{borderTop: "none"}}>
                    <Button variant="success" onClick={handleRoomnameSubmit}>Créer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
