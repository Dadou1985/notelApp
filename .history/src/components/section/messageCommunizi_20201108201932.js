import React, { useEffect, useState } from 'react'
import {Button} from 'reactstrap'
import Avatar from 'react-avatar'

  const MessageCommunizi = ({firebase, user, author, text, hour, date, markup}) =>{
    
    const [info, setInfo] = useState([])
    const dateNote = date.toString()

    Date.prototype.yyyymmdd = function() {
      let day = this.getDate()
      let month = this.getMonth()
      let calendar = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
      let year = this.getFullYear()

      let date = day + " " + calendar[month] + " " + year
      return date
  };

  let dayIn = new Date()
  let today = dayIn.yyyymmdd()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    firebase.moodOnAir({signal : signal}).onSnapshot(function(snapshot) {
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
console.log(info)

    if(date === today){
      if(author === user.username){
        switch (info) {
          case 0:
            info = "Don't f*ck with me today !!"
            return <div>
              <h3>{author}</h3>
              <p>{text}</p>
              <q>écrit le {date} à {hour} </q>
            </div>
            break;
        
          default:
            break;
        }
      }
    }
    
  }

  export default MessageCommunizi