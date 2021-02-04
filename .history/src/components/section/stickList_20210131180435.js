import React, {useState, useEffect } from 'react'
import PostIt from './postIt'
import CreateSticker from './createSticker'


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
            height: "45vh",
            marginBottom: "8vh"
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
            <div style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                justifyContent: "center",
                height: "3vh",
                width: "1vw",
                marginTop: "5vh"
                border: "1px solid black"
            }}>
            {!!firebase && !!user &&
            <CreateSticker firebase={firebase} user={user} />}
            </div>
        </div>
    )
}

export default StickList