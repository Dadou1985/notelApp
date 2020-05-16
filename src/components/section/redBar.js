import React, { useContext } from 'react'
import Bed from '../../svg/rest.svg'
import RedPhone from '../../svg/support.svg'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import '../css/memo.css'
import { FirebaseContext } from '../../Firebase'



const RedBar = () => {

    const { user, firebase } = useContext(FirebaseContext)

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
            placement="top"
            overlay={
              <Tooltip id="title">
                Vos chambres restantes
              </Tooltip>
            }>
                <img src={Bed} className="icon" id="phone" alt="bed" />
            </OverlayTrigger>
        </div>
    )
}

export default RedBar