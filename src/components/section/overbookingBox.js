import React, { useContext } from 'react'
import {FirebaseContext} from '../../Firebase'
import Overbooking from './overbooking'


const OverbookingBox = () => {

    const [user, firebase] = useContext(FirebaseContext)

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
            width: "100%",
            padding: "1%", 
            marginBottom: "3%"
          }}>
            <h6 className="text-center">Overbooking Inbox</h6>
            <div style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "start",
            width: "100%",
            height: "35vh",
            padding: "1%",
            border: "1px solid white",
            borderRadius: "2%",
            filter: "drop-shadow(4px 4px 5px black)",
            padding: "3%"
          }}>
              {!!firebase &&
              <Overbooking firebase={firebase} />}
            </div>
        </div>
    )
}

export default OverbookingBox