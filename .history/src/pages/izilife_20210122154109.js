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
    }, 2000)
  }, [])

  return (
    <Fragment>
      <DarkLayout>
        <div>
          <SmartLoader hide={hide} />
          <DarkMessenger />
          <DarkProfil />
        </div>
      </DarkLayout>
    </Fragment>
  )
}

export default IziLife