import React, { Fragment, useEffect } from "react"
import Loader from "react-loader-spinner"
import Mascott from '../../../svg/receptionist.svg'
import '../../css/loader.css'

const Loader = ({hide}) => {

  useEffect(() => {
   const LoadingFunction = () => {
   
   }
   return LoadingFunction
  }, [])

  return (
    <div className="Loader-container" style={{display: hide}}>
        <div className="Loader-box">
          {LoadingFunction()}
        </div>
        <img src={Mascott} className="Loader-img" />
    </div>
  )
}

export default Loader;