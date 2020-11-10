import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../Firebase'
import { navigate } from 'gatsby'
import { Navbar, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AdminBoard from './form/adminBoard'
import FeedbackBox from './form/feedbackBox'
import CallCenter from './CallCenter'
import Avatar from 'react-avatar'
import MenuSharpIcon from '@material-ui/icons/MenuSharp'
import Drawer from './common/drawer'
import Fom from '../../svg/fom.svg'
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
                {!!firebase && !!user &&
                <Drawer className="drawer" firebase={firebase} user={user} />}
                <Navbar.Brand className="brand"
                    onClick={handleMove}><p>Izi</p>Shift</Navbar.Brand>
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
                    <div className="nav_container">
                    <div className="icon_container">
                    {!!user &&
                    <Avatar 
                    name={user.username}
                    round={true}
                    size="30"
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
                            Changer d'espace
                          </Tooltip>
                        }>
                    <img src={Fom} alt="Fom" style={{width: "7%", marginLeft: "1vw"}} />
                    </OverlayTrigger>
                    {!!user && !!user.email &&
                    <div className="username_title">{user.username || user.email}</div>}
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            Déconnection
                          </Tooltip>
                        }>
                    <PowerSettingsNewIcon alt="connect" className="shuttDown_button nav_icons" onClick={handleShow} />
                    </OverlayTrigger>
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