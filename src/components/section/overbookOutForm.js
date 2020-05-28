import React, { useState, useContext } from 'react'
import Refused from '../../svg/full.svg'
import Waiting from '../../svg/overOut.svg'
import Accepted from '../../svg/hanger.svg'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FirebaseContext } from '../../Firebase'

const OverbookOutForm = ({hotel, client, markup, night, room, pax, initialPrice, pec, refHotel, status}) => {

    const [visible, setVisible] = useState(false)
    const { firebase } = useContext(FirebaseContext)

    const showSticker = () => {
        setVisible(true)
      }
    
    const removeSticker = (event) => {
        console.log(event)
        firebase.deleteOverbooking({refHotel: refHotel, collection: "overbookOut", document: markup})
        setVisible(false)
      }
    
    const handleClose = (event) => {
        console.log(event)
        setVisible(false)
      }
      
    
    if(status === "granted"){
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
          <img src={Accepted} alt="stick" className="stick" onClick={showSticker} style={{
                width: "90%",
                height: "70%",
                backgroundColor: "green",
                borderRadius: "25%",
                border: "green 5px solid"
            }} />
        </OverlayTrigger>
  
        <Modal show={visible} onClick={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header closeButton className="bg-light">
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Demande de délogement</b>
              <h5> vers {hotel}</h5>
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "start",
          }}>
            <p><b>Nom du client : {client}</b></p>
            <p>Nombre de Chambre(s) : {room}</p>
            <p>Nombre de nuit(s) : {night}</p>
            <p>Pax : {pax}</p>
            <p>Montant initial du séjour : {initialPrice} €</p>
            <p>Prise en charge : {pec}</p>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={removeSticker}>
              Retirer
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      )
    }else if(status === "refused") {
      return(
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
        <img src={Refused} alt="stick" className="stick" onClick={showSticker} style={{
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
        <Modal.Header closeButton className="bg-light">
          <Modal.Title id="contained-modal-title-vcenter">
            <b>Demande de délogement</b>
            <h5>vers {hotel}</h5>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "start",
        }}>
          <p><b>Nom du client : {client}</b></p>
          <p>Nombre de Chambre(s) : {room}</p>
          <p>Nombre de nuit(s) : {night}</p>
          <p>Pax : {pax}</p>
          <p>Montant initial du séjour : {initialPrice} €</p>
          <p>Prise en charge : {pec}</p>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={removeSticker}>
            Retirer
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      ) 
    }else{
        return(
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
          <img src={Waiting} alt="stick" className="stick" onClick={showSticker} style={{
                width: "90%",
                height: "70%",
                backgroundColor: "orange",
                borderRadius: "25%",
                border: "orange 5px solid"
            }} />
        </OverlayTrigger>
    
        <Modal show={visible} onClick={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header closeButton className="bg-light">
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Demande de délogement</b>
              <h5>vers {hotel}</h5>
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "start",
          }}>
            <p><b>Nom du client : {client}</b></p>
            <p>Nombre de Chambre(s) : {room}</p>
            <p>Nombre de nuit(s) : {night}</p>
            <p>Pax : {pax}</p>
            <p>Montant initial du séjour : {initialPrice} €</p>
            <p>Prise en charge : {pec}</p>
          </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="outline-danger" onClick={removeSticker}>
            Retirer
          </Button>
          </Modal.Footer>
        </Modal>
        </div>
        ) 
      }    
}

export default OverbookOutForm