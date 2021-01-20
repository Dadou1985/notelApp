import React, {useState, useEffect} from 'react'
import Message from './messageCommunizi'


export default function ChatRoom({user, firebase, title}) {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        firebase.chatRoomOnAir({roomName: title, signal: signal}).onSnapshot(function(snapshot) {
                    const snapInfo = []
                  snapshot.forEach(function(doc) {          
                    snapInfo.push({
                        id: doc.id,
                        ...doc.data()
                      })        
                    });
                    console.log(snapInfo)
                    setMessages(snapInfo)
                });
                return () => {
                    abortController.abort()
                }
     },[])

    return (
        <div>
            {messages.map(flow => (
                <Message 
                author={flow.author}
                text={flow.text}
                date={flow.date}
                hour={flow.hour}
                mood={flow.mood}
                userRef={flow.userId}
                />
            ))}
        </div>
    )
}
