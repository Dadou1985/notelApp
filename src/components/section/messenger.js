import React, {useState, useContext, useEffect } from 'react'
import { Button, Form, FormGroup, Input, CustomInput, Alert } from 'reactstrap'
import { FirebaseContext } from '../../Firebase'
import NoteBox from './noteBox'

const Messenger = () =>{

    const [note, setNote] = useState('')
    const { user, firebase } = useContext(FirebaseContext)
    
    const handleChange = event =>{
        setNote(event.currentTarget.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        setNote("")
        let hours = new Date().getHours() + "h"
        let minutes = new Date().getMinutes()
        let time = hours + minutes
        let marker = Date.now()
        firebase.addMessage({author: user.username, text: note, hour: time, mark: marker, ref: user.uid})
    }

    const handleSlide = () => {
            return setTimeout(function(){
                document.getElementById("welcome").style.opacity = 1
                document.getElementById("welcome").style.transition = "opacity 2s"
                setTimeout(() => {
                    document.getElementById("welcome").style.opacity = 0
                    document.getElementById("welcome").style.transition = "opacity 1s"

                }, 10000);
            }, 3000)
    }     

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        handleSlide({signal : signal})
        return () => {
            abortController.abort()
        }
    }, [])

    

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
            {!!user &&
            <Alert variant="info" id="welcome" style={{
                    position: "absolute", 
                    top: "2%", 
                    left: "35%",
                    textAlign: "center",
                    opacity: "0"
                }}>
                    Bonjour {user.username} ! Bienvenue sur la plateforme Notel.
                </Alert>}
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
                    {!!firebase &&
                    <NoteBox firebase={firebase} />}
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
                    maxHeight: "10vh"
                }} 
                value={note}
                onChange={handleChange} />
            </FormGroup>
            <FormGroup  style={{
                    width: "100%",
                    marginBottom: "1%",
                    display: "flex",
                    justifyContent: "center"
                }}>
                <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
            </FormGroup>
            <Button color="outline-success" block style={{height: "6vh"}}>Noter</Button>
        </Form>
            </div>
        </div>
    )
}

export default Messenger