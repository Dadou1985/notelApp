import React, {useState, useContext, useEffect } from 'react'
import Fom from '../../svg/fom.svg'
import { navigate } from 'gatsby'
import { sha256, sha224 } from 'js-sha256';
import { Form, Button, Table, Tabs, Tab, OverlayTrigger, Modal } from 'react-bootstrap'
import { Input } from 'reactstrap'
import Portrait from '../../svg/photoId.jpg'




const Dilema = ({user, firebase}) => {

    const [showModal, setShowModal] = useState(false)
    const [createRefSpace, setCreateRefSpace] = useState("")
    const [joinRefSpace, setJoinRefSpace] = useState("")
    const [info, setInfo] = useState([])


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
        setCreateRefSpace('')
        firebase.adminWorkspaceRegister({email: user.email, username: user.username, userId: user.uid, refSpace: sha224(createRefSpace)})
    }

    const handleJoinSpaceSubmit = () => {
        setJoinRefSpace("")
        firebase.workspaceRegister({email: user.email, username: user.username, userId: user.uid, refSpace: joinRefSpace})
    }  

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziUserOnAir2({userId: user.uid, signal : signal}).onSnapshot(function(snapshot) {
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
     },[firebase, user.email])
    
    console.log(user)

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "2%",
            height: "100vh",
            backgroundImage: `url(${"https://i.pinimg.com/originals/cb/59/ff/cb59ffb54f7bcca4dbbc1517a65c1f01.jpg"})`,
            backgroundSize: "contain",
            backgroundRepeat: 'no-repeat'
        }}>
            {info.map(flow => (
                <div style={{
                    display: 'flex',
                    flexFlow: "column",
                    width: '60%'
                }}>
                    <h1><b>{flow.id}</b></h1>
                    <div>
                        
                    </div>
                </div>
            ))}
            <h2 style={{width: "60%", textAlign: "center"}}>Choisissez votre espace</h2>
            <div style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-around",
            width: "60%",
            border: "1px solid black"}}>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20vw",
                    height: "40vh",
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
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20vw",
                    height: "40vh",
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
                    <img src={Fom} alt="Fom" style={{width: "10vw", filter: "invert() drop-shadow(-1px 1px 1px)", opacity: "0.7"}} />
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
                                        width: "100%",
                                        marginBottom: "2vh"
                                    }}>
                                        <Input type="text" placeholder="Donner un nom à votre espace de travail..." style={{width: "25vw", border: "none", borderBottom: "1px solid lightgrey", textAlign: "center"}} value={createRefSpace} name="createRefSpace" onChange={handleChangeCreate} />
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
                                        width: "70%",
                                        marginBottom: "2vh"
                                    }}>
                                        <Input type="text" placeholder="Entrer le nom de votre espace de travail" style={{width: "20vw", border: "none", borderBottom: "1px solid lightgrey", textAlign: "center"}} value={joinRefSpace} name="joinRefSpace" onChange={handleChangeJoin} />
                                    </Form.Row>
                                    <Button variant="outline-success" onClick={handleJoinSpaceSubmit}>Rejoindre l'espace</Button>
                                </div>
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default Dilema