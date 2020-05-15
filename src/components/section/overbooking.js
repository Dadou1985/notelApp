import React, {useState, useEffect } from 'react'
import OverbookingForm from './overbookingForm'

const Overbooking = ({user, firebase}) => {

    const [overbooking, setoverbooking] = useState([])

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
                    setoverbooking(snapStick)
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
            {overbooking.map(stick =>(
                <OverbookingForm
                key={stick.id}
                hotel={stick.hotelName}
                client={stick.client}
                room={stick.totalRoom}
                night={stick.totalNight}
                pec={stick.pec}
                pax={stick.pax}
                markup={stick.markup}
                />
            ))}
        </div>
    )
}

export default Overbooking