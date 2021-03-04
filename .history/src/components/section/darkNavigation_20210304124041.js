import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../Firebase'
import { navigate } from 'gatsby'
import { Navbar, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AdminBoard from './form/adminBoard'
import FeedbackBox from './form/feedbackBox'
import Fom from '../../svg/fom.svg'
import ShiftAdvisor from '../../svg/hotel.svg'
import Store from '../../svg/store.svg'
import '../css/navigation.css'


const DarkNavigation = () =>{

    const [list, setList] = useState(false)
    const {firebase, user} = useContext(FirebaseContext)

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)

    const handleIsConnected = (userId) => {
        firebase.userIsConnected({username: userId})
    }
    
    const handleLogout = () =>{
        firebase.logout().then(()=>navigate('/'))
    }

    const handleMove = () => navigate('/izilife')

    return(
        <div className="shadow-sm bg-white">
            <Navbar expand="lg" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "7vh",
                    color: "white",
                    backgroundColor: "black",
                    width: "100"
                }}>
                
                <Navbar.Brand className="darkBrand" style={{color: "orange"}}
                    onClick={handleMove}><p>Izi</p>Life</Navbar.Brand>
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
                    
                    <div className="dark_nav_container">
                    <div className="darkFeatures">
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            Shift Advisor
                          </Tooltip>
                        }>
                        <img src={ShiftAdvisor} alt="ShiftAdvisor" style={{width: "2vw", cursor: "pointer", marginRight: "2vw"}} onClick={()=>navigate('/shiftAdvisor')} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            IziStore
                          </Tooltip>
                        }>
                        <img src={Store} alt="Store" style={{width: "2vw", cursor: "pointer"}} onClick={()=>navigate('/iziStore')} />
                    </OverlayTrigger>
                      </div>
                    <div className="dark_icon_container">
                    {/*!!user &&
                    <Avatar 
                    name={user.username}
                    round={true}
                    size="30"
                    color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                    />*/}
                    {!!firebase && !!user &&
                    <AdminBoard firebase={firebase} user={user} />}
                    {!!firebase && !!user &&
                    <FeedbackBox firebase={firebase} user={user} />}
                    
                    </div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            Changer d'espace
                          </Tooltip>
                        }>
                    <img src={Fom} alt="Fom" style={{width: "7%", marginLeft: "1vw", marginRight: "1vw", filter: "invert()"}} onClick={()=>navigate('/doorsStage')} />
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

export default DarkNavigation