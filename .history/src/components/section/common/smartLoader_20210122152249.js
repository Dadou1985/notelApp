import React, { Fragment } from "react"
import Loader from "react-loader-spinner"
import Mascott from '../../../svg/receptionist.svg'

const SmartLoader = () => {
  return (
    <div className="boomSkakalaka" style={{
      display: 'flex',
      flexFlow: "row",
      justifyContent: "center",
      overflow: "hidden",
      zIndex: "10"}}>
        <div style={{height: "100vh", opacity: '0.1', filter: 'drop-shadow(10px 10px 10px)'}}>
          <Loader
            type="Circles"
            color="rgb(25,23,25)"
            height={1000}
            width={1000}
            timeout={5}
            
          />
        </div>
        <img src={Mascott} style={{
          position: "absolute", 
          width: "30%", 
          top: "20vh", 
          left: "30vw", 
          filter: 'invert(70%)', 
          opacity: "0.2",
          filter: "drop-shadow(10px 10px 10px)"}} />
    </div>
  )
}

export default SmartLoader;