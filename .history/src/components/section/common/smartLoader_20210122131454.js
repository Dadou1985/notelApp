import React, { Fragment } from "react"
import Loader from "react-loader-spinner"
import Mascott from '../../../svg/receptionist.svg'

const SmartLoader = () => {
  return (
    <div className="boomSkakalaka" style={{overflow: ""}}>
        <Loader
          type="Grid"
          color="#00BFFF"
          height={1000}
          width={200}
          
        />
        <img src={Mascott} style={{position: "absolute", width: "35%", top: "12vh", left: "28vw", filter: 'invert(20%'}} />
    </div>
  )
}

export default SmartLoader;