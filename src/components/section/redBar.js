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
            justifyContent: "space-around",
        }}>
            {!!firebase &&
                <IncomingBooking firebase={firebase} />}
            <RoomAvailable />
        </div>
    )
}

export default RedBar