import React, { useState } from 'react'
import { Form, Button, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import Feedback from '../../../svg/feedbackBox.svg'

const FeedbackBox = ({user, firebase}) =>{

    const [list, setList] = useState(false)
    const [feedback, setFeedback] = useState("")

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)

    const handleChange = (event) =>{
        setFeedback(event.target.value)
      }

      const handleSubmitFeedback = (event) => {
        event.preventDefault()
        setFeedback("")
        const notif = "La Team Notel vous remercie pour votre contribution !"
        firebase.addNotification({documentId: user.displayName, notification: notif})
        firebase.addFeedback({author: user.username, refHotel: user.displayName, text: feedback}).then(handleClose)
    }

    return(
        <div>
            <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="title">
                Feedback Box
              </Tooltip>
            }>
                <img src={Feedback} className="icon" alt="contact" onClick={handleShow} style={{width: "2vw", marginLeft: "1vw"}} />
            </OverlayTrigger>


            <Modal show={list}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Feedback Box
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
            
                    <div style={{
                            display: "flex",
                            flexFlow: "row wrap",
                            justifyContent: "space-around",
                            padding: "5%",
                            textAlign: "center"
                        }}>
                            <Form.Row>
                                <Form.Group controlId="description">
                                <h4>Pour une meilleur expérience utilisateur</h4>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group controlId="description">
                                <Form.Control as="textarea" type="text" placeholder="Faites-nous un retour de votre expérience..." style={{width: "35vw", height: "30vh"}} value={feedback} name="feedback" onChange={handleChange} />
                                </Form.Group>
                            </Form.Row>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={handleSubmitFeedback}>Enregistrer</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default FeedbackBox