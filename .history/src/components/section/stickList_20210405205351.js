import React, {useState, useEffect, useContext } from 'react'
import PostIt from './postIt'
import CreateSticker from './createSticker'
import { FirebaseContext, db, auth } from '../../Firebase'


const StickList = () => {

    const [postIt, setPostIt] = useState([])
    const [user, setUser] = useState(auth.currentUser)

    const { userDB, setUserDB } = useContext(FirebaseContext)

    useEffect(() => {
        const stickerOnAir = () => {
            
        }

        let unsubscribe = firebase.stickerOnAir({documentId: user.displayName, userId: user.username}).onSnapshot(function(snapshot) {
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
            alignItems: "flex-start",
            height: "45vh",
            marginBottom: "15%", 
            paddingLeft: "3vw"
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
                marginTop: "5vh",
            }}>
            <CreateSticker />
            </div>
        </div>
    )
}

export default StickList