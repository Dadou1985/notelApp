import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import DarkLayout from "../components/darkLayout"
import DarkProfil from "../components/section/darkProfil"
import DarkMessenger from '../components/section/darkMessenger'

const IziLife = () => (
  <DarkLayout>
    <div style={{
      display: "flex",
      backgroundColor: "linear_gradient",
      color: "white"
  }}>
      <DarkMessenger />
      <DarkProfil />
    </div>
  </DarkLayout>
)

export default IziLife