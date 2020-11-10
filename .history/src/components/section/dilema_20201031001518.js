import React from 'react'
import Fom from '../../svg/fom.svg'

export default function Dilema() {
    return (
        <div>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "50vw",
                height: "100vh"
            }}>
                <h4>Karen</h4>
                <img src={Fom} alt="Fom" style={{width: "10vw", cursor: "pointer"}} />
            </div>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
                top: "1vh",
                right: "1px",
                backgroundColor: "black",
                width: "50vw",
                height: "98vh",
                borderBottomLeftRadius: "2%",
                borderTopLeftRadius: "2%",
                borderBottomRightRadius: "2%",
                borderTopRightRadius: "2%",
                filter: "drop-shadow(-5px 5px 5px)",
                color: "gray"
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "black",
                    width: "50vw",
                    height: "98vh",
                    borderBottomLeftRadius: "2%",
                    borderTopLeftRadius: "2%",
                    borderBottomRightRadius: "2%",
                    borderTopRightRadius: "2%",
                    filter: "drop-shadow(-5px 5px 5px)",
                    color: "gray"
                }}>
                <h4 style={{color: "red"}}>No Karen</h4>
                <img src={Fom} alt="Fom" style={{width: "10vw", filter: "invert()", cursor: "pointer"}} />
                </div>
            </div>
        </div>
    )
}
