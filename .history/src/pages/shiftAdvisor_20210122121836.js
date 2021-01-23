import React, { useState, useEffect} from "react"
import DarkLayout from "../components/darkLayout"
import MapBox2 from '../components/section/mapBox2'


const ShiftAdvisor = () => {

  const [state, setstate] = useState(initialState)

  return(
    <DarkLayout>
      <MapBox2 />
    </DarkLayout>
  )
}

export default ShiftAdvisor
