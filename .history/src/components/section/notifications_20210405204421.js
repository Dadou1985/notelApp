import React, {useState, useEffect, useContext } from 'react'
import NotificationsBar from './notificationsBar'
import { FirebaseContext, db, auth } from '../../Firebase'

export default function Notifications({user, firebase}) {

    const [info, setInfo] = useState([])
    const [user, setUser] = useState(auth.currentUser)

    const { userDB, setUserDB } = useContext(FirebaseContext)
    
    useEffect(() => {
        let unsubscribe
        
                unsubscribe = firebase.toolOnAir({documentId: user.displayName, collection: "notifications"}).onSnapshot(function(snapshot) {
                    const snapStick = []
                  snapshot.forEach(function(doc) {          
                    snapStick.push({
                        id: doc.id,
                        ...doc.data()
                      })        
                    })
                    console.log(snapStick)
                    setInfo(snapStick)
                });
                return () => {
                    if(unsubscribe){
                        unsubscribe()
                    }
                }
           
     },[firebase, user.displayName])

    return (
        <>
            {info.map(stick => (
                <NotificationsBar
                message={stick.content}
                key={stick.markup}
                markup={stick.id}
              />
            ))}
        </>
    )
}
