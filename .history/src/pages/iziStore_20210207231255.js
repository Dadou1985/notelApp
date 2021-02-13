import React, { useState, useEffect } from "react"
import DarkLayout from "../components/darkLayout"
import Store from '../components/section/mapBox2'
import SmartLoader from '../components/section/common/smartLoader'

export default function IziStore() {
    
    const [hide, setHide] = useState("flex")

    useEffect(() => {
        setTimeout(() => {
        setHide("none")
        }, 3000)
    }, [])

    return (
        <div style={{overflow: "hidden", height: "100vh"}}>
            <SmartLoader hide={hide} />
            <DarkLayout>
            </DarkLayout>
        </div>
    )
}
