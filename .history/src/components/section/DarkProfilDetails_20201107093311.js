import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'

export default function DarkProfilDetails({firebase, user}) {

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        let name = user.username
        let details = firebase.firestore().collection("iziUsers").doc(`${name}`)

        details.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
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
        <div>
            {info.map(flow =>(
                <div>
                    <h2>{flow.id}</h2>
                    <p>{flow.hotelName}</p>
                    <div>
                        <span>Poste: {flow.job}</span>
                        <span>Level: {flow.category}</span>
                    </div>
                    <p>Tips: {flow.tips}</p>
                    <Form.Row>
                        <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Pour quel motif ?</Form.Label><br/>
                        <select class="selectpicker" name="reason" 
                        style={{width: "20vw", 
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
                </div>
            ))}
        </div>
    )
}
