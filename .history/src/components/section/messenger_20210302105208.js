import React, {useState, useContext } from 'react'
import { Input } from 'reactstrap'
import { FirebaseContext } from '../../Firebase'
import NoteBox from './noteBox'
import DatePicker from "react-datepicker"
import "../css/messenger_datepicker.css"
import PerfectScrollbar from 'react-perfect-scrollbar'
import Send from '../../svg/paper-plane.svg'
import Calendar from '../../svg/calendar.svg'
import Plus from '../../svg/plus3.svg'
import { OverlayTrigger, Tooltip, Modal } from 'react-bootstrap'
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import YellowCircle from '../../svg/yellow-circle.svg'
import RedCircle from '../../svg/red-circle.svg'
import BlueCircle from '../../svg/blue-circle.svg'
import Circle from '../../svg/circle.svg'
import Upload from '../../svg/plus2.svg'
import Drawer from '@material-ui/core/Drawer'


const Messenger = () =>{

    const [note, setNote] = useState('')
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("")
    const [checked, setChecked] = useState(false)
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const { user, firebase } = useContext(FirebaseContext)
    const [showModal, setShowModal] = useState(false)
    const [activate, setActivate] = useState(true)
    
    const handleChangeNote = event =>{
        setNote(event.currentTarget.value)
    }

    const handleChangeTitle = event =>{
        setTitle(event.currentTarget.value)
    }

    const handleImgChange = (event) => {
        if (event.target.files[0]){
            setImg(event.target.files[0])
        }
    }

    const handleHideDrawer = () => {
        setActivate(false)
    }


    const renderSwitch = (status) => {
        switch(status) {
          case 'darkgoldenrod':
            return <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="title">
                Changer de statut
              </Tooltip>
            }>
            <img src={YellowCircle} alt="important" style={{width: "5%", cursor: "pointer", marginRight: "1vw", filter: "drop-shadow(2px 2px 2px)"}} onClick={() => setChecked(true)} />
        </OverlayTrigger>
          case 'red':
            return <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="title">
                Changer de statut
              </Tooltip>
            }>
            <img src={RedCircle} alt="urgent" style={{width: "5%", cursor: "pointer", marginRight: "1vw", filter: "drop-shadow(2px 2px 2px)"}} onClick={() => setChecked(true)} />
        </OverlayTrigger>
          case 'lightskyblue':
            return <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="title">
                Changer de statut
              </Tooltip>
            }>
             <img src={BlueCircle} alt="info" style={{width: "5%", cursor: "pointer", marginRight: "1vw", filter: "drop-shadow(2px 2px 2px)"}} onClick={() => setChecked(true)} />
        </OverlayTrigger>
        default:
            return <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="title">
                Changer de statut
              </Tooltip>
            }>
             <img src={Circle} alt="default" style={{width: "5%", cursor: "pointer", marginRight: "1vw", filter: "drop-shadow(2px 2px 2px)"}} onClick={() => setChecked(true)} />
        </OverlayTrigger>
        }
      }

    const handleClose = () => setShowModal(false)
    const handleShow = () => {
        if(window.innerWidth > 480) {
            setShowModal(true)
        }else{
            setActivate(true)
        }
    }

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
        if(img !== null) {
            const uploadTask = firebase.storage.ref(`img/${img.name}`).put(img)
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          () => {
            firebase.storage
              .ref("img")
              .child(img.name)
              .getDownloadURL()
              .then(url => {
                const uploadTask = () => {
                    setNote("")
                    setTitle("")
                    let marker = startDate.getTime()
                    let date = startDate.yyyymmdd()
                        
                    if(date !== today) {
                        const notif = "Votre message a bien été enregistré pour le " + date 
                        firebase.addNote({documentId: user.displayName, noteId: title, author: user.username, text: note, img: url, status: status, hour: null, markup: marker, userId: user.uid, date: date})
                        firebase.addNotification({documentId: user.displayName, notification: notif})
                        setStartDate(new Date)
                       return setShowModal(false)
                    }else{
                        firebase.addNote({documentId: user.displayName, noteId: title, author: user.username, text: note, img: url, status: status, hour: time, markup: marker, userId: user.uid, date: date})
                        setShowModal(false)
                    }
                    
                }
                  return setUrl(url, uploadTask())})
          }
        )
        }else{
            setNote("")
            setTitle("")
            let marker = startDate.getTime()
            let date = startDate.yyyymmdd()
                
            if(date !== today) {
                const notif = "Votre message a bien été enregistré pour le " + date 
                firebase.addNote({documentId: user.displayName, noteId: title, author: user.username, text: note, img: url, status: status, hour: null, markup: marker, userId: user.uid, date: date})
                firebase.addNotification({documentId: user.displayName, notification: notif})
                setStartDate(new Date)
                return setShowModal(false)
            }else{
                firebase.addNote({documentId: user.displayName, noteId: title, author: user.username, text: note, img: url, status: status, hour: time, markup: marker, userId: user.uid, date: date})
                setShowModal(false)
            }
        }
        
    }

    return(
        <div className="messenger_container">
            <h5 className="font-weight-bolder messenger_title">Note Book</h5>
            <PerfectScrollbar className="perfect-scrollbar">
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
                <img src={Plus} alt="Plus" className="icon-add-note" onClick={handleShow} />
            </OverlayTrigger>
            </PerfectScrollbar>
            
            <Modal show={showModal} 
            size="lg"
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton className="bg-light">
                <Modal.Title id="example-modal-sizes-title-sm" style={{width: "100%"}}>
                    <Input type="text" name="title" placeholder="Donner un titre à la note..." style={{border: "none", width: "100%", color: "black", fontWeight: "100", backgroundColor: "transparent"}} maxLength="60" onChange={handleChangeTitle} required />
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input type="textarea" placeholder="Rédiger une note..." value={note} style={{borderTop: "none", borderLeft: "none", borderRight: "none", height: "10vh", minHeight: "5vh", maxHeight: "15vh"}} onChange={handleChangeNote} required />
                </Modal.Body>
                <Modal.Footer style={{borderTop: "none"}}>
                    <div style={{
                        display: "flex",
                        flexFlow: "row",
                        justifyContent: "flex-end"
                    }}>
                        <span style={{width: "60%", zIndex: "5"}}></span>
                        <input type="file" style={{
                          position: "absolute", 
                          width: "1%", 
                          height: "8vh",
                          zIndex: "2",
                          right: "31%",  
                          opacity: "0", 
                          marginRight: "12vw",
                          cursor: "pointer"}}
                          onChange={handleImgChange} />
                      <img src={Upload} style={{
                          width: "5%",
                          marginRight: "1vw"}} alt="uploadIcon" />
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
                        <img src={Calendar} alt="sendIcon" style={{width: "5%", cursor: "pointer", filter: "drop-shadow(2px 2px 2px)"}} />
                        <img src={Send} alt="sendIcon" style={{width: "5%", cursor: "pointer", borderRadius: "50%", marginLeft: "2vw", filter: "drop-shadow(2px 2px 2px)"}} onClick={handleSubmit} />
                        <List component="nav" aria-label="main mailbox folders" style={{
                            position: "absolute",
                            display: checked ? "flex" : "none",
                            flexFlow: "column",
                            justifyContent: "space-around",
                            alignItems: "center",
                            height: "80%",
                            marginTop: "4vh",
                            marginRight: "15%",
                            width: "6%"
                        }}>
                            <ListItemIcon button>
                                <ListItemIcon>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                    <Tooltip id="title">
                                        defaut
                                    </Tooltip>
                                    }>
                                    <img src={Circle} alt="info" style={{width: "25%", cursor: "pointer", marginRight: "1vw"}} onClick={() => {
                                        setStatus("default")
                                        setChecked(false)}} />
                                </OverlayTrigger>
                                </ListItemIcon>
                            </ListItemIcon>
                            <ListItemIcon button>
                                <ListItemIcon>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                    <Tooltip id="title">
                                        Info
                                    </Tooltip>
                                    }>
                                    <img src={BlueCircle} alt="info" style={{width: "25%", cursor: "pointer", marginRight: "1vw"}} onClick={() => {
                                        setStatus("lightskyblue")
                                        setChecked(false)}} />
                                </OverlayTrigger>
                                </ListItemIcon>
                            </ListItemIcon>
                            <ListItemIcon button>
                                <ListItemIcon>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                    <Tooltip id="title">
                                        Important
                                    </Tooltip>
                                    }>
                                    <img src={YellowCircle} alt="important" style={{width: "25%", cursor: "pointer", marginRight: "1vw"}} onClick={() => {
                                        setStatus('darkgoldenrod')
                                        setChecked(false)}} />
                                </OverlayTrigger>
                                </ListItemIcon>
                            </ListItemIcon>
                            <ListItemIcon button>
                                <ListItemIcon>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                    <Tooltip id="title">
                                        Urgent
                                    </Tooltip>
                                    }>
                                    <img src={RedCircle} alt="urgent" style={{width: "25%", cursor: "pointer", marginRight: "1vw"}} onClick={() => {
                                        setStatus('red')
                                        setChecked(false)}} />
                                </OverlayTrigger>
                                </ListItemIcon>
                            </ListItemIcon>
                        </List>
                    </div>
                </Modal.Footer>
            </Modal>

            <Drawer anchor="bottom" open={activate} onClose={handleHideDrawer}>
                <div>
                    <div><Input type="text" name="title" placeholder="Donner un titre à la note..." style={{border: "none", width: "100%", color: "black", fontWeight: "100", backgroundColor: "transparent"}} maxLength="60" onChange={handleChangeTitle} required /></div>
                    <div><Input type="text" placeholder="Rédiger une note..." value={note} style={{borderTop: "none", borderLeft: "none", borderRight: "none", height: "10vh", minHeight: "5vh", maxHeight: "15vh"}} onChange={handleChangeNote} required /></div>
                </div>
            </Drawer>
            
        </div>
    )
}

export default Messenger