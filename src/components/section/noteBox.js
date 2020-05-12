import React, {useState, useEffect, useContext } from 'react'
import MessageLoaded from './messageLoaded'

const NoteBox = ({firebase}) => {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        let unsubscribe
        
                unsubscribe = firebase.messageOnAir().onSnapshot(function(snapshot) {
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
           
     },[])
    return (
        <div>
            {messages.map(message =>(
                <MessageLoaded
                key={message.markup}
                author={message.author}
                text={message.text}
                hour={message.hour}
                markup={message.id}
                date={message.date}
                blueprint={message.ref}
                />
            ))}
        </div>
    )
}

export default NoteBox