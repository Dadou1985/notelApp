import React, {useState, useEffect} from 'react'
import {Form} from 'react-bootstrap'
import PostIt from '../postIt'


const Filter = () => {

    const [info, setInfo] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
            firebase.filterOnAir({signal : signal}).onSnapshot(function(snapshot) {
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
    },[firebase])

    return (
        <>
        {info.map(flow => (
            <div style={{display: "flex"}}>
            <Form.Row>
            <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label className="text-center" style={{width: "12vw"}}>Zone géographique</Form.Label>
            <Form.Control as="select" custom style={{width: "12vw", filter: "drop-shadow(2px 2px 5px black)"}}>
                <option>{flow.city}</option>
                <option>Département</option>
                <option>Région</option>
            </Form.Control>
            </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label className="text-center" style={{width: "12vw"}}>Etoiles</Form.Label>
        <Form.Control as="select" custom style={{width: "12vw", filter: "drop-shadow(2px 2px 5px black)"}}>
            <option>Toutes étoiles</option>
            <option>1 étoile</option>
            <option>2 étoiles</option>
            <option>3 étoiles</option>
            <option>4 étoiles</option>
            <option>5 étoiles</option>
        </Form.Control>
        </Form.Group>
    </Form.Row></div>
        ))}
    </>
    )
}

export default Filter