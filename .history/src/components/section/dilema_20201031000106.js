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
                
                <img src={Fom} alt="Fom" style={{width: "10vw"}} />
            </div>
            <div style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "1vh",
                right: "1px",
                backgroundColor: "black",
                width: "50vw",
                height: "98vh",
                borderBottomLeftRadius: "2%",
                borderTopLeftRadius: "2%",
                borderBottomRightRadius: "2%",
                borderTopRightRadius: "2%",
                filter: "drop-shadow(-5px 5px 5px)"
            }}>
                <img src={Fom} alt="Fom" style={{width: "10vw", filter: "invert()"}} />
            </div>
        </div>
    )
}
