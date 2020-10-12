import React, {useState, useContext } from 'react'
import { Button, Form, FormGroup, Input, CustomInput, Alert } from 'reactstrap'
import { FirebaseContext } from '../../Firebase'
import NoteBox from './noteBox'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "../css/messenger_datepicker.css"

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
        <div
         style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
            padding: "1%",
            height: "100%",
            width: "52%"
        }}>
            <h5 className="font-weight-bolder" style={{textAlign: "center",
            borderRadius: "3%",
            backgroundColor: "lightgrey",
            height: "3%", 
            padding: "1%"
            }}>Note Book</h5>
            <div id="box" style={{
                maxHeight: "45vh",
                overflow: "auto",
                marginBottom: "2vh"
                }}>
                    {!!firebase && !!user &&
                    <NoteBox firebase={firebase} user={user} />}
            </div>
            <div>
            <Form inline style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "flex-start"}}
            onSubmit={handleSubmit}>
            <FormGroup  style={{
                    width: "100%",
                    marginBottom: "1%"
                }}> 
                <Input type="textarea" name="text" id="message" placeholder="Ecrire une note..."  style={{
                    width: "100%",
                    minHeight: "10vh",
                    maxHeight: "10vh",
                    resize: "none"
                }} 
                value={note}
                onChange={handleChange} />
            </FormGroup>
            {/*<FormGroup  style={{
                    width: "100%",
                    marginBottom: "1%",
                    display: "flex",
                    justifyContent: "center"
                }}>
                <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
            </FormGroup>*/}
            <div style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
            }}>
                <Button color="success" block style={{width: "70%", height: "6vh"}} id="noteButton">Noter</Button>
                <DatePicker
                classname="react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input"
                selected={startDate}
                value={startDate}
                onChange={changedDate => setStartDate(changedDate)}
                placeholderText="Date du jour"
                locale="fr-FR"
                dateFormat="d MMMM yyyy"
                />
            </div>
        </Form>
            </div>
        </div>
    )
}

export default Messenger