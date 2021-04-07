import React, {useContext} from 'react'
import Notifications from './notifications'
import { FirebaseContext, db, auth } from '../../Firebase'

const Footer = () =>{

    return(
        <div className="footer_container">
            <Notifications />
        </div>
    )
}

export default Footer