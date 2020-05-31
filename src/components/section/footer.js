import React, { useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import Notifications from './notifications'

const Footer = () =>{

    const {user,firebase} = useContext(FirebaseContext)

    return(
        <div style={{
            display: "flex",
            width: "100%",
            height: "7%",
            justifyContent: "center",
            position: "absolute",
            bottom: "0px",
            left: "0px",
            backgroundColor: "lightgrey"
        }}>
            {!!firebase && !!user &&
            <Notifications firebase={firebase} user={user} />}
        </div>
    )
}

export default Footer