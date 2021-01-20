import React, { useState, useEffect } from 'react'
import { Form, Button, Input, FormGroup } from 'reactstrap'
import Message from './messageCommunizi'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import Send from '../../svg/paper-plane.svg'
import { ListBox } from 'primereact/listbox'
import AngryBear from '../../svg/angry-bear.jpg'
import Chill from '../../svg/chill.png'
import Emergency from '../../svg/gyrophare.jpg'
import LowBattery from '../../svg/low-battery.jpg'
import Smile from '../../svg/smile.jpg'
import Scared from '../../svg/scared-icon.png'


export default function CommunIzi({firebase, user}) {
    
    const [info, setInfo] = useState([])
    const [note, setNote] = useState('')
    const [mood, setMood] = useState('')
    const [startDate, setStartDate] = useState(new Date())

    const handleChange = event =>{
        setNote(event.currentTarget.value)
    }

    let hours = new Date().getHours() + "h"
    let minutes = new Date().getMinutes()
    let time = hours + minutes

    const renderSwitch = (mood) => {
        switch(mood) {
          case 'angry':
            return <img src={AngryBear} alt="angry" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} />
          case 'happy':
            return <img src={Smile} alt="angry" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} />
          case 'scared':
            return <img src={Scared} alt="angry" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} />
          case 'depressed':
            return <img src={LowBattery} alt="angry" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} />
          case 'emergency':
            return <img src={Emergency} alt="angry" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} />
          default:
            return <img src={Chill} alt="angry" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} />
        }
      }
      

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
        let date = startDate.yyyymmdd()
        firebase.addIziMessage({author: user.username, text: note, mood: mood, hour: time, userId: user.uid, date: date})

    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziLifeOnAir({collection: "communIzi", signal : signal}).onSnapshot(function(snapshot) {
                    const snapInfo = []
                  snapshot.forEach(function(doc) {          
                    snapInfo.push({
                        id: doc.id,
                        ...doc.data()
                      })        
                    });
                    console.log(snapInfo)
                    setInfo(snapInfo)
                });
                return () => {
                    abortController.abort()
                }
     },[])

    return (
        <div style={{width: "90%"}}>
            <PerfectScrollbar>
            <div id="box" className="communizi_notebox">
                {info.map(flow => (
                    <Message
                    author={flow.author}
                    text={flow.text}
                    markup={flow.markup}
                    date={flow.date}
                    hour={flow.hour}
                    userRef={flow.userId}
                     />
                ))}
            </div>
            </PerfectScrollbar>
            <div>
                <Form inline className="communizi_form">
                <FormGroup  className="communizi_form_input_container"> 
                    <Input type="text" placeholder="Participer à la conversation..."  
                    value={note}
                    onChange={handleChange}
                    id="dark_message_note" />
                </FormGroup>
                    <div style={{
                        display: "flex",
                        flexFlow: "row",
                        justifyContent: "space-between",
                        width: "15%"}}>
                        {renderSwitch(mood)}
                        <img src={Send} alt="sendIcon" style={{width: "40%", cursor: "pointer"}} onClick={handleSubmit} />          
                    </div>
                    <ul style={{position: "absolute", zIndex: "6", listStyleType: "none", bottom: "15%", left: "28vw"}} id="moodList">
                        <li onClick={setMood("angry")}><img src={AngryBear} alt="angry" style={{width: "5%", borderRadius: "50px", cursor: "pointer", marginBottom: "1vh"}} /></li>
                        <li onClick={setMood("smile")}><img src={Smile} alt="smile" style={{width: "5%", borderRadius: "50px", cursor: "pointer", marginBottom: "1vh"}} /></li>
                        <li onClick={set}><img src={Scared} alt="scared" style={{width: "5%", borderRadius: "50px", cursor: "pointer", marginBottom: "1vh"}} /></li>
                        <li onClick="depressed"><img src={LowBattery} alt="lowBattery" style={{width: "5%", borderRadius: "50px", cursor: "pointer", marginBottom: "1vh"}} /></li>
                        <li onClick="emergency"><img src={Emergency} alt="emergency" style={{width: "5%", borderRadius: "50px", cursor: "pointer", marginBottom: "1vh"}} /></li>
                        <li onClick=""><img src={Chill} alt="chill" style={{width: "5%", borderRadius: "50px", cursor: "pointer", marginBottom: "1vh"}} /></li>
                    </ul>
                </Form>
            </div>
        </div>
    )
}
