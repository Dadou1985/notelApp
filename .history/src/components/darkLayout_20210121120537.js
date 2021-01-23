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

  const { user, firebase, loading } = useAuth()
  const [loading, setLoading] = useState(true)


  return (
    <Loading 
      loading={loading}
      // Optional props
      color='orange'
      backgroundColor='blue'
      fullPage
      size={100}
      speed='fast'
      // Use your own component, or the 'threeDots' component for the loading screen (default is spinner).
      loadingComponent={<YourLoadingComponent />} 
      loadingComponent='threeDots' 
    >
    
        <main>{children}</main>  
      </div>
      <DarkFooter />
    </FirebaseContext.Provider>
    </Loading>
  )
}

DarkLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DarkLayout