import React, {useState, useContext } from 'react'
import Board from '../../images/tableau.jpg'
import { FirebaseContext } from '../../Firebase'
import StickList from './stickList'
import PostIt from '../../svg/paper.svg'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import CoolBar from './coolBar'
import '../css/memo.css'

const Memo =()=>{

    const [visible, setVisible] = useState(false)
    const [formValue, setFormValue] = useState({title: "", text: ""})
    const { user, firebase } = useContext(FirebaseContext)

    const showSticker = () => {
        setVisible(true)
      }

    const handleChange = (event) =>{
    event.persist()
    setFormValue(currentValue =>({
        ...currentValue,
        [event.target.name]: event.target.value
    }))
    }
    
    const handleSubmit = (event) => {
        console.log(event)
        const markUp = Date.now()
        firebase.addSticker({title: formValue.title, text: formValue.text, author: user.username, markup: markUp})
        setVisible(false)
        setFormValue({title: "", text: ""})
      }
    
    const handleClose = (event) => {
        console.log(event)
        setVisible(false)
    }

    return(
        
            <div style={{ 
                width: "40vw",
                minHeight: "20vh",
                maxHeight: "80vh",
                backgroundImage: `url(${Board})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                padding: "1%",
                margin: "1%"
            }}>
                <h5 className="font-weight-bolder" style={{textAlign: "center",
                width: "100%",
                height: "7%", 
                padding: "1%"}}>Memo Board</h5>
                <hr/>
                <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="title">
                            Créer un mémo
                          </Tooltip>
                        }>
                <img src={PostIt} className="icon" alt="post-it" style={{
                    width: "4%",
                    position: "absolute",
                    top: "10%",
                    filter: "drop-shadow(10px)"
                }}
                onClick={showSticker} />
                </OverlayTrigger>
                {!!firebase && !!user &&
                <StickList firebase={firebase} user={user.username} />}
                <Modal show={visible}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header className="bg-success">
                        <Modal.Title id="contained-modal-title-vcenter">
                        <input value={formValue.title} name="title" type="text" placeholder="Donner un titre au mémo..." onChange={handleChange} style={{
                            width: "53vw",
                            border: "transparent"
                        }} />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <textarea value={formValue.text} name="text" placeholder="Ecrire un mémo..." onChange={handleChange} style={{
                            width: "53vw",
                            minHeight: "10vh",
                            maxHeight: "20vh",
                            border: "transparent"
                        }}></textarea>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={handleClose}>Fermer</Button>
                        <Button variant="outline-success" onClick={handleSubmit}>Epingler</Button>
                    </Modal.Footer>
                </Modal>
                <CoolBar />
            </div>
    )
}

export default Memo