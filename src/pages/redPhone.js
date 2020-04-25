import React from "react"
import { Link } from "gatsby"
import Messenger from '../components/section/messenger'

import Layout from "../components/layout"

const RedPhone = () => (
  <Layout>
    <div 
    style={{
      display: "flex",
      backgroundColor: "black",
      height: "86vh"
    }}>
      <Messenger />
    </div>
  </Layout>
)

export default RedPhone
