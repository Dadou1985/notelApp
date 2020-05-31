import React, { useState, useContext } from 'react'
import { Snackbar } from '@material-ui/core'
import { FirebaseContext } from '../../Firebase'


export default function NotificationsBar({message, markup}) {

    const [visible, setVisible] = useState(true)
    const { firebase } = useContext(FirebaseContext)

    const showNotification = () => {
        setVisible(true)
      }

    const removeNotifications = (event) => {
    console.log(event)
    firebase.deleteDocument({collection: "notifications", document: markup})
    setVisible(false)
    }


    return (
        <Snackbar
        open={visible}
        onClose={removeNotifications}
        message={message}
        />
    )
}
