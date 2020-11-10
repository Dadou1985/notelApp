import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import DarkLayout from "../components/layout"
import ToolBar from "../components/section/toolbar"
import Messenger from '../components/section/messenger'
import Memo from '../components/section/memo'

const IziLife = () => (
  <DarkLayout>
    <div style={{
      display: "flex",
      backgroundColor: "black",
      color: "white"
  }}>
      <ToolBar />
      <Messenger />
      <Memo />
    </div>
  </Layout>
)

export default IziLife