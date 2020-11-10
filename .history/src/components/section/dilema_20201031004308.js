import React from 'react'
import Fom from '../../svg/fom.svg'

export default function Dilema() {
    return (
        <div style={{
            display: "flex",
            flexFlow: "row"}}>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "49vw",
                height: "100vh"
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25vw",
                    height: "50vh",
                    borderBottomLeftRadius: "2%",
                    borderTopLeftRadius: "2%",
                    borderBottomRightRadius: "2%",
                    borderTopRightRadius: "2%",
                    filter: "drop-shadow(-5px 5px 5px)",
                    color: "gray"
                    }}>
                <h4>Hello, Karen !</h4>
                <img src={Fom} alt="Fom" style={{width: "10vw", cursor: "pointer"}} />
                </div>
            </div>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "49vw",
                height: "100vh",
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "black",
                    width: "25vw",
                    height: "50vh",
                    borderBottomLeftRadius: "2%",
                    borderTopLeftRadius: "2%",
                    borderBottomRightRadius: "2%",
                    borderTopRightRadius: "2%",
                    filter: "drop-shadow(-5px 5px 5px)",
                    color: "gray"
                }}>
                    <h4 style={{color: "red"}}>o Karen</h4>
                    <img src={Fom} alt="Fom" style={{width: "10vw", filter: "invert()", cursor: "pointer"}} />
                </div>
            </div>
        </div>
    )
}
