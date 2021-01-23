import React, { useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import Notifications from './notifications'

const DarkFooter = () =>{

    const {user,firebase} = useContext(FirebaseContext)

    return(
        <div className="footer_container boomSkakalaka">
            {!!firebase && !!user &&
            <Notifications firebase={firebase} user={user} />}
        </div>
    )
}

export default DarkFooter