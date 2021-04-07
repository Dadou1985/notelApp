import React, {useState, useEffect, useContext } from 'react'
import { Form, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import Maintenance from '../../../svg/repair.svg'
import { FirebaseContext, db, auth } from '../../../Firebase'


const Repair = () =>{

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])
    const [formValue, setFormValue] = useState({room: "", client: "", details: "", type: ""})
    const [user, setUser] = useState(auth.currentUser)

    const { userDB, setUserDB } = useContext(FirebaseContext)

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
        db.addMaintenance({hotelId: userDB.hotelId, region: userDB.hotelRegion, departement: userDB.hotelDept, author: user.displayName, room: formValue.room, client: formValue.client, markup: marker, date: time, type: formValue.type, details: formValue.details}).then(handleClose)
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        firebase.toolOnAir({documentId: user.displayName, collection: "maintenance", signal : signal}).onSnapshot(function(snapshot) {
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
                Maintenance
              </Tooltip>
            }>
                <img src={Maintenance} className="icon" alt="contact" onClick={handleShow} style={{width: "40%", marginLeft: "20%"}} />
            </OverlayTrigger>

            <Modal show={list}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Maintenance technique
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    <Tabs defaultActiveKey="Signaler un problème technique" id="uncontrolled-tab-example">
                            <Tab eventKey="Signaler un problème technique" title="Signaler un problème technique">
                            <div style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    padding: "5%",
                                    textAlign: "center"
                                }}>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Nom du client</Form.Label>
                                        <Form.Control type="text" placeholder="ex: Jane Doe" style={{width: "20vw"}} value={formValue.client} name="client" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="description">
                                        <Form.Label>Numéro de chambre</Form.Label>
                                        <Form.Control type="text" placeholder="ex: 409" style={{width: "20vw"}} value={formValue.room} name="room" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Quel type de problème ?</Form.Label><br/>
                                        <select class="selectpicker" value={formValue.type} name="type" onChange={handleChange} 
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
                                        <Form.Group controlId="details">
                                            <Form.Label>Plus de détails</Form.Label>
                                            <Form.Control as="textarea" rows="3" style={{width: "20vw", maxHeight: "15vh"}} value={formValue.details} name="details" onChange={handleChange}  />
                                        </Form.Group>
                                    </Form.Row>
                                </div>
                            </Tab>
                            <Tab eventKey="Liste des problèmes techniques" title="Liste des problèmes techniques">
                            <Table striped bordered hover size="sm" className="text-center">
                                <thead className="bg-dark text-center text-light">
                                    <tr>
                                    <th>Client</th>
                                    <th>Chambre</th>
                                    <th>Catégorie</th>
                                    <th>Détails</th>
                                    <td>Date</td>
                                    <td>Collaborateur</td>
                                    <th className="bg-dark"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {info.map(flow =>(
                                        <tr key={flow.id}>
                                        <td>{flow.client}</td>
                                        <td>{flow.room}</td>
                                        <td>{flow.type}</td>
                                        <td>{flow.details}</td>
                                        <td>{flow.date}</td>
                                        <td>{flow.author}</td>
                                        <td className="bg-dark"><Button variant="outline-danger" size="sm" onClick={()=>firebase.deleteDocument({documentId: user.displayName, collection: "maintenance", document: flow.id})}>Supprimer</Button></td>
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

export default Repair