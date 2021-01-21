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
import { Loading } from 'react-loading-wrapper'
import 'react-loading-wrapper/dist/index.css'


const DarkLayout = ({ children }) => {

  const { user, firebase } = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let app = document.getElementById('globalComponent')
    
      setLoading(true)

    return () => {
      if(app){
        setLoading()
      }
    }
  }, [input])


  return (
    
    <FirebaseContext.Provider value={{ user, firebase, loading }}>
      <DarkNavigation />
      <div
        style={{
          maxWidth: "100%",
          height: "93vh",
          backgroundColor: "black",
          color: "white"}}>
          <Loading 
            loading={loading}
            // Optional props
            color='orange'
            backgroundColor='blue'
            fullPage
            size={100}
            speed='fast'
            // Use your own component, or the 'threeDots' component for the loading screen (default is spinner).
            loadingComponent='threeDots' 
          >
          <main id="globalComponent">{children}</main>  
        </Loading>
      </div>
      <DarkFooter />
    </FirebaseContext.Provider>
  )
}

DarkLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DarkLayout
