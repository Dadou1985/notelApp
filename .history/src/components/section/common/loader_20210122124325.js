import React from "react";
import Loader from "react-loader-spinner";

const App = () => {
  return (
    <div className>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div>
  )
}

export default App;