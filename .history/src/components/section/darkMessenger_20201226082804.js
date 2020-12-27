import React, {useState, useContext } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FirebaseContext } from '../../Firebase'
import Community from '../../svg/community.svg'
import Karen from '../../svg/karen.svg'
import Mask from '../../svg/mask.svg'
import ShiftAdvisor from '../../svg/hotel.svg'
import IziStore from '../../svg/store.svg'
import CommunIzi from "./communIzi"
import KarenStories from './karenStories'
import { navigate } from 'gatsby'


const DarkMessenger = () =>{

    const { user, firebase } = useContext(FirebaseContext)

    const handleShow
    
    return(
        <div style={{
            display: "flex",
            flexFlow: "row",
            width: "70%",
            height: "90vh",
            justifyContent: "space-between"
        }}>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "10%",
                height: "93%"
            }}>
                <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            IziChat
                          </Tooltip>
                        }>
                        <img src={Community} alt="Communizy" className="dark_nav_icons" />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            Karen Stories
                          </Tooltip>
                        }>
                        <img src={Karen} alt="Karen Stories" className="dark_nav_icons" />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            Guess who's<br/> guest
                          </Tooltip>
                        }>
                        <img src={Mask} alt="Mayday" className="dark_nav_icons" />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            Shift Advisor
                          </Tooltip>
                        }>
                        <img src={ShiftAdvisor} alt="ShiftAdvisor" className="dark_nav_icons" onClick={()=>navigate('/shiftAdvisor')} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            IziStore
                          </Tooltip>
                        }>
                        <img src={IziStore} alt="IziStore" className="dark_nav_icons" />
                    </OverlayTrigger>
          </div>
          <div className="dark_messenger_container" id="communIzi">
            <h5 className="font-weight-bolder dark_messenger_title">IziChat</h5>
            {!!firebase && !!user &&
            <CommunIzi firebase={firebase} user={user} />}
        </div>
        <div className="dark_messenger_container" id="karen_stories">
            <h5 className="font-weight-bolder dark_messenger_title">Karen Stories</h5>
            {!!firebase && !!user &&
            <KarenStories firebase={firebase} user={user} />}
        </div>
      </div>
    )
}

export default DarkMessenger