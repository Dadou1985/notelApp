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
                <img src={Fom} alt="Fom" style={{width}} />
            </div>
            <div style={{
                position: "absolute",
                top: "5vh",
                right: "0px",
                backgroundColor: "black",
                width: "50vw",
                height: "90vh",
                borderBottomLeftRadius: "25%",
                borderTopLeftRadius: "25%"
                           }}></div>
        </div>
    )
}
