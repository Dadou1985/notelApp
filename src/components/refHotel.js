import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../Firebase'

const RefHotel = () => {

    const {firebase, user} = useContext(FirebaseContext)

    const [field, setfield] = useState({})

    const userRefHotel = firebase.getUserFields({documentId: user.username})
    
    userRefHotel.get()
     .then(function(doc) { 
            console.log(doc.data())
            setfield(doc.data().userHotel)
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });


      const userRefHotel = firebase.getUserProfile({userId: user.uid})

    userRefHotel.then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data());
            return setfield(doc.data().userHotel)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

      console.log(field)


    return (
        <>
        {field}
        </>
        )
}

export default RefHotel
