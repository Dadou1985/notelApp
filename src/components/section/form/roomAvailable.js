import React, { useContext, useState} from 'react'
import { Form, FormControl, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import { FirebaseContext } from '../../../Firebase'
import Bed from '../../../svg/rest.svg'


const RoomAvailable = () => {

    const { firebase } = useContext(FirebaseContext)
    const [formValue, setFormValue] = useState({room: "", rac: ""})
    const [list, setList] = useState(false)
    

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
        firebase.updateRoomAvailable({room: formValue.room, rac: formValue.rac}).then(handleClose)
    }

    return (
        <div>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="title">
                Chambre(s) restante(s) et RAC
              </Tooltip>
            }>
              <img src={Bed} className="icon" alt="contact" onClick={handleShow} style={{width: "15%"}} />
            </OverlayTrigger>

            <Modal
                show={list}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title id="contained-modal-title-vcenter">
                Gestion des chambre(s) restante(s) et du RACK
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "space-around",
                  padding: "5%", 
                  textAlign: "center",
                  padding: "2%"
              }}>
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <b>Nombre de chambres restantes :</b>
                <FormControl style={{width: "4vw", height: "5vh", marginLeft: "1%"}}
                  type="number"
                  aria-describedby="basic-addon1"
                  value={formValue.room}
                  name="room"
                  onChange={handleChange}/>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <b>Montant du Rack :</b>
              <FormControl style={{width: "4vw", height: "5vh", marginLeft: "1%"}}
                  type="text"
                  aria-describedby="basic-addon1"
                  value={formValue.rac}
                  name="rac"
                  onChange={handleChange}/>
              </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleSubmit} size="sm">Actualiser</Button>  
            </Modal.Footer>
            </Modal>   
          </div>
    )
}

export default RoomAvailable