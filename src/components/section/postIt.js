import React, { useState, useContext } from 'react'
import Stick from '../../svg/paper-color.svg'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FirebaseContext } from '../../Firebase'
import  '../css/post-it.css'

const PostIt = ({title, text, markup}) => {

    const [visible, setVisible] = useState(false)
    const { firebase } = useContext(FirebaseContext)

    const showSticker = () => {
        setVisible(true)
      }
    
    const removeSticker = (event) => {
        console.log(event)
        firebase.deleteDocument({collection: "stickers", document: markup})
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
          {title}
        </Tooltip>
      }>
        <img src={Stick} alt="stick" className="stick" onClick={showSticker} style={{
              width: "100%",
              height: "100%"
          }} />
      </OverlayTrigger>
      <Modal show={visible} onClick={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={removeSticker}>
            Jeter
          </Button>
          <Button variant="success" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}

export default PostIt