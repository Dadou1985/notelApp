import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import Layout from "../components/layout"
import ToolBar from "../components/section/toolbar"
import Messenger from '../components/section/messenger'
import Memo from '../components/section/memo'

const SinglePage = () => (
  <Layout>
    <div style={{
      display: "flex"
      backgroundColor: 
  }}>
      <ToolBar />
      <Messenger />
      <Memo />
    </div>
  </Layout>
)

export default SinglePage