import React, {useState, useEffect } from 'react'
import { Form, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import HouseKeeping from '../../../svg/maid.svg'




const Maid = ({user, firebase}) =>{

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])
    const [formValue, setFormValue] = useState({client: "", details: "", fromRoom: "", toRoom: "", reason: "", state: ""})

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
        firebase.addMaid({documentId: user.displayName, author: user.username, fromRoom: formValue.fromRoom, client: formValue.client, markup: marker, date: time, toRoom: formValue.toRoom, reason: formValue.reason, details: formValue.details, state: formValue.state}).then(handleClose)
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.toolOnAir({documentId: user.displayName, collection: "maid", signal : signal}).onSnapshot(function(snapshot) {
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
                Délogement
              </Tooltip>
            }>
                <img src={HouseKeeping} className="icon" alt="contact" onClick={handleShow} style={{width: "50%", marginLeft: "20%"}} />
            </OverlayTrigger>


            <Modal show={list}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Délogement client
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    <Tabs defaultActiveKey="Déloger un client" id="uncontrolled-tab-example">
                            <Tab eventKey="Déloger un client" title="Déloger un client">
                            <div style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    padding: "5%",
                                    textAlign: "center",
                                }}>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Nom du client</Form.Label>
                                        <Form.Control type="text" placeholder="ex: Jane Doe" style={{width: "20vw"}} value={formValue.client} name="client" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        justifyContent: "space-around"
                                    }}>
                                        <Form.Group controlId="description">
                                        <Form.Label>Depuis la chambre...</Form.Label>
                                        <Form.Control type="text" placeholder="ex: 310" style={{width: "20%"}} value={formValue.fromRoom} name="fromRoom" onChange={handleChange} />
                                        </Form.Group>
                                    
                                        <Form.Group controlId="description">
                                        <Form.Label>...vers la chambre</Form.Label>
                                        <Form.Control type="text" placeholder="ex: 409" style={{width: "20vw"}} value={formValue.toRoom} name="toRoom" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Pour quel motif ?</Form.Label><br/>
                                        <select class="selectpicker" value={formValue.reason} name="reason" onChange={handleChange} 
                                        style={{width: "20vw", 
                                        height: "6vh", 
                                        border: "1px solid lightgrey", 
                                        borderRadius: "3px",
                                        backgroundColor: "white", 
                                        paddingLeft: "1vw"}}>
                                            <option></option>
                                            <option>Peinture</option>
                                            <option>Plomberie</option>
                                            <option>Electricité</option>
                                            <option>Ménage</option>
                                            <option>Autres</option>
                                        </select>
                                    </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Etat de la chambre</Form.Label><br/>
                                        <select class="selectpicker" value={formValue.state} name="state" onChange={handleChange} 
                                        style={{width: "20vw", 
                                        height: "6vh", 
                                        border: "1px solid lightgrey", 
                                        borderRadius: "3px",
                                        backgroundColor: "white", 
                                        paddingLeft: "1vw"}}>
                                            <option></option>
                                            <option>Sale</option>
                                            <option>Propre</option>
                                        </select>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="details">
                                            <Form.Label>Plus de détails</Form.Label>
                                            <Form.Control as="textarea" rows="3" style={{width: "20vw", maxHeight: "15vh"}} value={formValue.details} name="details" onChange={handleChange}  />
                                        </Form.Group>
                                    </Form.Row>
                                </div>
                            </Tab>
                            <Tab eventKey="Liste des délogements" title="Liste des délogements">
                            <Table striped bordered hover size="sm" className="text-center"  style={{overflowX: "auto",
                                    maxWidth: "90vw"}}>
                                <thead className="bg-dark text-center text-light">
                                    <tr>
                                    <th>Client</th>
                                    <th>Ch. initiale</th>
                                    <th>Ch. finale</th>
                                    <th>Motif</th>
                                    <th>Etat</th>
                                    <th>Details</th>
                                    <td>Date</td>
                                    <th>Collaborateur</th>
                                    <th className="bg-dark"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {info.map(flow =>(
                                        <tr key={flow.id}>
                                        <td>{flow.client}</td>
                                        <td>{flow.fromRoom}</td>
                                        <td>{flow.toRoom}</td>
                                        <td>{flow.reason}</td>
                                        <td>{flow.state}</td>
                                        <td>{flow.details}</td>
                                        <td>{flow.date}</td>
                                        <td>{flow.author}</td>
                                        <td className="bg-dark"><Button variant="outline-danger" size="sm" onClick={()=>firebase.deleteDocument({documentId: user.displayName, collection: "maid", document: flow.id})}>Supprimer</Button></td>
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

export default Maid