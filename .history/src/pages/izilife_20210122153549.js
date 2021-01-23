import React, { useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import DarkLayout from "../components/darkLayout"
import DarkProfil from "../components/section/darkProfil"
import DarkMessenger from '../components/section/darkMessenger'

const IziLife = () => (
  const [hide, setHide] = useState("flex")

  useEffect(() => {
    setTimeout(() => {
      setHide("none")
    }, 8000)
  }, [])
  <DarkLayout>
    <div>
      <DarkMessenger />
      <DarkProfil />
    </div>
  </DarkLayout>
)

export default IziLife