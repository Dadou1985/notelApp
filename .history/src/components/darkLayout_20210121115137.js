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
import LoadingScreen from '../react-loading-screen'



const DarkLayout = ({ children }) => {

  const { user, firebase, loading } = useAuth()

  return (
    <LoadingScreen
    loading={true}
    bgColor='#f1f1f1'
    spinnerColor='#9ee5f8'
    textColor='#676767'
    logoSrc='/logo.png'
    text='Here an introduction sentence (Optional)'
  > 
  
  </LoadingScreen>
    
  )
}

DarkLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DarkLayout
