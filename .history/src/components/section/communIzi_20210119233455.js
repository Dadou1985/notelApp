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
import Select from '@material-ui/core/Select';




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

    const userMood = [
        {name: "Feel So Good", value: "happy"},
        {name: "A deux doigts 2 tout brûler", value: "angry"},
        {name: "J-1 avant la dépression nerveuse", value: "depressed"},
        {name: "En mode flipette", value: "scared"},
        {name: "Fast&Furious", value: "emergency"},
        {name: "Chill", value: ""}
    ]

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
                         <select class="selectpicker" value={mood} name="mood" onChange={handleChange} 
                            style={{width: "50%", 
                            height: "4vh", 
                            border: "none", 
                            backgroundColor: "transparent", 
                            paddingLeft: "1vw"}}>
                        <option><img src={AngryBear} alt="angry" style={{width: "50%", borderRadius: "50px", cursor: "pointer"}} /></option>
                        <option>Sky is the limit</option>
                        <option>Don't f*ck with me today !!</option>
                        <option>Feng Shui Master</option>
                        <option>J-1 avant dépression</option>
                    </select>
                        <img src={Send} alt="sendIcon" style={{width: "40%", cursor: "pointer"}} onClick={handleSubmit} />          
                    </div>
                </Form>
            </div>
        </div>
    )
}
