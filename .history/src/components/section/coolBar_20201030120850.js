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

   const handleCallCenter = () => {
    return firebase.addNotification({documentId: user.displayName, notification: "Nos équipes vous assistent au : 06.59.87.28.84"})
  }

    return (
        <div style={{
            display: "flex",
            position: "absolute",
            bottom: "15vh",
            width:"37vw"
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
            <CallCenter />
        </div>
    )
}

export default CoolBar