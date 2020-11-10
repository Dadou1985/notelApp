/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import DarkFooter from "./section/darkFooter"
import DarkNavigation from './section/darkNavigation'
import "./css/layout.css"
import {FirebaseContext, useAuth} from '../Firebase'
import {useSpring, animated, config} from 'react-spring'


const DarkLayout = ({ children }) => {

  return (
    <animated.div id="perception">
    <FirebaseContext.Provider value={{ user, firebase, loading }}>
      <DarkNavigation />
      <div
        style={{
          maxWidth: "100%",
          height: "93vh",
          backgroundColor: "black",
          color: "white"}}>
        <main>{children}</main>  
      </div>
      <DarkFooter />
    </FirebaseContext.Provider>
  </animated.div>  
  )
}

DarkLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DarkLayout
