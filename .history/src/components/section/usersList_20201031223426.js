import React, {useState, useEffect } from 'react'

const UsersList = ({user, firebase}) => {

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
        {info.map(flow => (
            <option value={flow.id}>
                <Avatar 
                    name={flow.id}
                    round={true}
                    size="30"
                    color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                    />
            </option> 
        ))}
    )
}

export default UsersList