/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Footer from "./section/footer"
import Navigation from './section/navigation'
import "./css/layout.css"
import {FirebaseContext, useAuth} from '../Firebase'


const Layout = ({ children }) => {

  const { user, firebase } = useAuth()

  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <Navigation />
      <div
        style={{
          maxWidth: "100%",
          height: "85vh"}}>
        <main className="softSkin">{children}</main>  
      </div>
    </FirebaseContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
