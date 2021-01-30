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

    const handleChangeExpanded = (title) => setExpanded(title)
    
    const handleRemove = () =>{
        firebase.deleteDocument({documentId: user.displayName, collection: "message", document: title})
    }

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
        <div>
            {messages.map(message =>(
                <MessageLoaded
                key={message.markup}
                author={message.author}
                text={message.text}
                hour={message.hour}
                title={message.id}
                date={message.date}
                blueprint={message.ref}
                />
            ))}
        </div>
    )
}

export default NoteBox