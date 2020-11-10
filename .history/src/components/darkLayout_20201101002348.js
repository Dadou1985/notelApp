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


const DarkLayout = ({ children }) => {

  const { user, firebase, loading } = useAuth()

  return (
    <FirebaseContext.Provider value={{ user, firebase, loading }}>
      <Navigation />
      <div
        style={{
          maxWidth: "100%",
          height: "85vh",
          backgroundColor: "bla"}}>
        <main>{children}</main>  
      </div>
      <Footer />
    </FirebaseContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DarkLayout
