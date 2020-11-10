import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

export default function CommuIzi() {
    
    const [info, setInfo] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziLifeOnAir({collection: "communIzi", signal : signal}).onSnapshot(function(snapshot) {
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
            info.map()
        </div>
    )
}
