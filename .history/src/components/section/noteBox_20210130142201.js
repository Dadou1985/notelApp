import React, {useState, useEffect, useContext } from 'react'
import MessageLoaded from './messageLoaded'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion'
import moment from 'moment'
import {Card} from 'react-bootstrap'
import {Button} from 'reactstrap'
import Avatar from 'react-avatar'

const NoteBox = ({user, firebase}) => {

    const [messages, setMessages] = useState([])
    const [dayDate, setDayDate] = useState(new Date())
    const [username, setUsername] = useState(null)
    const [expanded, setExpanded] = useState('')

    {/*const handleChangeExpanded = (title) => setExpanded(title)
    
    const handleRemove = () =>{
        firebase.deleteDocument({documentId: user.displayName, collection: "note", document: title})
    }*/}

    Date.prototype.standard = function() {
        let day = this.getDate() - 1
        let month = this.getMonth() + 1
        let year = this.getFullYear()

        let date = year + "-" + month + "-" + day
        return date
    };

    let dateString = dayDate.standard()
    let nextDay = Date.parse(dayDate) + 123274000
    console.log(nextDay)

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

    useEffect(() => {
        let unsubscribe
        
                unsubscribe = firebase.noteOnAir({documentId: user.displayName, date: nextDay}).onSnapshot(function(snapshot) {
                    const snapMessages = []
                  snapshot.forEach(function(doc) {          
                      snapMessages.push({
                        id: doc.id,
                        ...doc.data()
                      })        
                    });
                    console.log(snapMessages)
                    setMessages(snapMessages)
                });
                return () => {
                    if(unsubscribe){
                        unsubscribe()
                    }
                }
           
     },[firebase, user.displayName])

    return (
        <Accordion allowZeroExpanded>
                {messages.map((flow) => (
                  <AccordionItem key={flow.id} onClick={() => setExpanded(flow.id)} className="user_Message">
                    <AccordionItemHeading style={{
                      backgroundColor: "light", 
                      padding: "2%",
                      }}>
                        <AccordionItemButton style={{
                            display: "flex",
                            flexFlow: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            outline: "none"}}>
                         <div>
                         <Avatar 
                            round={true}
                            name={flow.author}
                            size="30"
                            color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                            style={{marginRight: "1vw"}} />
                            <b>{flow.id}</b>
                         </div>
                            <i style={{color: "gray", float: "right", fontSize: "13px"}}>{moment(flow.markup).format('ll')}</i>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel style={{
                        display: "flex",
                        flexFlow: "column",
                        backgroundColor: 'white',
                        padding: "2%"}}>
                      {flow.text}
                    <i style={{color: "gray"}}>{flow.hour}</i>
                    </AccordionItemPanel>
                  </AccordionItem>
                ))}
              </Accordion>
    )
}

export default NoteBox