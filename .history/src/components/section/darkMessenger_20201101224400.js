import React, {useState, useContext } from 'react'
import { Button, Form, FormGroup, Input, CustomInput, Alert } from 'reactstrap'
import { FirebaseContext } from '../../Firebase'
import NoteBox from './noteBox'
import Community from '../../svg/community.svg'
import Karen from '../../svg/karen.svg'
import Mayday from '../../svg/sos.svg'
import ShiftAdvisor from '../../svg/hotel.svg'


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
        <div style={{
            display: "flex",
            flexFlow: "row",
            width: "60vw"
        }}>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "10%"
            }}>
                <img src={Community} alt="Community" />
            </div>
            <div
         className="dark_messenger_container">
            <h5 className="font-weight-bolder dark_messenger_title">Note Book</h5>
            <div id="box" className="dark_messenger_notebox">
                    {!!firebase && !!user &&
                    <NoteBox firebase={firebase} user={user} />}
            </div>
            <div>
            <Form inline className="dark_messenger_form"
            onSubmit={handleSubmit}>
            <FormGroup  className="dark_messenger_form_input_container"> 
                <Input type="textarea" name="text" placeholder="Ecrire une note..."  
                value={note}
                onChange={handleChange}
                id="dark_message" />
            </FormGroup>
            {/*<FormGroup  style={{
                    width: "100%",
                    marginBottom: "1%",
                    display: "flex",
                    justifyContent: "center"
                }}>
                <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
            </FormGroup>*/}
            <div className="dark_messenger_form_footer">
                <Button color="primary" block id="dark_noteButton">Noter</Button>
            </div>
        </Form>
            </div>
        </div>
        </div>
    )
}

export default DarkMessenger