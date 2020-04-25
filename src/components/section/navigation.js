import React, { useContext } from 'react'
import { Navbar } from 'react-bootstrap'
import Connection from '../../images/connection.png'
import { FirebaseContext } from '../../Firebase'
import { navigate } from 'gatsby'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'


const Navigation = () =>{

    const {firebase, user} = useContext(FirebaseContext)
    const handleLogout = () =>{
        firebase.logout().then(()=>navigate('/'))
    }

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
                    color: "black"
                    }}>Notel</Navbar.Brand>
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
                        placement="right"
                        overlay={
                          <Tooltip id="title">
                            Déconnection
                          </Tooltip>
                        }>
                    <img src={Connection} alt="connect" style={{
                        width: "10%",
                        cursor: "pointer",
                        marginLeft: "1vw"}} onClick={handleLogout} />
                    </OverlayTrigger>
                </div>
            </Navbar>
        </div>
    )
}

export default Navigation