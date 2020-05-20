import React, { useContext } from 'react'
import Overbooking from './overbooking'
import {FirebaseContext} from '../../Firebase'


const OverbookingBox = () => {

    const {firebase} = useContext(FirebaseContext)

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
            width: "100%",
            padding: "1%", 
            marginBottom: "3%"
          }}>
            <h6 className="text-center">Overbooking Board</h6>
            <div style={{
            display: "flex",
            width: "100%",
            flexFlow: "row wrap",
            justifyContent: "center",
            height: "35vh",
            padding: "1%",
            borderRadius: "2%",
            filter: "drop-shadow(4px 4px 5px black)",
            padding: "3%",
            backgroundColor: "white"
          }}>
              {!!firebase &&
              <Overbooking firebase={firebase} />}
            </div>
        </div>
    )
}

export default OverbookingBox