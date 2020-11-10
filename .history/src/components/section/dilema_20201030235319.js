import React from 'react'
import Fom from '../../svg/fom.svg'

export default function Dilema() {
    return (
        <div>
            <div style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "50vw",
                height: "100vh"
            }}>
                <img src={Fom} alt="Fom" style={{width: "10vw", strokeWidth: "white"}} />
            </div>
            <div style={{
                position: "absolute",
                top: "1vh",
                right: "0px",
                backgroundColor: "black",
                width: "50vw",
                height: "98vh",
                borderBottomLeftRadius: "2%",
                borderTopLeftRadius: "5%",
                filter: "drop-shadow(-5px 5px 5px)"
                           }}></div>
        </div>
    )
}
