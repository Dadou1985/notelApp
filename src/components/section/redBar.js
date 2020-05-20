import React, { useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import RoomAvailable from './form/roomAvailable'
import IncomingBooking from './form/redPhoneIncoming'


const RedBar = () => {

    const { user, firebase } = useContext(FirebaseContext)

    return (
        <div style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "center",
        }}>
            <RoomAvailable />
            {!!firebase &&
                <IncomingBooking firebase={firebase} />}
        </div>
    )
}

export default RedBar