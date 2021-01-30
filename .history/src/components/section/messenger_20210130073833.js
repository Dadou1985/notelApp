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


const Messenger = () =>{

    const [note, setNote] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const { user, firebase } = useContext(FirebaseContext)
    
    const handleChange = event =>{
        setNote(event.currentTarget.value)
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
                <div id="box" className="messenger_notebox">
                    {!!firebase && !!user &&
                    <NoteBox firebase={firebase} user={user} />}
                </div>
            </PerfectScrollbar>
            <div style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                marginTop: "2vh",
                paddingLeft: "5vw",
                borderBott
            }}>
                <img src={Plus} alt="Plus" style={{width: "2%", cursor: "pointer", marginRight: "1vw"}} />
                Ajouter une note...
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
        </div>
    )
}

export default Messenger