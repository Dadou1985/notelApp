import React, { useEffect, useState, Fragment } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Loader from '../components/section/common/loader'
import Layout from "../components/layout"
import ToolBar from "../components/section/toolbar"
import Messenger from '../components/section/messenger'
import Memo from '../components/section/memo'
import Navig

const SinglePage = () => {

  const [hide, setHide] = useState("flex")

  useEffect(() => {
    setTimeout(() => {
      setHide("none")
    }, 1000)
  }, [])
  
  return (
    <Fragment>
      <div style={{position: "absolute", zIndex: "9", width: "100%"}}> 
        <Loader hide={hide} />
      </div>
        <div style={{
          display: "flex",
      }}>
          <ToolBar />
          <Messenger />
          <Memo />
        </div>
    </Fragment>
  )
}

export default SinglePage