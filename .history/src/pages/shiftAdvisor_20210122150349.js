import React, { useState, useEffect, Fragment } from "react"
import DarkLayout from "../components/darkLayout"
import MapBox2 from '../components/section/mapBox2'
import SmartLoader from '../components/section/common/smartLoader'


const ShiftAdvisor = () => {

  const [loading, setLoading] = useState(true)

  const loader = () => {
    return setTimeout(() => {
      
    }, 5000);
  }

  useEffect(() => {
    setTimeout(() => {
      loader()
    }, 5000)
  }, [])

  return(
    <Fragment>
      <DarkLayout>
        <MapBox2 />
      </DarkLayout>
    </Fragment>
  )
}

export default ShiftAdvisor
