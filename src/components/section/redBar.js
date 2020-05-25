import React from 'react'
import RoomAvailable from './form/roomAvailable'
import Rack from './form/rack'


const RedBar = () => {

    return (
        <div style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "center",
            width: "30%",
            marginLeft: "37%"
        }}>
            <RoomAvailable />
            <Rack />
        </div>
    )
}

export default RedBar