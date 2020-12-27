import React, { useState, useEffect } from 'react'
import { Form, Button, Input, FormGroup } from 'reactstrap'
import Message from './messageCommunizi'
import { ScrollPanel } from 'primereact/scrollpanel';

export default function CommunIzi({firebase, user}) {
    
    const [info, setInfo] = useState([])
    const [note, setNote] = useState('')
    const [startDate, setStartDate] = useState(new Date())

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
        let date = startDate.yyyymmdd()
        firebase.addIziMessage({author: user.username, text: note, hour: time, userId: user.uid, date: date})

    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziLifeOnAir({collection: "communIzi", signal : signal}).onSnapshot(function(snapshot) {
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

    return (
        <div style={{width: "90%"}}>
            <ScrollPanel>
                <div id="box" className="dark_messenger_notebox">
                {info.map(flow => (
                    <Message
                    author={flow.author}
                    text={flow.text}
                    markup={flow.markup}
                    date={flow.date}
                    hour={flow.hour}
                    userRef={flow.userId}
                     />
                ))}
            </div>
            </ScrollPanel>
            <div>
                <Form inline className="dark_messenger_form"
                onSubmit={handleSubmit}>
                <FormGroup  className="dark_messenger_form_input_container"> 
                    <Input type="textarea" name="text" placeholder="Ecrire une note..."  
                    value={note}
                    onChange={handleChange}
                    id="dark_message_note" />
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
    )
}
