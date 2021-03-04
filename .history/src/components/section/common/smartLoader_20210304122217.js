import React, { useEffect } from "react"
import Loader from "react-loader-spinner"
import Mascott from '../../../svg/receptionist.svg'
import "../../css/smartLoader.css"

const SmartLoader = ({hide}) => {

  useEffect(() => {
    const loadingFunction = () => {
      if(window.innerWidth > 480) {
        return <SmartLoader
              type="Puff"
              color="rgb(25,23,25)"
              height={1000}
              width={1000}
              timeout={10000}
          />
      }else{
        return <SmartLoader
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
    <div className="boomSkakalaka smartLoader-container" style={{display: hide}}>
        <div className="smartLoader-box">
          {}
        </div>
        <img src={Mascott} className="smartLoader-img" />
    </div>
  )
}

export default SmartLoader;