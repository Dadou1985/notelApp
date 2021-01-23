import React, { useState, useEffect, } from "react"
import DarkLayout from "../components/darkLayout"
import MapBox2 from '../components/section/mapBox2'


const ShiftAdvisor = () => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return(
    <DarkLayout>
      <MapBox2 />
    </DarkLayout>
  )
}

export default ShiftAdvisor
