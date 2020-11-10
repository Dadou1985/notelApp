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
           
     },[])
    return (
        <div style={{
            display: "flex",
            flexFlow: "row wrap",
            minHeight:"10vh",
            maxHeight: "40vh",
            justifyContent: "space-between"
        }}>
            {postIt.map(stick =>(
                <PostIt
                key={stick.markup}
                author={stick.author}
                text={stick.text}
                title={stick.title}
                
                markup={stick.id}
                />
            ))}
        </div>
    )
}

export default StickList