import React, { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import moment from 'moment'

  const MessageCommunizi = ({author, text, hour, date, markup, mood}) =>{
    const [user, setUser] = useState(auth.currentUser)

    const { userDB, setUserDB } = useContext(FirebaseContext)

  if(moment(date).format('L') === moment(today).format('L')){
    if(userRef === userId){
      return (
        <span className="darkTextUser">
          <span style={{fontWeight: "bolder", color: "black"}}>{author}</span>
          <div className="darkTextBodyUser">
          <span style={{marginBottom: "2%", color: "lightskyblue", fontFamily: "Coiny"}}>{text}</span>
            <span style={{color: "gray", fontSize: "85%", textAlign: "right"}}><i>le {date} à {hour}</i></span>
          </div>
        </span>
      )
    }else{
      return (
        <span className="darkTextOther">
          <span style={{fontWeight: "bolder", color: "black"}}>{author}</span>
          <div className="darkTextBodyOther">
          <span style={{marginBottom: "2%", color: "lightskyblue", fontFamily: "Coiny"}}>{text}</span>
            <span style={{color: "gray", fontSize: "85%", textAlign: "right"}}><i>le {date} à {hour}</i></span>
          </div>
        </span>
      )
    }
  }else{
    if(userRef === user){
      return (
        <span className="oldDarkTextUser" style={{fontWeight: "bolder"}}>
          <span style={{color: "gray"}}>{author}</span>
          <div className="oldDarkTextBodyUser">
          <span style={{marginBottom: "2%", color: "lightskyblue", fontFamily: "Coiny"}}>{text}</span>
            <span style={{color: "gray", fontSize: "85%", textAlign: "right"}}><i>le {date} à {hour}</i></span>
          </div>
        </span>
      )
    }else{
      return (
        <span className="oldDarkTextOther" style={{fontWeight: "bolder"}}>
          <span style={{color: "gray"}}>{author}</span>
          <div className="oldDarkTextBodyOther">
          <span style={{marginBottom: "2%", color: "lightskyblue", fontFamily: "Coiny"}}>{text}</span>
            <span style={{color: "gray", fontSize: "85%", textAlign: "right"}}><i>le {date} à {hour}</i></span>
          </div>
        </span>
      )
    }
  }
            
    
  }

  export default MessageCommunizi