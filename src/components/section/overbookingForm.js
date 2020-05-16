import React, { useState, useContext } from 'react'
import Stick from '../../svg/support.svg'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FirebaseContext } from '../../Firebase'

const OverbookingForm = ({hotel, client, markup, night, room, pax, pec}) => {

    const [visible, setVisible] = useState(false)
    const { firebase } = useContext(FirebaseContext)

    const showSticker = () => {
        setVisible(true)
      }
    
    const removeSticker = (event) => {
        console.log(event)
        firebase.deleteDocument({collection: "redPhone", document: markup})
        setVisible(false)
      }
    
    const handleClose = (event) => {
        console.log(event)
        setVisible(false)
      }
      
    return (
      <div style={{
          width: "12%",
          height: "10vh",
          marginRight: "1vw"
      }}>
      <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="intitulé">
          <h5>{hotel}</h5>
          <h6>{room} chambre(s)</h6>
          <h6>{night} nuit(s)</h6>
        </Tooltip>
      }>
        <img src={Stick} alt="stick" className="stick" onClick={showSticker} style={{
              width: "90%",
              height: "70%",
              backgroundColor: "red",
              borderRadius: "25%",
              border: "red 5px solid"
          }} />
      </OverlayTrigger>

      <Modal show={visible} onClick={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="text-center">{hotel}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "start",
          textAlign: "center"
        }}>
          <h6>Nom du client : {client}</h6><br/>
          <p>Nombre de Chambre(s) : {room}</p>
          <p>Nombre de nuit(s) : {night}</p>
          <p>Pax : {pax}</p>
          Prise en charge : {pec}
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={removeSticker}>
            Refuser
          </Button>
          <Button variant="success" onClick={handleClose}>
            Accepter
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}

export default OverbookingForm