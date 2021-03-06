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
import Caisse from './form/caisse'


const CoolBar = () => {

    const { user, firebase } = useContext(FirebaseContext)

    const handleMove = () => {
        return navigate("/redPhone/")
   }

    return (
        <div style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            width:"100%"
        }}>
            
                {!!firebase && !!user &&
                <CheckList firebase={firebase} user={user} />}
                {!!firebase && !!user &&
                <Annuaire firebase={firebase} user={user} />}
                {/*<OverlayTrigger
                placement="bottom"
                overlay={
                <Tooltip id="title">
                    Overbooking
                </Tooltip>
                }>
                    <img src={Overbooking} className="icon" id="phone" alt="red_phone" onClick={handleMove} />
            </OverlayTrigger>*/}
{!!firebase && !!user &&
            <Caisse firebase={firebase} user={user} />}        </div>
    )
}

export default CoolBar