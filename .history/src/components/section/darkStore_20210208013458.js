import React from 'react'
import Fols from '../../svg/fols.png'
import Conciergerie from '../../svg/conciergerie.jpg'
import Overbooking from '../../svg/no-vaccancy.jpg'
import {Button} from 'react-bootstrap'

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
                    flexFlow: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1%",
                    marginBottom: "2vh",
                    width: "80%"
                }}>
                    <img src={Fols} alt="formation fols" style={{width: "50%", borderRadius: "5px", border: "5px solid rgb(33, 35, 39)"}} />
                    <div style={{
                        diplay: "flex",
                        flexFlow: "column",
                        width: "40%"
                    }}>
                        <h4>Formation FOLS et FOLS mobile</h4>
                        <p>Le logicie FOLS développé par le groupe hôtelier ACCOR est probablement le PMS le plus abouti sur le marché des solutions de gestion des activités hôtelières.<br/>
                        Son interface légère et intuitive permettent une prise en main rapide sur cette outil d'une redoutable simplicité.
                        </p>
                        <h3>Bientôt disponible </h3>
                    </div>
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
