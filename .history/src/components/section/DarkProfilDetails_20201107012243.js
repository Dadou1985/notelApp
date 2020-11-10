import React, { useState, useContext, useEffect } from 'react'

export default function DarkProfilDetails() {

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziUserOnAir({username: user.username, signal : signal}).onSnapshot(function(snapshot) {
                    const snapInfo = []
                  snapshot.forEach(function(doc) {          
                    snapInfo.push({
                        id: doc.id,
                        ...doc.data()
                      })        
                    });
                    console.log(snapInfo)
                    setInfo(snapInfo)
                });
                return () => {
                    abortController.abort()
                }
           
     },[])

    return (
        <div>
            {info.map(flow =>(
                <div>
                    <h2>{flow.id}</h2>
                    <p>{flow.hotelName}</p>
                    <div>
                        <span>Poste: {flow.job}</span>
                        <span>Level: {flow.category}</span>
                    </div>
                    <p>Tips: {</p>
                </div>
            ))}
        </div>
    )
}
