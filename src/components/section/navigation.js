import React, { useContext, useState } from 'react'
import Connection from '../../images/connection.png'
import { FirebaseContext } from '../../Firebase'
import { navigate } from 'gatsby'
import { Navbar, OverlayTrigger, Tooltip, Modal, Button, Tab, Tabs, Form, formValue } from 'react-bootstrap'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import Register from './form/register'
import UserList from './form/userList'
import '../css/navigation.css'


const Navigation = () =>{

    const [list, setList] = useState(false)
    const [tab, setTab] = useState(false)
    const {firebase, user} = useContext(FirebaseContext)

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)

    const handleCloseTab = () => setTab(false)
    const handleShowTab = () => setTab(true)

    const handleLogout = () =>{
        firebase.logout().then(()=>navigate('/'))
    }

    const handleMove = () => navigate('/singlePage')

    console.log({user})

    return(
        <div  className="shadow-sm bg-white">
            <Navbar bg="light" expand="lg" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "7vh"
                }}>
                <Navbar.Brand style={{
                    fontWeight: "bolder",
                    fontSize: "1.5em",
                    marginLeft: "5%",
                    textDecoration: "none",
                    color: "black",
                    cursor: "pointer"
                    }}
                    onClick={handleMove}>Notel</Navbar.Brand>
                    {/*{!!user &&
                    <div style={{
                        display: "flex",
                        width: "50%",
                        height: "5vh",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bolder",
                        fontSize: "XXL"
                    }}>{user.displayName}</div>}*/}
                    <div style={{
                        display: "flex",
                        flexFlow: "row",
                        width: "25%",
                        height: "5vh",
                        justifyContent: "center",
                        alignItems: "center"
                        }}>
                    <div style={{
                        fontSize: "small"
                    }}>
                    </div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            Administrateur
                          </Tooltip>
                        }>
                    <img src={Connection} alt="connect" style={{
                        width: "8%",
                        cursor: "pointer",
                        marginRight: "1vw"}} onClick={handleShowTab} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            Déconnection
                          </Tooltip>
                        }>
                    <PowerSettingsNewIcon alt="connect" style={{
                        width: "10%",
                        cursor: "pointer",
                        marginRight: "1vw"}} onClick={handleShow} />
                    </OverlayTrigger>
                    {!!user && !!user.email &&
                    <div>{user.username || user.email}</div>}
                </div>
            </Navbar>
            <Modal show={list} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Voulez-vous quitter l'application ?
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="danger" onClick={handleLogout}>Quitter</Button>
                </Modal.Body>
            </Modal>
            <Modal show={tab}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleCloseTab}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Interface Administrateur
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    <Tabs defaultActiveKey="Créer" id="uncontrolled-tab-example">
                            <Tab eventKey="Créer" title="Créer un utilisateur">
                                {!!firebase&&
                                <Register firebase={firebase} hide={handleCloseTab} />}     
                            </Tab>
                            <Tab eventKey="Supprimer" title="Supprimer un utilisateur">
                                {!!firebase && !!user &&
                                <UserList firebase={firebase} user={user} />}
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default Navigation