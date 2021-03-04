import React, { useEffect } from "react"
import Loader from "react-loader-spinner"
import Mascott from '../../../svg/receptionist.svg'
import "../../css/smartLoader.css"

const SmartLoader = ({hide}) => {

  useEffect(() => {
    
  }, [])

  return (
    <div className="boomSkakalaka smartLoader-container" style={{display: hide}}>
        <div className="smartLoader-box">
        </div>
        <img src={Mascott} className="smartLoader-img" />
    </div>
  )
}

export default SmartLoader;