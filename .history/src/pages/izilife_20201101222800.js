import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import DarkLayout from "../components/darkLayout"
import ToolBar from "../components/section/toolbar"
import DarkMessenger from '../components/section/darkMessenger'
import Memo from '../components/section/memo'

const IziLife = () => (
  <DarkLayout>
    <div style={{
      display: "flex",
      backgroundColor: "black",
      color: "white"
  }}>
      <Messenger />
    </div>
  </DarkLayout>
)

export default IziLife