/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import Navigation from './section/navigation'
import "./css/layout.css"
import {FirebaseContext} from '../Firebase'


const Layout = ({ children }) => {

  const [userDB, setUserDB] = useState(null)
 
  return (
      <Navigation />
      <div
        style={{
          overflow: "hidden",
          maxWidth: "100%",
          height: "100%"}}>
                <FirebaseContext.Provider value={{ userDB, setUserDB }}>

        <main className="softSkin">{children}</main> 
        </FirebaseContext.Provider>
 
      </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
