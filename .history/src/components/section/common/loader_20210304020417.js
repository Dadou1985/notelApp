import React, { Fragment, useEffect } from "react"
import Loader from "react-loader-spinner"
import Mascott from '../../../svg/receptionist.svg'
import '../../css/loader.css'

const Loader = ({hide}) => {

  useEffect(() => {
   const LoadingFunction = () => {
    if(window.innerWidth > 480){
      <Loader
      type="Puff"
      color="rgb(25,23,25)"
      height={1000}
      width={1000}
      timeout={10000}
  />
     }else{
      <Loader
      type="Puff"
      color="rgb(25,23,25)"
      height={700}
      width={400}
      timeout={10000}
    />
     }
   }
  }, [])

  return (
    <div className="Loader-container" style={{display: hide}}>
        <div className="Loader-box">
          lo
        </div>
        <img src={Mascott} className="Loader-img" />
    </div>
  )
}

export default Loader;