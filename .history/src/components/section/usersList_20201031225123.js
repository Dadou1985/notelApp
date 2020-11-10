import React, {useState, useEffect } from 'react'
import Avatar from 'react-avatar'


const UsersList = ({user, firebase, value}) => {

    const [info, setInfo] = useState([])

    useEffect(() => {
        let unsubscribe
        
                unsubscribe = firebase.toolOnAir({documentId: user.displayName, collection: "users"}).onSnapshot(function(snapshot) {
                    const snapUsers = []
                  snapshot.forEach(function(doc) {          
                    snapUsers.push({
                        id: doc.id,
                        ...doc.data()
                      })        
                    })
                    console.log(snapUsers)
                    setInfo(snapUsers)
                });
                return () => {
                    if(unsubscribe){
                        unsubscribe()
                    }
                }
           
     },[])
    return (
            <div>
                
            </div>
    )
}

export default UsersList