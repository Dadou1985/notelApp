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
        <div style={{height: "100"}}>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={1000}
            width={200}
            
          />
        </div>
        <img src={Mascott} style={{position: "absolute", width: "35%", top: "12vh", left: "28vw", filter: 'invert(30%', opacity: "0.1"}} />
    </div>
  )
}

export default SmartLoader;