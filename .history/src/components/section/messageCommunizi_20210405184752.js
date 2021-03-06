import React, { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import moment from 'mom'

  const MessageCommunizi = ({author, text, hour, date, markup, userRef, mood}) =>{
    
    const { userDB, setUserDB } = useContext(FirebaseContext)

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

  if(date === today){
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
    if(userRef === userId){
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