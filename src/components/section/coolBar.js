import React, { useContext } from 'react'
import Annuaire from './form/annuaire'
import CheckList from './form/checkList'
import RedPhone from '../../svg/support.svg'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { navigate } from 'gatsby'
import '../css/memo.css'
import { FirebaseContext } from '../../Firebase'



const CoolBar = () => {

    const { user, firebase } = useContext(FirebaseContext)

    const handleMove = (event) => {
        return navigate("redPhone")
   }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: "15vh"
        }}>
            {!!firebase && !!user &&
            <CheckList firebase={firebase} user={user} />}
            {!!firebase && !!user &&
            <Annuaire firebase={firebase} user={user} />}
            <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="title">
                Red Phone
              </Tooltip>
            }>
                <img src={RedPhone} className="icon" id="phone" alt="red_phone" />
            </OverlayTrigger>
        </div>
    )
}

export default CoolBar