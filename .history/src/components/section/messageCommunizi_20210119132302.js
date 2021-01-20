import React, { useEffect, useState, useContext } from 'react'
import {Button} from 'reactstrap'
import Avatar from 'react-avatar'
import { FirebaseContext } from '../../Firebase'


  const MessageCommunizi = ({author, text, hour, date, markup, userRef, mood}) =>{
    
    const [info, setInfo] = useState([])
    const dateNote = date.toString()
    const { user, firebase } = useContext(FirebaseContext)

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

 const userId = user.uid
console.log(userId)

const renderSwitch = (mood) => {
  switch(mood) {
    case 'angry':
      return <span style={{marginBottom: "2%", color: "red", fontSize: "2em", fontFamily: "Bungee Inline"}}>{text}</span>;
    case 'happy':
      return <span style={{marginBottom: "2%", color: "blue", fontFamily: "Coiny"}}>{text}</span>;
    case 'scared':
      return <span style={{marginBottom: "2%", }}>{text}</span>;
    case 'depressed':
      return <span style={{marginBottom: "2%"}}>{text}</span>;
    case 'emergency':
      return <span style={{marginBottom: "2%"}}>{text}</span>;
    default:
      return <span style={{marginBottom: "2%"}}>{text}</span>;
  }
}


useEffect(() => {
  const abortController = new AbortController()
  const signal = abortController.signal
  firebase.iziUserOnAir2({userId: userRef, signal : signal}).onSnapshot(function(snapshot) {
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
},[firebase, userRef])

  if(date === today){
    if(userRef === userId){
      return (
        <span className="darkTextUser">
          {info.map(flow => (<span>{author} - <i>{flow.mood}</i></span>))}
          <div className="darkTextBodyUser">
            <span style={{marginBottom: "2%"}}>{text}</span>
            <span style={{color: "gray", fontSize: "85%", textAlign: "right"}}><i>le {date} à {hour}</i></span>
          </div>
        </span>
      )
    }else{
      return (
        <span className="darkTextOther">
          {info.map(flow => (<span>{author} - <i>{flow.mood}</i></span>))}
          <div className="darkTextBodyOther">
            <span style={{marginBottom: "2%"}}>{text}</span>
            <span style={{color: "gray", fontSize: "85%", textAlign: "right"}}><i>le {date} à {hour}</i></span>
          </div>
        </span>
      )
    }
  }else{
    if(userRef === userId){
      return (
        <span className="oldDarkTextUser">
          {info.map(flow => (<span style={{color: "gray"}}>{author} - <i>{flow.mood}</i></span>))}
          <div className="oldDarkTextBodyUser">
            <span style={{marginBottom: "2%", color: "gray"}}>{text}</span>
            <span style={{color: "gray", fontSize: "85%", textAlign: "right"}}><i>le {date} à {hour}</i></span>
          </div>
        </span>
      )
    }else{
      return (
        <span className="oldDarkTextOther">
          {info.map(flow => (<span style={{color: "gray"}}>{author} - <i>{flow.mood}</i></span>))}
          <div className="oldDarkTextBodyOther">
            <span style={{marginBottom: "2%", color: "gray"}}>{text}</span>
            <span style={{color: "gray", fontSize: "85%", textAlign: "right"}}><i>le {date} à {hour}</i></span>
          </div>
        </span>
      )
    }
  }
            
    
  }

  export default MessageCommunizi