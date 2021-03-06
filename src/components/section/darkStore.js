import React from 'react'
import Fols from '../../svg/fols.png'
import Conciergerie from '../../svg/serge.jpg'
import Overbooking from '../../svg/full.svg'
import IziWork from '../../svg/iziWork.jpg'
import EyeScan from '../../svg/eyeScan.jpg'
import {Button} from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'


export default function DarkStore() {
    return (
        <PerfectScrollbar>
            <div className="store-global-container">
            <h1 className="store-title">IziStore</h1>
            <div className="store-body">
                <div className="store-feature-container">
                    <img src={Fols} alt="formation fols" className="store-feature-img" />
                    <div className="store-feature-text">
                        <h2>Formation FOLS et FOLS mobile</h2>
                        <p>Le logicie FOLS développé par le groupe hôtelier ACCOR est probablement le PMS le plus abouti sur le marché des solutions de gestion des activités hôtelières.<br/>
                        Son interface légère et intuitive permettent une prise en main rapide sur cette outil d'une redoutable simplicité.
                        </p>
                        <h5 >Bientôt disponible dans votre IziStore</h5>
                    </div>
                </div>
                <div className="store-feature-container-reverse">
                    <div className="store-feature-text">
                        <h2>Overbooking</h2>
                        <p>Le logicie FOLS développé par le groupe hôtelier ACCOR est probablement le PMS le plus abouti sur le marché des solutions de gestion des activités hôtelières.<br/>
                        Son interface légère et intuitive permettent une prise en main rapide sur cette outil d'une redoutable simplicité.
                        </p>
                        <h5 >Bientôt disponible dans votre IziStore</h5>
                    </div>
                    <img src={Overbooking} alt="Overbooking" className="store-feature-img" />
                </div>
                <div className="store-feature-container">
                    <img src={IziWork} alt="formation fols" className="store-feature-img" />
                    <div className="store-feature-text">
                        <h2>IziWork le job network</h2>
                        <p>Le logicie FOLS développé par le groupe hôtelier ACCOR est probablement le PMS le plus abouti sur le marché des solutions de gestion des activités hôtelières.<br/>
                        Son interface légère et intuitive permettent une prise en main rapide sur cette outil d'une redoutable simplicité.
                        </p>
                        <h5 >Bientôt disponible dans votre IziStore</h5>
                    </div>
                </div>
                <div className="store-feature-container-reverse">
                    <div className="store-feature-text">
                        <h2>Serge le concierge 2.0</h2>
                        <p>Le logicie FOLS développé par le groupe hôtelier ACCOR est probablement le PMS le plus abouti sur le marché des solutions de gestion des activités hôtelières.<br/>
                        Son interface légère et intuitive permettent une prise en main rapide sur cette outil d'une redoutable simplicité.
                        </p>
                        <h5 >Bientôt disponible dans votre IziStore</h5>
                    </div>
                    <img src={Conciergerie} alt="My Concierge" className="store-feature-img" />
                </div>
                <div className="store-feature-container">
                    <img src={EyeScan} alt="formation fols" className="store-feature-img" />
                    <div className="store-feature-text">
                        <h2>IziScan le dématerialiseur</h2>
                        <p>Le logicie FOLS développé par le groupe hôtelier ACCOR est probablement le PMS le plus abouti sur le marché des solutions de gestion des activités hôtelières.<br/>
                        Son interface légère et intuitive permettent une prise en main rapide sur cette outil d'une redoutable simplicité.
                        </p>
                        <h5 >Bientôt disponible dans votre IziStore</h5>
                    </div>
                </div>
            </div>
        </div>
        </PerfectScrollbar>
    )
}
