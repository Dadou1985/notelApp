import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Connection from '../components/connection'
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