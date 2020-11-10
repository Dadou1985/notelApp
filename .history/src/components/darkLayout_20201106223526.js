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

  const { user, firebase, loading } = useAuth()
  const [count, setCount] = useState(0)
  const props = useSpring(
    {filter: "invert(0%)", 
    from: {filter: "invert(0%)"}, 
    to: {filter : "invert(100%)"},
    config: {duration: 30000}
  })

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
      <Footer />
    </FirebaseContext.Provider>
  </animated.div>  
  )
}

DarkLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DarkLayout
