import React, {useState, useEffect, useContext } from 'react'
import { Snackbar } from '@material-ui/core'
import { FirebaseContext, db, auth } from '../../Firebase'


export default function NotificationsBar({message, markup}) {

    const [visible, setVisible] = useState(true)
    const { user, firebase } = useContext(FirebaseContext)

    const showNotification = () => {
        setVisible(true)
      }

    const removeNotifications = (event) => {
    console.log(event)
    firebase.deleteDocument({documentId: user.displayName, collection: "notifications", document: markup})
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
