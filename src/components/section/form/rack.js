import React, { useContext, useState} from 'react'
import { FormControl, Button, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import { FirebaseContext } from '../../../Firebase'
import Price from '../../../svg/price.svg'


const Rack = () => {

    const { user, firebase } = useContext(FirebaseContext)
    const [formValue, setFormValue] = useState({rac: ""})
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
        firebase.updateRack({documentId: user.displayName, rac: formValue.rac}).then(handleClose)
    }

    return (
        <div>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="title">
                Rack
              </Tooltip>
            }>
              <img src={Price} alt="contact" className="icon" onClick={handleShow} style={{width: "55%"}} />
            </OverlayTrigger>

            <Modal
                show={list}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title id="contained-modal-title-vcenter">
                Mise à jour du RACK
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

export default Rack