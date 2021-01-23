import React, { useState, useEffect, Fragment } from "react"
import DarkLayout from "../components/darkLayout"
import MapBox2 from '../components/section/mapBox2'
import SmartLoader from '../components/section/common/smartLoader'


const ShiftAdvisor = () => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return(
    <Fragment>
      {
        loading ? 
      <SmartLoader></>
      <DarkLayout>
        <MapBox2 />
      </DarkLayout>}
    </Fragment>
  )
}

export default ShiftAdvisor
