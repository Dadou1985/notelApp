import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Connection from '../components/connection'
import {FirebaseContext, db, auth} from '../Firebase'
import SEO from '../components/seo'

const IndexPage = () => {

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

  return(
    <FirebaseContext.Provider value={{ userDB, setUserDB }}>
        <Connection />
    </FirebaseContext.Provider>
  )
}

export default IndexPage