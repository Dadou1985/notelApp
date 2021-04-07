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
    return db.collection('mySweetHotel')
            .doc('country')
            .collection('France')
            .doc('collection')
            .collection('hotel')
            .doc('region')
            .collection(userDB.hotelRegion)
            .doc('departement')
            .collection(userDB.hotelDept)
            .doc(`${userDB.hotelId}`)
            .collection('notification')
            .doc(document)
            .delete()
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
