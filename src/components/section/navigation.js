import React, { useContext, useState } from 'react'
import { Navbar } from 'react-bootstrap'
import Connection from '../../images/connection.png'
import Notification from '../../svg/bell.svg'
import { FirebaseContext } from '../../Firebase'
import { navigate } from 'gatsby'
import { OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap'
import { Badge } from 'antd'


const Navigation = () =>{

    const [list, setList] = useState(false)
    const {firebase, user} = useContext(FirebaseContext)

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)

    const handleLogout = () =>{
        firebase.logout().then(()=>navigate('/'))
    }

    const handleMove = () => navigate('/singlePage')

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
                        {!!user && !!user.email &&
                    <div>{user.username || user.email}</div>}
                    </div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            Déconnection
                          </Tooltip>
                        }>
                    <img src={Connection} alt="connect" style={{
                        width: "10%",
                        cursor: "pointer",
                        marginLeft: "1vw"}} onClick={handleShow} />
                    </OverlayTrigger>
                    
                    <Badge>
                        <img src={Notification} alt="connect" style={{
                            width: "15%",
                            cursor: "pointer",
                            marginLeft: "1vw"}} onClick={handleShow} />
                    </Badge>
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
        </div>
    )
}

export default Navigation