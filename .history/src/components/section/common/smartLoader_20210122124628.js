import React, { Fragment } from "react";
import Loader from "react-loader-spinner";

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
        <img></img>
      </Fragment>
    </div>
  )
}

export default SmartLoader;