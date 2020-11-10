import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import Avatar from 'react-avatar'

export default function DarkProfilDetails({firebase, user}) {

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])

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
            color: "lightgray"
        }}>
            <Avatar 
                src="https://besthqwallpapers.com/Uploads/7-5-2018/51482/thumb-super-mario-portrait-cartoon-character-plumber-3d.jpg"
                round={true}
                size="200"
                color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                    />
            <h2>{user.username}</h2>
            <p>{info.hotelName}</p>
            <p><b>Poste:</b> {info.job}</p>
            <p><b>Level:</b> {info.category}</p>
            <p><b>Tips:</b> {info.tips}</p>
            <Form.Row>
                <Form.Group controlId="exampleForm.SelectCustom" style={{
                    textAlign: "center"
                }}>
                <Form.Label>Dans quel <i>mood</i> êtes-vous ?</Form.Label><br/>
                <select class="selectpicker" name="reason" 
                style={{width: "15vw", 
                height: "6vh", 
                border: "1px solid lightgrey", 
                borderRadius: "3px",
                backgroundColor: "white", 
                paddingLeft: "1vw"}}>
                    <option></option>
                    <option>Peinture</option>
                    <option>Plomberie</option>
                    <option>Electricité</option>
                    <option>Ménage</option>
                    <option>Autres</option>
                </select>
            </Form.Group>
            </Form.Row>
            <Button variant="outline-info" style={{marginTop: "2vh"}}>Modifier mon profil</Button>
    </div>
    )
}
