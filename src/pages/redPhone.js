import React, {useContext} from "react"
import Layout from "../components/layout"
import {Form} from 'react-bootstrap'
import HotelMap from '../components/section/map'
import RedBar from '../components/section/redBar'
import OverbookingBox from '../components/section/overbookingBox'
import BoxFilter from '../components/section/boxFilter'
import MapBox from '../components/section/mapBox'


const RedPhone = () => {

  return(
    <Layout>
      <MapBox />
    </Layout>
  )
}

export default RedPhone
