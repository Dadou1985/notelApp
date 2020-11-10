import React, {useState, useEffect } from 'react'
import Avatar from 'react-avatar'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'



const CreateSticker = ({user, firebase}) => {

    const [info, setInfo] = useState([])
    const [visible, setVisible] = useState(false)
    const [formValue, setFormValue] = useState({title: "", text: "", assignee: null})


    useEffect(() => {
        let unsubscribe
        
                unsubscribe = firebase.toolOnAir({documentId: user.displayName, collection: "users"}).onSnapshot(function(snapshot) {
                    const snapUsers = []
                  snapshot.forEach(function(doc) {          
                    snapUsers.push({
                        id: doc.id,
                        ...doc.data()
                      })        
                    })
                    console.log(snapUsers)
                    setInfo(snapUsers)
                });
                return () => {
                    if(unsubscribe){
                        unsubscribe()
                    }
                }
           
     },[])
    return (
            <div>
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

            <Modal show={visible}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header className="bg-light">
                <Modal.Title id="contained-modal-title-vcenter">
                <input value={formValue.title} name="title" type="text" placeholder="Donner un titre au mémo..." onChange={handleChange} 
                className="memo_modalTitle_input" />
                <select class="selectpicker" value={formValue.assignee} name="model" onChange={handleChange} 
                    style={{width: "5vw", 
                    height: "6vh", 
                    border: "1px solid lightgrey", 
                    borderRadius: "3px",
                    backgroundColor: "white", 
                    paddingLeft: "1vw"}}>
                        <option></option>
                        {info.map(flow => (
                            <option value={flow.id}>
                                <Avatar 
                                    name={flow.id}
                                    round={true}
                                    size="30"
                                    color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                                    />
                            </option> 
                        ))}
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
            </div>
    )
}

export default CreateSticker