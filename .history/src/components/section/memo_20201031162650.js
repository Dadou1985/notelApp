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
        firebase.addSticker({documentId: user.displayName, title: formValue.title, text: formValue.text, author: user.username, markup: markUp})
        setVisible(false)
        setFormValue({title: "", text: ""})
      }
    
    const handleClose = (event) => {
        console.log(event)
        setVisible(false)
    }

    return(
        
            <div className="memo_container">
               <h5 className="font-weight-bolder" className="memo_title">Memo Board</h5>
                <hr/>
                <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="title">
                            Créer un mémo
                          </Tooltip>
                        }>
                <img src={PostIt} className="icon" alt="post-it" className="sticker_img"
                onClick={showSticker} />
                </OverlayTrigger>
                {!!firebase && !!user &&
                <StickList firebase={firebase} user={user} />}
                <Modal show={visible}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        <input value={formValue.title} name="title" type="text" placeholder="Donner un titre au mémo..." onChange={handleChange} 
                        className="memo_modalTitle_input" />
                        <select class="selectpicker" value={formValue.model} name="model" onChange={handleChange} 
                        style={{width: "20vw", 
                        height: "6vh", 
                        border: "1px solid lightgrey", 
                        borderRadius: "3px",
                        backgroundColor: "white", 
                        paddingLeft: "1vw"}}>
                            <option></option>
                            <option>Berline</option>
                            <option>Van</option>
                        </select>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <textarea value={formValue.text} name="text" placeholder="Ecrire un mémo..." onChange={handleChange} 
                        className="memo_modalBody_textarea"></textarea>
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