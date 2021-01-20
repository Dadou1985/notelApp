import React from 'react'
import Message from './messageCommunizi'


export default function ChatRoom({user, firebase, title}) {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.chatRoomOnAir({signal : signal}).onSnapshot(function(snapshot) {
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

     console.log(info)

    return (
        <div>
            
        </div>
    )
}
