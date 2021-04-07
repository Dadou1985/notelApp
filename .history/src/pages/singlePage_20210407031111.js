import React, { useEffect, useState, Fragment } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Loader from '../components/section/common/loader'
import Layout from "../components/layout"
import ToolBar from "../components/section/toolbar"
import Messenger from '../components/section/messenger'
import Memo from '../components/section/memo'
import Navigation from '../components/section/navigation'
import {FirebaseContext, db, auth} from '../Firebase'
import { navigate } from 'gatsby'

const SinglePage = () => {

  const [hide, setHide] = useState("flex")

  useEffect(() => {
    setTimeout(() => {
      setHide("none")
    }, 1000)
  }, [])

  const [userDB, setUserDB] = useState(null)

  useEffect(() => {
        
    let unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          return db.collection("mySweetHotel")
            .doc("country")
            .collection("France")
            .doc("collection")
            .collection("business")
            .doc("collection")
            .collection('users')
            .doc("Dadou")
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log("+++++++", doc.data())
                setUserDB(doc.data())
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!")
              }
            }).then(() => navigate('singlePage'))
        }
      })
    return unsubscribe
}, [])
  
  return (
    <Fragment>
      <div style={{position: "absolute", zIndex: "9", width: "100%"}}> 
        <Loader hide={hide} />
      </div>
      <Navigation />
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