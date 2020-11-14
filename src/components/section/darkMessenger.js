import React, {useState, useContext } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FirebaseContext } from '../../Firebase'
import Community from '../../svg/community.svg'
import Karen from '../../svg/karen.svg'
import Mayday from '../../svg/sos.svg'
import ShiftAdvisor from '../../svg/hotel.svg'
import IziStore from '../../svg/store.svg'
import CommunIzi from "./communIzi"
import KarenStories from './karenStories'


const DarkMessenger = () =>{

    const [note, setNote] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const { user, firebase } = useContext(FirebaseContext)
    
    const handleChange = event =>{
        setNote(event.currentTarget.value)
    }

    let hours = new Date().getHours() + "h"
    let minutes = new Date().getMinutes()
    let time = hours + minutes

    Date.prototype.yyyymmdd = function() {
        let day = this.getDate()
        let month = this.getMonth()
        let calendar = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
        let year = this.getFullYear()

        let date = day + " " + calendar[month] + " " + year
        return date
    };

    let dayIn = new Date()
    let today = dayIn.yyyymmdd()

    const handleSubmit = (event) =>{
        event.preventDefault()
        setNote("")
        let marker = startDate.getTime()
        let date = startDate.yyyymmdd()
               
        if(date !== today) {
            const notif = "Votre message a bien été enregistré pour le " + date + " ."
            firebase.addNotification({documentId: user.displayName, notification: notif})
            setStartDate(new Date())
        }
        firebase.addMessage({documentId: user.displayName, author: user.username, text: note, hour: time, markup: marker, ref: user.uid, date: date})

    }

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
                            Mayday Stories
                          </Tooltip>
                        }>
                        <img src={Mayday} alt="Mayday" className="dark_nav_icons" />
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="title">
                            Shift Advisor
                          </Tooltip>
                        }>
                        <img src={ShiftAdvisor} alt="ShiftAdvisor" className="dark_nav_icons" />
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
        <div className="dark_messenger_container">
            <h5 className="font-weight-bolder dark_messenger_title">Karen Stories</h5>
            {!!firebase && !!user &&
            <KarenStories firebase={firebase} user={user} />}
        </div>
      </div>
    )
}

export default DarkMessenger