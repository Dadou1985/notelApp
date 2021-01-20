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
            return <img src={AngryBear} alt="angry" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
          case 'happy':
            return <img src={Smile} alt="happy" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
          case 'scared':
            return <img src={Scared} alt="scared" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
          case 'depressed':
            return <img src={LowBattery} alt="depressed" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
          case 'emergency':
            return <img src={Emergency} alt="emergency" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
          default:
            return <img src={Chill} alt="chill" style={{width: "55%", borderRadius: "50px", cursor: "pointer"}} onClick={handleShowMoodList} />
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

    const handleShowMoodList = () => {
      let moodList = document.getElementById('moodList')
      moodList.classList.toggle('moodList')
    }

    const handleHideMoodList = () => {
      let moodList = document.getElementById('moodList')
      moodList.style.display = "none"
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
                    <ul style={{position: "absolute", zIndex: "6", listStyleType: "none", bottom: "15%", left: "28vw"}} id="moodList" className="moodList">
                        <li onClick={() => {
                          setMood("angry")
                          handleHideMoodList()}}><img src={AngryBear} alt="angry" className="moodListIcon" /></li>
                        <li onClick={() => setMood("happy")}><img src={Smile} alt="smile" className="moodListIcon" /></li>
                        <li onClick={() => setMood("scared")}><img src={Scared} alt="scared" className="moodListIcon" /></li>
                        <li onClick={() => setMood("depressed")}><img src={LowBattery} alt="lowBattery" className="moodListIcon" /></li>
                        <li onClick={() => setMood("emergency")}><img src={Emergency} alt="emergency" className="moodListIcon" /></li>
                        <li onClick={() => setMood("")}><img src={Chill} alt="chill" className="moodListIcon" /></li>
                    </ul>
                </Form>
            </div>
        </div>
    )
}
