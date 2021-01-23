import React, { Fragment } from "react"
import Loader from "react-loader-spinner"
import Mascott from '../../../svg/receptionist.svg'

const SmartLoader = () => {
  return (
    <div className="boomSkakalaka" style={{
      display: 'flex',
      flexFlow: "row",
      justifyContent: "center",
      overflow: "hidden"}}>
        <div style={{height: "100vh", opacity: '0.3'}}>
          <Loader
            type="Oval"
            color="rgb(25,23,25)"
            height={1000}
            width={1000}
            
          />
        </div>
        <img src={Mascott} style={{position: "absolute", width: "37%", top: "12vh", left: "28vw", filter: 'invert(50%', opacity: "0.1"}} />
    </div>
  )
}

export default SmartLoader;