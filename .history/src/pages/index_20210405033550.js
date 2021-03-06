import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Connection from '../components/connection'
import {FirebaseContext} from '../Firebase'
import SEO from '../components/seo'

const IndexPage = () => {


  return(
    <FirebaseContext.Provider value={{ user, firebase, loading }}>
      <div>
        <Connection />
      </div>
    </FirebaseContext.Provider>
  )
}

export default IndexPage