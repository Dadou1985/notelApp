import React, {useState, useEffect, useContext } from 'react'
import Message from './messageCommunizi'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { FirebaseContext, db, auth } from '../../Firebase'


export default function ChatRoom() {

    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(auth.currentUser)

    const { userDB, setUserDB } = useContext(FirebaseContext)

    useEffect(() => {
        const chatRoomOnAir = () => {
            return db.collection('mySweetHotel')
            .doc('country')
            .collection('France')
            .doc('collection')
            .collection('hotel')
            .doc('region')
            .collection(userDB.hotelRegion)
            .doc('departement')
            .collection(userDB.hotelDept)
            .doc(`${userDB.hotelId}`)
            .collection('chat')
            .doc(roomName)
            .collection("chatRoom")
            .orderBy("markup", "desc")
        }

        let unsubscribe = chatRoomOnAir({hotelId: userDB.hotelId, region: userDB.hotelRegion, departement: userDB.hotelDept, roomName: title, signal: signal}).onSnapshot(function(snapshot) {
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
            <PerfectScrollbar>
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
            </PerfectScrollbar>
        </div>
    )
}
