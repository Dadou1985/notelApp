import React, { useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import Notifications from './notifications'

const Footer = () =>{

    const {user,firebase} = useContext(FirebaseContext)

    return(
        <div className="footer_container">
            <Notifications />}
        </div>
    )
}

export default Footer