import React, {useEffect} from "react"
import Loader from "react-loader-spinner"
import Mascott from '../../../svg/receptionist.svg'
import '../../css/loader.css'

const ShiftLoader = ({hide}) => {

  return (
    <div className="Loader-container" style={{display: hide}}>
        <div className="Loader-box">
        </div>
        <img src={Mascott} className="Loader-img" />
    </div>
  )
}

export default ShiftLoader;