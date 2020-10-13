import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../Firebase'
import { navigate } from 'gatsby'
import { Navbar, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AdminBoard from './form/adminBoard'
import FeedbackBox from './form/feedbackBox'
import Avatar from 'react-avatar';
import '../css/navigation.css'


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
        <div className="shadow-sm bg-white">
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
                    onClick={handleMove}><p style={{fontFamily: "Charmonman", position: "absolute", top: "1vh", left: "4vw"}}>Izi</p>Shift</Navbar.Brand>
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
                    {!!user &&
                    <Avatar 
                    name={user.username}
                    round={true}
                    size="30"
                    style={{marginRight: "1vw"}}
                    color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                     />}
                    </div>
                    {!!firebase && !!user &&
                    <AdminBoard firebase={firebase} user={user} />}
                    {!!firebase && !!user &&
                    <FeedbackBox firebase={firebase} user={user} />}
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
                        marginRight: "1vw",
                        marginLeft: "1vw"}} onClick={handleShow} />
                    </OverlayTrigger>
                    {!!user && !!user.email &&
                    <div style={{width:"30vw"}}>{user.username || user.email}</div>}
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