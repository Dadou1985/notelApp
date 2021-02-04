import React, {useState, useContext, useEffect } from 'react'
import Fom from '../../svg/fom.svg'
import { navigate } from 'gatsby'
import { FirebaseContext } from '../../Firebase'
import { sha256, sha224 } from 'js-sha256';
import { Form, Button, Table, Tabs, Tab, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'



const Dilema = () => {

    const {user, firebase} = useContext(FirebaseContext)
    const [showModal, setShowModal] = useState(false)
    const [createRefSpace, setCreateRefSpace] = useState("")
    const [joinRefSpace, setJoinRefSpace] = useState("")


    const handleWorkspace = () => {
        if(!user.displayName) {
            setShowModal(true)
        }else{
            navigate('/singlePage')
        }
    }

    const handleChangeCreate = event =>{
        setCreateRefSpace(event.currentTarget.value)
    }

    const handleChangeJoin = event =>{
        setJoinRefSpace(event.currentTarget.value)
    }

    const handleCreateSpaceSubmit = () => {
        setc("")
        firebase.adminWorkspaceRegister({email: user.email, password: user.password, userId: user.uid, refSpace: sha224(createRefSpace)})
        .then(() => navigate('/singlePage'))
    }

    const handleJoinSpaceSubmit = () => {
        setRefSpace("")
        firebase.workspaceRegister({email: user.email, password: user.password, userId: user.uid, refSpace: joinRefSpace})
        .then(() => navigate('/singlePage'))
    }  

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)
    
    console.log(sha224('mon espace perso'))

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
                    onClick={handleWorkspace}>
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
        <Modal show={showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Work Space
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    <Tabs defaultActiveKey="Créer" id="uncontrolled-tab-example">
                            <Tab eventKey="Créer" title="Créer un espace de travail">
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
                                        width: "100%"
                                    }}>
                                        <Form.Group controlId="description">
                                        <Form.Control type="text" placeholder="Donner un nom à votre espace de travail..." style={{width: "25vw"}} value={createRefSpace} name="refSpace" onChange={handleChangeCreate} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="outline-success" onClick={handleCreateSpaceSubmit}>Créer l'espace</Button>
                                </div>
                            </Tab>
                            <Tab eventKey="Rejoindre" title="Rejoindre un espace de travail">
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
                                        <Form.Control type="text" placeholder="Entrer le nom de votre espace de travail" style={{width: "20vw"}} value={joinRefSpace} name="refSpace" onChange={handleChangeJoin} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="outline-success" onClick={handleJoinSpaceSubmit}>Rejoindre l'espace'</Button>
                                </div>
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default Dilema