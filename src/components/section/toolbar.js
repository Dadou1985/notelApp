import React, { useContext } from 'react'
import '../css/toolbar.css'
import Lost from './form/lost'
import Cab from './form/cab'
import Clock from './form/clock'
import Maid from './form/maid'
import Repair from './form/repair'
import Caisse from './form/caisse'
import { FirebaseContext } from '../../Firebase'


const ToolBar = () =>{
    
    const { user, firebase } = useContext(FirebaseContext)

    return(
        <div style={{
            display: "flex",
            flexFlow: "column",
            width: "7%",
            height: "82vh",
            margin: "1%",
            borderRight: "1px solid lightgrey",
            justifyContent: "space-around",
            alignItems: "center"}}>
            {!!firebase && !!user &&
            <Lost firebase={firebase} user={user} />}
            {!!firebase && !!user &&
            <Cab firebase={firebase} user={user}  />}
            {!!firebase && !!user &&
            <Clock firebase={firebase} user={user} />}
            {!!firebase && !!user &&
            <Caisse firebase={firebase} user={user} />}
            {!!firebase && !!user &&
            <Maid firebase={firebase} user={user} />}
            {!!firebase && !!user &&
            <Repair firebase={firebase} user={user} />}
        </div>
    )
}

export default ToolBar