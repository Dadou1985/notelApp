import React, { useContext } from 'react'
import Annuaire from './form/annuaire'
import CheckList from './form/checkList'
import Overbooking from '../../svg/full.svg'
import Assistance from '../../svg/operator.svg'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { navigate } from 'gatsby'
import '../css/memo.css'
import { FirebaseContext } from '../../Firebase'
import CallCenter from './CallCenter'




const CoolBar = () => {

    const { user, firebase } = useContext(FirebaseContext)

    const handleMove = () => {
        return navigate("/redPhone/")
   }

    return (
        <div style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-around",
            width:"100%"
        }}>
            
        </div>
    )
}

export default CoolBar