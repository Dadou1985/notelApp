import React, {useContext} from 'react'
import '../css/toolbar.css'
import Lost from './form/lost'
import Cab from './form/cab'
import Clock from './form/clock'
import Maid from './form/maid'
import Repair from './form/repair'
import { FirebaseContext, db, auth } from '../../Firebase'


const ToolBar = () =>{
    const { userDB, setUserDB } = useContext(FirebaseContext)

    return(
        <div className="toolbar_container">
            {userDB && 
                <Lost />
           {!!userDB && !!setUserDB &&
                <Cab userDB={userDB} setUserDB={setUserDB} />}
                {!!userDB && !!setUserDB &&
                <Maid userDB={userDB} setUserDB={setUserDB} />}
                {!!userDB && !!setUserDB &&
                <Clock userDB={userDB} setUserDB={setUserDB} />}
                {!!userDB && !!setUserDB &&
                <Repair userDB={userDB} setUserDB={setUserDB} />}
        </div>
    )
}

export default ToolBar