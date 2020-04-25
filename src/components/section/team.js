import React from 'react'
import Avatar from '../../images/connection.png'
import '../css/team.css'

const Team = () =>{
    return(
        <div style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            width: "15%",
            height: "82vh",
            padding: "1%",
            borderLeft: "1px solid lightgrey",
            borderRight: "1px solid lightgrey",
            margin: "1%",
            borderRadius: "3px"
        }}>
            <div style={{
                display: "flex",
                flexFlow: "column wrap",
                width: "100%",
                height: "83vh",
                alignItems: "flex-start"
            }}>
                <img src={Avatar} alt="avatar" className="avatar" />
                <img src={Avatar} alt="avatar" className="avatar" />
                <img src={Avatar} alt="avatar" className="avatar" />
                <img src={Avatar} alt="avatar" className="avatar" />
                <img src={Avatar} alt="avatar" className="avatar" />
                <img src={Avatar} alt="avatar" className="avatar" />
                <img src={Avatar} alt="avatar" className="avatar" />
                <img src={Avatar} alt="avatar" className="avatar" />
                <img src={Avatar} alt="avatar" className="avatar" />
            </div>
        </div>
    )
}

export default Team