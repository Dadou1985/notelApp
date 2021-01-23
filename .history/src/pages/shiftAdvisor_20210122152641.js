import React, { useState, useEffect, Fragment } from "react"
import DarkLayout from "../components/darkLayout"
import MapBox2 from '../components/section/mapBox2'
import SmartLoader from '../components/section/common/smartLoader'


const ShiftAdvisor = () => {

  const [hide, setHide] = useState("flex")

  const loader = () => {
    return <SmartLoader />
  }

  useEffect(() => {
    setTimeout(() => {
      loader()
    }, 5000)
  }, [])

  return(
    <Fragment>
      <SmartLoader />
      <DarkLayout>
        <MapBox2 />
      </DarkLayout>
    </Fragment>
  )
}

export default ShiftAdvisor
