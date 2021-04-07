import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Connection from '../components/connection'
import {FirebaseContext} from '../Firebase'
import SEO from '../components/seo'

const IndexPage = () => {

  const [userDB, setUserDB] = useState(null)

  
  return(
    <FirebaseContext.Provider value={{ userDB, setUserDB }}>
        <Connection />
    </FirebaseContext.Provider>
  )
}

export default IndexPage