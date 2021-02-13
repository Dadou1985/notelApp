import React from 'react'
import Fols from '../../svg/fols.png'
import Conciergerie from '../../svg/conciergerie.jpg'
import Overbooking from '../../svg/overbooking.jpg'

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
                    marginRight: "2vw",
                    marginBottom: "2vh",
                    backgroundImage: `url(${Fols})`,
                    backgroundSize: "cover",
                    backgroundPositionX: "-1vw",
                    width: "25vw",
                    border: "5px solid rgb(33, 35, 39)",
                    height: "30vh"
                }}>
                </div>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    padding: "1%",
                    borderRadius: "5px",
                    marginRight: "2vw",
                    marginBottom: "2vh",
                    backgroundImage: `url(${Conciergerie})`,
                    backgroundSize: "cover",
                    width: "25vw",
                    border: "5px solid rgb(33, 35, 39)"
                }}>
                </div>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "space-around",
                    padding: "1%",
                    borderRadius: "5px",
                    marginRight: "2vw",
                    marginBottom: "2vh",
                    backgroundImage: `url(${Overbooking})`,
                    backgroundSize: "cover",
                    width: "25vw",
                    border: "5px solid rgb(33, 35, 39)"
                }}>
                </div>
            </div>
        </div>
    )
}
