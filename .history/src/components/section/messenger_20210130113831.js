import React, {useState, useContext } from 'react'
import { Button, Form, FormGroup, Input, CustomInput, Alert } from 'reactstrap'
import { FirebaseContext } from '../../Firebase'
import NoteBox from './noteBox'
import moment from 'moment'
import DatePicker from "react-datepicker"
import SendIcon from '@material-ui/icons/Send'
import "../css/messenger_datepicker.css"
import PerfectScrollbar from 'react-perfect-scrollbar'
import Send from '../../svg/paper-plane.svg'
import Calendar from '../../svg/calendar.svg'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion'
import Avatar from 'react-avatar'
import Plus from '../../svg/plus3.svg'
import { OverlayTrigger, Tooltip, Modal } from 'react-bootstrap'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fade from '@material-ui/core/Fab';
import YellowCircle from '../../svg/yellow-circle.svg'
import RedCircle from '../../svg/red-circle.svg'
import BlueCircle from '../../svg/blue-circle.svg'


const Messenger = () =>{

    const [note, setNote] = useState('')
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("")
    const [checked, setChecked] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const { user, firebase } = useContext(FirebaseContext)
    const [showModal, setShowModal] = useState(false)
    
    const handleChange = event =>{
        setNote(event.currentTarget.value)
    }

    const renderSwitch = (status) => {
        switch(status) {
          case 'important':
            return <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="title">
                Changer de statut
              </Tooltip>
            }>
            <img src={YellowCircle} alt="important" style={{width: "5%", cursor: "pointer", marginRight: "1vw"}} onClick={() => setChecked(true)} />
        </OverlayTrigger>
          case 'urgent':
            return <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="title">
                Changer de statut
              </Tooltip>
            }>
            <img src={RedCircle} alt="urgent" style={{width: "5%", cursor: "pointer", marginRight: "1vw"}} onClick={() => setChecked(true)} />
        </OverlayTrigger>
          default:
            return <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="title">
                Changer de statut
              </Tooltip>
            }>
             <img src={BlueCircle} alt="info" style={{width: "5%", cursor: "pointer", marginRight: "1vw"}} onClick={() => setChecked(true)} />
        </OverlayTrigger>
        }
      }

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    let hours = new Date().getHours() + "h"
    let minutes = new Date().getMinutes()
    let time = hours + minutes

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
        let marker = startDate.getTime()
        let date = startDate.yyyymmdd()
               
        if(date !== today) {
            const notif = "Votre message a bien été enregistré pour le " + date + " ."
            firebase.addNotification({documentId: user.displayName, notification: notif})
            setStartDate(new Date)
        }
        firebase.addMessage({documentId: user.displayName, author: user.username, text: note, hour: time, markup: marker, ref: user.uid, date: date})

    }

    return(
        <div className="messenger_container">
            <h5 className="font-weight-bolder messenger_title">Note Book</h5>
            <PerfectScrollbar>
                <div className="messenger_notebox">
                    {!!firebase && !!user &&
                    <NoteBox firebase={firebase} user={user} />}
                </div>
                <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip id="title">
                    Ajouter une note
                    </Tooltip>
                }>
                <img src={Plus} alt="Plus" style={{width: "1%", cursor: "pointer", marginRight: "1vw", position: "fixed", right: "45vw"}} onClick={handleShow} />
            </OverlayTrigger>
            </PerfectScrollbar>
            
            <Modal show={showModal} 
            size="lg"
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm" style={{width: "100%"}}>
                    <Input type="text" name="title" placeholder="Donner un titre à la note..." style={{border: "none", width: "100%", color: "black", fontWeight: "100"}} maxLength="60" onChange={handleChange} required />
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input type="textarea" placeholder="Rédiger une note..." value={note} style={{borderTop: "none", borderLeft: "none", borderRight: "none", height: "10vh", minHeight: "5vh", maxHeight: "15vh"}} onChange={handleChange} required />
                </Modal.Body>
                <Modal.Footer style={{borderTop: "none"}}>
                    <div style={{
                        display: "flex",
                        flexFlow: "row",
                        justifyContent: "flex-end"
                    }}>
                         <DatePicker
                            id="calendar"
                            className="react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input"
                            selected={startDate}
                            value={startDate}
                            onChange={changedDate => setStartDate(changedDate)}
                            placeholderText="Date du jour"
                            locale="fr-FR"
                            dateFormat="d MMMM yyyy"
                        />
                        {renderSwitch(status)}
                        <img src={Calendar} alt="sendIcon" style={{width: "5%", cursor: "pointer"}} />
                        <img src={Send} alt="sendIcon" style={{width: "5%", cursor: "pointer", borderRadius: "50%", marginLeft: "1vw"}} onClick={handleSubmit} />
                        <List component="nav" aria-label="main mailbox folders" style={{
                            position: "absolute",
                            display: "flex",
                            flexFlow: "column",
                            justifyContent: "space-around",
                            alignItems: "center",
                            height: "70%",
                            marginTop: "4vh",
                            marginRight: "13%",
                            width: "6%",
                            border: "1px solid black"
                        }}>
                            <Fade in={checked}>
                            <ListItemIcon button>
                                <ListItemIcon>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                    <Tooltip id="title">
                                        Changer de statut
                                    </Tooltip>
                                    }>
                                    <img src={RedCircle} alt="urgent" style={{width: "25%", cursor: "pointer", marginRight: "1vw"}} onClick={() => setChecked(true)} />
                                </OverlayTrigger>
                                </ListItemIcon>
                            </ListItemIcon>
                            <ListItemIcon button>
                                <ListItemIcon>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                    <Tooltip id="title">
                                        Changer de statut
                                    </Tooltip>
                                    }>
                                    <img src={YellowCircle} alt="urgent" style={{width: "25%", cursor: "pointer", marginRight: "1vw"}} onClick={() => setChecked(true)} />
                                </OverlayTrigger>
                                </ListItemIcon>
                            </ListItemIcon>
                            <ListItemIcon button>
                                <ListItemIcon>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                    <Tooltip id="title">
                                        Changer de statut
                                    </Tooltip>
                                    }>
                                    <img src={BlueCircle} alt="urgent" style={{width: "25%", cursor: "pointer", marginRight: "1vw"}} onClick={() => setChecked(true)} />
                                </OverlayTrigger>
                                </ListItemIcon>
                            </ListItemIcon>
                        </List>
                    </div>
                </Modal.Footer>
            </Modal>
            

            {/*<Form inline className="messenger_form">
            <FormGroup  className="messenger_form_input_container"> 
                <Input type="text" name="text" placeholder="Ecrire une note..."  
                value={note}
                onChange={handleChange}
                id="message" />
            </FormGroup>
            <DatePicker
                id="calendar"
                className="react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input"
                selected={startDate}
                value={startDate}
                onChange={changedDate => setStartDate(changedDate)}
                placeholderText="Date du jour"
                locale="fr-FR"
                dateFormat="d MMMM yyyy"
            />
            <img src={Calendar} alt="sendIcon" style={{width: "5%", cursor: "pointer"}} onClick={handleSubmit} />
            <img src={Send} alt="sendIcon" style={{width: "5%", cursor: "pointer", borderRadius: "50%"}} onClick={handleSubmit} />

                    </Form>*/}
        </div>
    )
}

export default Messenger