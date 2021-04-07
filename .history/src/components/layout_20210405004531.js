/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Navigation from './section/navigation'
import "./css/layout.css"
import {FirebaseContext, useAuth} from '../Firebase'


const Layout = ({ children }) => {

  const { user, firebase } = useAuth()
  const [state, setstate] = useState(initialState)
 
  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <Navigation />
      <div
        style={{
          overflow: "hidden",
          maxWidth: "100%",
          height: "100%"}}>
        <main className="softSkin">{children}</main>  
      </div>
    </FirebaseContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
