import React, { Fragment } from "react"
import Loader from "react-loader-spinner"
import Mascott from '../../../svg/receptionist.svg'

const SmartLoader = ({hide}) => {
  return (
    <div style={{
        backgroundColor: "white",
      display: hide,
      flexFlow: "row",
      justifyContent: "center",
      overflow: "hidden",
      zIndex: "10"}}>
        <div style={{height: "100vh", opacity: '0.1', filter: 'drop-shadow(10px 10px 10px)'}}>
          <Loader
            type="Puff"
            color="rgb(25,23,25)"
            height={1000}
            width={1000}
            timeout={10000}
          />
        </div>
        <img src={Mascott} style={{
          position: "absolute", 
          width: "30%", 
          top: "20vh", 
          left: "30vw", 
          opacity: "0.2",
          filter: "drop-shadow(10px 10px 10px)"}} />
    </div>
  )
}

export default SmartLoader;