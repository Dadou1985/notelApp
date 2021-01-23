import React, { useEffect, useState, Fragment } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import SmartLoader from '../components/section/common/smartLoader'
import DarkLayout from "../components/darkLayout"
import DarkProfil from "../components/section/darkProfil"
import DarkMessenger from '../components/section/darkMessenger'

const IziLife = () => {

  const [hide, setHide] = useState("flex")

  useEffect(() => {
    setTimeout(() => {
      setHide("none")
    }, 1000)
  }, [])

  return (
    <div style={{postion: "a" overflow: "hidden", height: "100vh"}}>
      <SmartLoader hide={hide} />
      <DarkLayout>
        <div style={{
            display: "flex",
            color: "white"
        }}>
          <DarkMessenger />
          <DarkProfil />
        </div>
      </DarkLayout>
    </div>
  )
}

export default IziLife