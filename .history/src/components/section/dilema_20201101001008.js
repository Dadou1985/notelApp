import React from 'react'
import Fom from '../../svg/fom.svg'
import { navigate } from 'gatsby'


export default function Dilema() {
    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            height: "100vh"
        }}>
            <h1>Choisissez votre espace</h1>
            <div style={{
            display: "flex",
            flexFlow: "row",
            height: "85vh"}}>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "49vw",
                height: "100%"
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25vw",
                    height: "50vh",
                    border: "1px solid lightgrey",
                    borderBottomLeftRadius: "2%",
                    borderTopLeftRadius: "2%",
                    borderBottomRightRadius: "2%",
                    borderTopRightRadius: "2%",
                    filter: "drop-shadow(-5px 5px 5px)",
                    color: "gray",
                    cursor: "pointer"
                    }}
                    onClick={()=>navigate('/singlePage')}>
                <h4>Hello, Karen !</h4>
                <img src={Fom} alt="Fom" style={{width: "10vw"}} />
                </div>
            </div>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "49vw",
                height: "100%",
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
                    color: "gray",
                    cursor: "pointer"
                }}>
                    <
                    <h4 style={{color: "orange"}}>Hell no, Karen !</h4>
                    <img src={Fom} alt="Fom" style={{width: "10vw", filter: "invert()"}} />
                </div>
            </div>
        </div>
        </div>
    )
}
