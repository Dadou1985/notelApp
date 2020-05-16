import React, {useState, useEffect } from 'react'
import OverbookingForm from './overbookingForm'

const Overbooking = ({user, firebase}) => {

    const [info, setInfo] = useState([])

    useEffect(() => {
        let unsubscribe
        
                unsubscribe = firebase.overbookingOnAir().onSnapshot(function(snapshot) {
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
           
     },[])
    
     return (
        <div style={{
            display: "flex",
            flexFlow: "row wrap",
            minHeight:"10vh",
            maxHeight: "40vh",
            justifyContent: "start"
        }}>
            {info.map(stick =>(
                <OverbookingForm
                key={stick.markup}
                hotel={stick.hotelName}
                client={stick.client}
                room={stick.totalRoom}
                night={stick.totalNight}
                pec={stick.pec}
                pax={stick.pax}
                markup={stick.id}
                />
            ))}
        </div>
    )
}

export default Overbooking