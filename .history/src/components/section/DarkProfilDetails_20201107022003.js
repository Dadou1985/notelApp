import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'

export default function DarkProfilDetails({firebase, user}) {

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziUserOnAir({username: user.username, signal : signal}).onSnapshot(function(snapshot) {
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
