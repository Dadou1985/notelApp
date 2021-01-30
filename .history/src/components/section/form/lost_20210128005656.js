import React, {useState, useEffect } from 'react'
import LostOnes from '../../../svg/lost-items.svg'
import { Form, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import BootstrapInput from '../common/button/selectButton'



const Lost = ({user, firebase}) =>{

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])
    const [formValue, setFormValue] = useState({type: "", place: "", details: "", description: ""})

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
        setFormValue("")
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()
        let time = day + "/" + month + "/" + year
        let marker = Date.now()
        firebase.addLostFound({documentId: user.displayName, author: user.username, date: time, type: formValue.type, markup: marker, place: formValue.place, details: formValue.details, description: formValue.description}).then(handleClose)
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.toolOnAir({documentId: user.displayName, collection: "lostNfound", signal : signal}).onSnapshot(function(snapshot) {
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
           
     },[firebase, user.displayName])

    return(
        <div>
            <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="title">
                Objets trouvés
              </Tooltip>
            }>
                <img src={LostOnes} className="icon" alt="contact" onClick={handleShow} style={{width: "40%", marginLeft: "20%"}} />
            </OverlayTrigger>


            <Modal show={list}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Objets trouvés
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    <Tabs defaultActiveKey="Enregistrer un objet" id="uncontrolled-tab-example">
                            <Tab eventKey="Enregistrer un objet" title="Enregistrer un objet">
                            <div style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    padding: "5%",
                                    textAlign: "center"
                                }}>
                                    <Form.Row>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Quel type d'objet ?</Form.Label><br/>
                                            <select class="selectpicker" value={formValue.type} name="type" onChange={handleChange} 
                                            style={{width: "20vw", 
                                            height: "6vh", 
                                            border: "1px solid lightgrey", 
                                            borderRadius: "3px",
                                            backgroundColor: "white"}}>
                                                <option></option>
                                                <option>High Tech</option>
                                                <option>Documents Officiels</option>
                                                <option>Vêtements</option>
                                                <option>Autres</option>
                                            </select>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Lieu ?</Form.Label><br/>
                                            <select class="selectpicker" value={formValue.place} name="place" onChange={handleChange} 
                                            style={{width: "30vw", 
                                            height: "6vh", 
                                            border: "1px solid lightgrey", 
                                            borderRadius: "3px",
                                            backgroundColor: "white"}}>
                                                <option></option>
                                                <option>Hall</option>
                                                <option>Restaurant</option>
                                                <option>Parking</option>
                                                <option>Toilettes</option>
                                                <option>Etages</option>
                                                <option>Autres</option>
                                            </select>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Description de l'objet</Form.Label>
                                        <Form.Control type="text" placeholder="ex: un i-phone noir" style={{width: "30vw"}} value={formValue.description} name="description" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="details">
                                            <Form.Label>Plus de détails</Form.Label>
                                            <Form.Control as="textarea" rows="3" style={{width: "30vw", maxHeight: "30vh"}} value={formValue.details} name="details" onChange={handleChange}  />
                                        </Form.Group>
                                    </Form.Row>
                                </div>
                            </Tab>
                            <Tab eventKey="Panier d'objets trouvés" title="Panier d'objets trouvés">
                            <Table striped bordered hover size="sm" className="text-center">
                                <thead className="bg-dark text-center text-light">
                                    <tr>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Lieu</th>
                                    <th>Details</th>
                                    <th>Collaborateur</th>
                                    <th className="bg-dark"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {info.map(flow =>(
                                        <tr key={flow.id}>
                                        <td>{flow.type}</td>
                                        <td>{flow.description}</td>
                                        <td>{flow.date}</td>
                                        <td>{flow.place}</td>
                                        <td>{flow.details}</td>
                                        <td>{flow.author}</td>
                                        <td className="bg-dark"><Button variant="outline-danger" size="sm" onClick={()=>firebase.deleteDocument({documentId: user.displayName, collection: "lostNfound", document: flow.id})}>Supprimer</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={handleSubmit}>Enregistrer</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default Lost