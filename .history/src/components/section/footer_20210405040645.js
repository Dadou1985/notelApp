import React, { useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import Notifications from './notifications'

const Footer = () =>{

    return(
        <div className="footer_container">
            <Notifications />
        </div>
    )
}

export default Footer