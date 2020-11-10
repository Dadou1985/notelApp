import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import Avatar from 'react-avatar'

export default function DarkProfilDetails({firebase, user}) {

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])
    const [formValue, setFormValue] = useState({job: "", level: "", mood: ""})

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)

    const handleChange = (event) =>{
        event.persist()
        setFormValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

      const handleSubmit = event => {
        event.preventDefault()
        setFormValue({job: "", level: "", mood: ""})
        firebase.updateIziProfile({username: user.username, job: formValue.job, level: formValue.level, mood: formValue.mood}).then(handleClose)
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziUserOnAir({email: user.email, signal : signal}).onSnapshot(function(snapshot) {
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
        info.map(flow =>(

        ))
        
    )
}
