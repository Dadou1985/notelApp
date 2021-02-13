import React from 'react'
import Fols from '../../svg/fols.png'
import Conciergerie from '../../svg/conciergerie.jpg'
import Overbooking from '../../svg/no-vaccancy.jpg'

export default function DarkStore() {
    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            height: "90vh",
            padding: "2%",
        }}>
            <h1 style={{textAlign: "center", marginBottom: "3vh"}}>IziStore</h1>
            <div style={{
                display: "flex",
                flexFlow: "row wrap",
                padding: "1%",
                justifyContent: "center"
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    padding: "1%",
                    borderRadius: "5px",
                    backgroundColor: "rgb(33, 35, 39)",
                    marginRight: "2vw",
                    marginBottom: "2vh"
                }}>
                    <img src={Fols} alt="formation fols" style={{width: "25vw", borderRadius: "5px"}} />
                </div>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    padding: "1%",
                    borderRadius: "5px",
                    marginRight: "2vw",
                    marginBottom: "2vh",
                    backgroundImage: `url${Conciergerie}`
                }}>
                    <img src={Conciergerie} alt="My Concierge" style={{width: "25vw", borderRadius: "5px"}} />
                </div>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    padding: "1%",
                    borderRadius: "5px",
                    backgroundColor: "rgb(33, 35, 39)",
                    marginRight: "2vw",
                    marginBottom: "2vh"
                }}>
                    <img src={Overbooking} alt="Overbooking" style={{width: "23vw", borderRadius: "5px"}} />
                </div>
            </div>
        </div>
    )
}
