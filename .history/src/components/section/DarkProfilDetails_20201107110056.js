import React, { useState, useEffect } from 'react'
import { Form, Form Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import Avatar from 'react-avatar'

export default function DarkProfilDetails({firebase, user}) {

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])

    const handleChange = (event) =>{
        event.persist()
        setFormValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
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
            <p><b>Poste: </b>{info.job}</p>
            <p><b>Level: </b>{info.category}</p>
            <p><b>Mood: </b>{info.mood}</p>
            <p><b>Tips: </b>{info.tips}</p>
            
            <Button variant="outline-info" style={{marginTop: "2vh"}}>Modifier mon profil</Button>
            <Modal.Body>
            <div className="register_modal_container">
                <Form.Group controlId="formGroupName" className="register_input">
                    <Form.Control value={formValue.username} name="username" type="text" placeholder="Entrer votre prénom et votre nom" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupEmail" className="register_input">
                    <Form.Control value={formValue.email} name="email" type="email" placeholder="Entrer un e-mail" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupPassword" className="register_input">
                    <Form.Control value={formValue.password} name="password" type="password" placeholder="Entrer un mot de passe" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupConfPassword" className="register_input">
                    <Form.Control value={formValue.confPassword} name="confPassword" type="password" placeholder="Confirmer le mot de passe" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupRefHotel" className="register_input">
                    <Form.Control value={formValue.refHotel} name="refHotel" type="text" placeholder="Référence Hôtel" onChange={handleChange} required />
                </Form.Group>
                {!!errorMessage && <div id="wrongConf">{errorMessage}</div>}
                {!!messageError && <div id="uncompleteRegistration">{messageError}</div>}
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success">Modifier</Button>
            </Modal.Footer>
    </div>
    )
}
