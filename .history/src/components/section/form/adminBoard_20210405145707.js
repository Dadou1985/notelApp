import React, { useState, useEffect } from 'react'
import { Form, Button, Tooltip, OverlayTrigger, Modal, Tab, Tabs } from 'react-bootstrap'
import Connection from '../../../svg/employee.svg'
import AdminRegister from './adminRegister'
import UserList from './userList'
import { FirebaseContext, db, auth } from '../../../Firebase'
import { useContext } from 'react'

const AdminBoard = () =>{

    const [tab, setTab] = useState(false)
    const [adminStatus, setAdminStatus] = useState(false)
    const [user, setUser] = useState(auth.currentUser)

    const { userDB, setUserDB } = useContext(FirebaseContext)

    const handleCloseTab = () => setTab(false)
    const handleShowTab = () => setTab(true)

    useEffect(() => {
        const adminOnAir = () => {
            return this.db.collection('mySweetHotel')
    .doc('country')
    .collection('France')
    .doc('collection')
    .collection('hotel')
    .doc('region')
    .collection(region)
    .doc('departement')
    .collection(departement)
    .doc(`${hotelId}`)
    .collection("users")
    .where("email", "==", email)
        }
        db.adminOnAir({hotelId: userDB.hotelId, region: userDB.hotelRegion, departement: userDB.hotelDept, email: user.email, signal : signal}).onSnapshot(function(snapshot) {
                    const snapInfo = []
                  snapshot.forEach(function(doc) {          
                    snapInfo.push(
                        doc.data().adminStatus
                      )        
                    });
                    console.log(snapInfo)
                    setAdminStatus(snapInfo[0])
                });
                return () => {
                    abortController.abort()
                }
     },[user.displayName, user.email])

     console.log(adminStatus)

    if(adminStatus === true){
        return(
            <div>
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id="title">
                        Administrateur
                        </Tooltip>
                    }>
                <img src={Connection} alt="connect" className="nav_icons" onClick={handleShowTab} />
                </OverlayTrigger>
    
    
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
                        
                        <Tabs defaultActiveKey="Créer" id="uncontrolled-tab-example" style={{display: "flex", flexFlow: "row", justifyContent: "space-around", width: "45%"}}>
                                <Tab eventKey="Créer" title="Créer un utilisateur">
                                    <AdminRegister hide={handleCloseTab} />   
                                </Tab>
                                <Tab eventKey="Supprimer" title="Supprimer un utilisateur">
                                    <UserList />
                                </Tab>
                            </Tabs>
                        </Modal.Body>
                    </Modal>
            </div>
        )
    }else{
        return <></>
    }
    
}

export default AdminBoard