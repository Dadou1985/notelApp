import React, { Fragment } from "react"
import Loader from "react-loader-spinner"
import Mascott from '../../../svg/receptionist.svg'

const SmartLoader = () => {
  return (
    <div className="boomSkakalaka">
      <Fragment>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
        <img src={Mascott} style={{position: "absolute", width: "50%", left: "50vw", top: '50vh'}} />
      </Fragment>
    </div>
  )
}

export default SmartLoader;