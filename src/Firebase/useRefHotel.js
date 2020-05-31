import React, { useContext } from 'react'
import { FirebaseContext } from '..Firebase'


export default function RefHotel() {

    const {firebase, user} = useContext(FirebaseContext)

    const userRefHotel = firebase.getUserFields({documentId: user.username})
     .get()
     .then(function(doc) {
          if (doc.exists) {
            const refHotel = doc.data().userHotel
            return refHotel
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });;

    console.log(userRefHotel)

}
