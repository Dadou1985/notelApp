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
import DarkNavigation from './section/darkNavigation'
import "./css/layout.css"
import {FirebaseContext, useAuth} from '../Firebase'


const DarkLayout = ({ children }) => {

  const { user, firebase, loading } = useAuth()


  return (
    <FirebaseContext.Provider value={{ user, firebase, loading }}>
      <DarkNavigation />
      <div id="perception"
        onLoad={()=>{
        let userPerception = document.getElementById("perception")
        setTimeout(function(){userPerception.style.filter = "blur(5px)"})
      }}
        style={{
          maxWidth: "100%",
          height: "85vh",
          backgroundColor: "black",
          color: "white"}}>
        <main>{children}</main>  
      </div>
      <Footer />
    </FirebaseContext.Provider>
  )
}

DarkLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DarkLayout
