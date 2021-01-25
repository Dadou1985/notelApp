import React, {useState, useEffect } from 'react'
import PostIt from './postIt'

const StickList = ({user, firebase}) => {

    const [postIt, setPostIt] = useState([])

    useEffect(() => {
        let unsubscribe
        
                unsubscribe = firebase.stickerOnAir({documentId: user.displayName, userId: user.username}).onSnapshot(function(snapshot) {
                    const snapStick = []
                  snapshot.forEach(function(doc) {          
                    snapStick.push({
                        id: doc.id,
                        ...doc.data()
                      })        
                    })
                    console.log(snapStick)
                    setPostIt(snapStick)
                });
                return () => {
                    if(unsubscribe){
                        unsubscribe()
                    }
                }
           
     },[firebase, user.displayName, user.username])
    return (
        <div style={{
            display: "flex",
            flexFlow: "row wrap",
            width: 100%;
            height: "45vh",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid black",
            marginBottom: "5vh"
        }}>
            {postIt.map(stick =>(
                <PostIt
                key={stick.markup}
                author={stick.author}
                text={stick.text}
                title={stick.title}
                assignee={stick.assignee}
                markup={stick.id}
                />
            ))}
        </div>
    )
}

export default StickList