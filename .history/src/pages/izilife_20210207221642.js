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
    <Fragment>
      <div style={{position: "absolute", zIndex: "9", width: "100%"}}> 
        <SmartLoader hide={hide} />
      </div>
      <DarkLayout>
        <div style={{
            display: "flex",
            color: "white",
            height: "100%"
        }}>
          <DarkMessenger />
        </div>
      </DarkLayout>
    </Fragment>
  )
}

export default IziLife