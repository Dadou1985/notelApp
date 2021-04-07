import React from 'react'
import Annuaire from './form/annuaire'
import CheckList from './form/checkList'
import '../css/memo.css'
import CallCenter from './CallCenter'
import Caisse from './form/caisse'


const CoolBar = () => {

    return (
        <div style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-around",
            width:"100%"
        }}>
            <CheckList />
            <Annuaire />
            <Caisse />    
        </div>
    )
}

export default CoolBar