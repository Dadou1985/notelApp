import React, {useState, useEffect } from 'react'
import { Form, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import HouseKeeping from '../../../svg/maid.svg'

const Maid = ({user, firebase}) =>{

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])
    const [formValue, setFormValue] = useState({client: "", details: "", initiale: "", finale: "", motif: "", etat: ""})

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
        firebase.addMaid({author: user.username, from: formValue.initiale, client: formValue.client, markup: marker, date: time, to: formValue.finale, motive: formValue.motif, details: formValue.details, state: formValue.etat}).then(handleClose)
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.toolOnAir({collection: "maid", signal : signal}).onSnapshot(function(snapshot) {
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
           
     },[])

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
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Délogement client
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    <Tabs defaultActiveKey="Déloger un client" id="uncontrolled-tab-example">
                            <Tab eventKey="Déloger un client" title="Déloger un client">
                            <div style={{
                                    display: "flex",
                                    flexFlow: "row wrap",
                                    justifyContent: "space-around",
                                    padding: "5%",
                                    textAlign: "center",
                                }}>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Nom du client</Form.Label>
                                        <Form.Control type="text" placeholder="ex: Jane Doe" style={{width: "35vw"}} value={formValue.client} name="client" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Depuis la chambre...</Form.Label>
                                        <Form.Control type="text" placeholder="ex: 310" style={{width: "20vw"}} value={formValue.initiale} name="initiale" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>...vers la chambre</Form.Label>
                                        <Form.Control type="text" placeholder="ex: 409" style={{width: "20vw"}} value={formValue.finale} name="finale" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Pour quel motif ?</Form.Label>
                                        <Form.Control as="select" custom style={{width: "20vw"}} value={formValue.motif} name="motif" onChange={handleChange}>
                                            <option>Peinture</option>
                                            <option>Plomberie</option>
                                            <option>Electricité</option>
                                            <option>Ménage</option>
                                            <option>Autres</option>
                                        </Form.Control>
                                    </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Etat de la chambre</Form.Label>
                                        <Form.Control as="select" custom style={{width: "20vw"}} value={formValue.etat} name="etat" onChange={handleChange}>
                                            <option>Sale</option>
                                            <option>Propre</option>
                                        </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="details">
                                            <Form.Label>Plus de détails</Form.Label>
                                            <Form.Control as="textarea" rows="3" style={{width: "48vw", maxHeight: "15vh"}} value={formValue.details} name="details" onChange={handleChange}  />
                                        </Form.Group>
                                    </Form.Row>
                                </div>
                            </Tab>
                            <Tab eventKey="Liste des délogemnts" title="Liste des délogemnts">
                            <Table striped bordered hover size="sm" className="text-center"  style={{overflowX: "auto",
                                    maxWidth: "90vw"}}>
                                <thead className="bg-dark text-center text-light">
                                    <tr>
                                    <th>#</th>
                                    <th>client</th>
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
                                        <td></td>
                                        <td>{flow.client}</td>
                                        <td>{flow.from}</td>
                                        <td>{flow.to}</td>
                                        <td>{flow.motive}</td>
                                        <td>{flow.state}</td>
                                        <td>{flow.details}</td>
                                        <td>{flow.date}</td>
                                        <td>{flow.author}</td>
                                        <td className="bg-dark"><Button variant="outline-danger" size="sm" onClick={()=>firebase.deleteDocument({collection: "maid", document: flow.id})}>Supprimer</Button></td>
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