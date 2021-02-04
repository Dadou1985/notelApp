import React, {useState, useContext, useEffect } from 'react'
import Fom from '../../svg/fom.svg'
import { navigate } from 'gatsby'
import { FirebaseContext } from '../../Firebase'
import { sha256, sha224 } from 'js-sha256';
import { Form, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'



const Dilema = () => {

    const {user, firebase} = useContext(FirebaseContext)
    const [showModal, setShowModal] = useState(false)
    const [refSpace, setRefSpace] = useState("")

    const handleWorkspace = () => {
        if(!user.displayName) {
            setShowModal(true)
        }else{
            navigate('/singlePage')
        }
    }

    const handleCreateSpaceSubmit = () => {
        setRefSpace("")
        firebase.adminWorkspaceRegister({email: user.email, password: user.password, userId: user.uid, refSpace: sha224(refSpace)})
        .then(() => navigate('/singlePage'))
    }

    const handleJoinSpaceSubmit = () => {
        setRefSpace("")
        firebase.workspaceRegister({email: user.email, password: user.password, userId: user.uid, refSpace: refSpace})
        .then(() => navigate('/singlePage'))
    }    

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            height: "100vh"
        }}>
            <h1>Choisissez votre espace</h1>
            <div style={{
            display: "flex",
            flexFlow: "row",
            height: "85vh"}}>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "49vw",
                height: "100%"
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25vw",
                    height: "50vh",
                    border: "1px solid lightgrey",
                    borderBottomLeftRadius: "2%",
                    borderTopLeftRadius: "2%",
                    borderBottomRightRadius: "2%",
                    borderTopRightRadius: "2%",
                    filter: "drop-shadow(-5px 5px 5px)",
                    color: "gray",
                    cursor: "pointer"
                    }}
                    onClick={()=>navigate('/singlePage')}>
                <h2>Work Space</h2>
                <h4 style={{color: "darkgoldenrod"}}>Hello, Karen !</h4>
                <img src={Fom} alt="Fom" style={{width: "10vw", filter: "invert()"}} />
                </div>
            </div>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "49vw",
                height: "100%",
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25vw",
                    height: "50vh",
                    borderBottomLeftRadius: "2%",
                    borderTopLeftRadius: "2%",
                    borderBottomRightRadius: "2%",
                    borderTopRightRadius: "2%",
                    filter: "drop-shadow(-5px 5px 5px)",
                    color: "gray",
                    cursor: "pointer"
                }}
                className="boomSkakalaka"
                onClick={()=>navigate('/izilife')}>
                    <h2>Fun Space</h2>
                    <h4 style={{color: "darkred"}}>Hell no, Karen !</h4>
                    <img src={Fom} alt="Fom" style={{width: "10vw", filter: "invert()", filter: "drop-shadow(-1px 1px 1px)", opacity: "0.7"}} />
                </div>
            </div>
        </div>
        <Modal show={list}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Réservation de taxi
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    <Tabs defaultActiveKey="Réserver" id="uncontrolled-tab-example">
                            <Tab eventKey="Réserver" title="Réserver un taxi">
                                <div  style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    padding: "5%",
                                    textAlign: "center"
                                }}>
                                    <Form.Row style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        width: "70%"
                                    }}>
                                        <Form.Group controlId="description">
                                        <Form.Label>Nom du client</Form.Label>
                                        <Form.Control type="text" placeholder="ex: Jane Doe" style={{width: "10vw"}} value={formValue.client} name="client" onChange={handleChange} />
                                        </Form.Group>
                                    </Form.Row>
                                
                                </div>
                            </Tab>
                            <Tab eventKey="Liste des réservations" title="Liste des réservations">
                            <Table striped bordered hover size="sm" className="text-center">
                                <thead className="bg-dark text-center text-light">
                                    <tr>
                                    <th>Client</th>
                                    <th>Chambre</th>
                                    <th>Date</th>
                                    <th>Heure</th>
                                    <th>Passagers</th>
                                    <th>Véhicule</th>
                                    <th>Destination</th>
                                    <th className="bg-dark"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {info.map(flow =>(
                                        <tr key={flow.id}>
                                        <td>{flow.client}</td>
                                        <td>{flow.room}</td>
                                        <td>{flow.date}</td>
                                        <td>{flow.hour}</td>
                                        <td>{flow.pax}</td>
                                        <td>{flow.model}</td>
                                        <td>{flow.destination}</td>
                                        <td className="bg-dark"><Button variant="outline-danger" size="sm" onClick={()=>firebase.deleteDocument({documentId: user.displayName, collection: "cab", document: flow.id})}>Supprimer</Button></td>
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

export default Dilema