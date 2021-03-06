import React, { useState, useEffect } from "react"
import DarkLayout from "../components/darkLayout"
import DarkStore from '../components/section/darkStore'
import SmartLoader from '../components/section/common/smartLoader'
import Home from '../svg/home.svg'
import { navigate } from 'gatsby'

export default function IziStore() {
    
    const [hide, setHide] = useState("flex")

    useEffect(() => {
        setTimeout(() => {
        setHide("none")
        }, 1000)
    }, [])

    return (
        <div style={{overflow: "hidden", height: "100vh"}}>
            <SmartLoader hide={hide} />
            <DarkLayout>
                <DarkStore />
                <img src={Home} alt="home page" className="home-icon" onClick={() => navigate("/izilife")} />
            </DarkLayout>
        </div>
    )
}
