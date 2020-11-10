import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import Avatar from 'react-avatar'

export default function DarkProfilDetails({firebase, user}) {

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])
    const [formValue, setFormValue] = useState({job: "", level: "", mood: ""})

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)

    const handleChange = (event) =>{
        event.persist()
        setFormValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

      const handleSubmit = event => {
        event.preventDefault()
        setFormValue("")
        firebase.updateIziProfile({username: user.username, job: formValue.job, level: formValue.level, mood: formValue.mood}).then(handleClose)
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        let name = user.username
        let details = firebase.getIziUserFields({username: name, signal: signal})

         details.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                let userDetails = doc.data()
                setInfo(userDetails)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
                return () => {
                    abortController.abort()
                }
           
     },[])

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            height: "100%",
            color: "lightgray",
            padding: "3%"
        }}>
            <Avatar 
                src="https://besthqwallpapers.com/Uploads/7-5-2018/51482/thumb-super-mario-portrait-cartoon-character-plumber-3d.jpg"
                round={true}
                size="200"
                color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                    />
            <h2>{user.username}</h2>
            <p><b>{info.hotelName}</b></p>
            <p><b>Casquette: </b>{info.job}</p>
            <p><b>Level: </b>{info.category}</p>
            <p><b>Mood: </b>{info.mood}</p>
            <p><b>Tips: </b>{info.tips}</p>
            
            <Button variant="outline-info" style={{marginTop: "2vh"}} onClick={handleShow}>Modifier mon profil</Button>
            
            <Modal show={list}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Modifier mon profil
                        </Modal.Title>
                    </Modal.Header>
            <Modal.Body>
            <div className="register_modal_container">
            <Form.Row>
                <Form.Group controlId="description">
                <Form.Label>Change de <i>casquette</i></Form.Label><br/>
                <select class="selectpicker" value={formValue.job} name="job" onChange={handleChange} 
                style={{width: "20vw", 
                height: "6vh", 
                border: "1px solid lightgrey", 
                borderRadius: "3px",
                backgroundColor: "white", 
                paddingLeft: "1vw"}}>
                    <option></option>
                    <option>Réceptionniste</option>
                    <option>Chef de Brigade</option>
                    <option>Chef de Réception</option>
                    <option>Assistant de direction</option>
                    <option>Head Manager</option>
                </select>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="description">
                <Form.Label>Change de <i>level</i></Form.Label><br/>
                <select class="selectpicker" value={formValue.level} name="level" onChange={handleChange} 
                style={{width: "20vw", 
                height: "6vh", 
                border: "1px solid lightgrey", 
                borderRadius: "3px",
                backgroundColor: "white", 
                paddingLeft: "1vw"}}>
                    <option></option>
                    <option>Trainee</option>
                    <option>Gentlemen</option>
                    <option>Legendary</option>
                </select>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="description">
                <Form.Label>Dans quel <i>mood</i> êtes-vous ?</Form.Label><br/>
                <select class="selectpicker" value={formValue.mood} name="mood" onChange={handleChange} 
                style={{width: "20vw", 
                height: "6vh", 
                border: "1px solid lightgrey", 
                borderRadius: "3px",
                backgroundColor: "white", 
                paddingLeft: "1vw"}}>
                    <option></option>
                    <option>Sky is the limit</option>
                    <option>Don't f*ck with me !!</option>
                    <option>Feng Shui</option>
                    <option>J-1 avant dépression</option>
                </select>
                </Form.Group>
            </Form.Row>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={handleSubmit}>Modifier</Button>
            </Modal.Footer>
        </Modal>
    </div>
    )
}
