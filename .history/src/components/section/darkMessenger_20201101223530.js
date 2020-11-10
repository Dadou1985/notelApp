import React, {useState, useContext } from 'react'
import { Button, Form, FormGroup, Input, CustomInput, Alert } from 'reactstrap'
import { FirebaseContext } from '../../Firebase'
import NoteBox from './noteBox'
import moment from 'moment'
import DatePicker from "react-datepicker"
import SendIcon from '@material-ui/icons/Send'
import "../css/messenger_datepicker.css"

const DarkMessenger = () =>{

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
        <div>
            <div></div>
        </div>
    )
}

export default DarkMessenger