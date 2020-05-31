import React, {useState, useEffect, useContext } from 'react'
import MessageLoaded from './messageLoaded'

const NoteBox = ({user, firebase}) => {

    const [messages, setMessages] = useState([])
    const [field, setfield] = useState()

    const userRefHotel = firebase.getUserProfile({userId: user.uid})

    userRefHotel.then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data());
            return setfield(doc.data().userHotel)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    console.log(field)

    const dataHotel = "H9781"

    useEffect(() => {
        let unsubscribe
        
                unsubscribe = firebase.messageOnAir({documentId: field}).onSnapshot(function(snapshot) {
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