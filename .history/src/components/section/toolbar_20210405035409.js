import React, { useContext } from 'react'
import '../css/toolbar.css'
import Lost from './form/lost'
import Cab from './form/cab'
import Clock from './form/clock'
import Maid from './form/maid'
import Repair from './form/repair'


const ToolBar = () =>{
    
    return(
        <div className="toolbar_container">
            <Lost  />
            <Cab   />
            <Clock  />
            <Maid  />
            <Repair  />
        </div>
    )
}

export default ToolBar