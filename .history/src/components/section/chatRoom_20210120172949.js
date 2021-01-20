import React from 'react'
import Message from './messageCommunizi'


export default function ChatRoom({user, firebase, title}) {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        let unsubscribe
        
                unsubscribe = firebase.chatRoomOnAir({roomName: title, date: nextDay}).onSnapshot(function(snapshot) {
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
            
        </div>
    )
}
