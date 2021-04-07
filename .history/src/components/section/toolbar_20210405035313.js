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
            <Lost firebase={firebase} user={user} />
            <Cab firebase={firebase} user={user}  />
            <Clock firebase={firebase} user={user} />
            <Maid firebase={firebase} user={user} />
            {!!firebase && !!user &&
            <Repair firebase={firebase} user={user} />}
        </div>
    )
}

export default ToolBar