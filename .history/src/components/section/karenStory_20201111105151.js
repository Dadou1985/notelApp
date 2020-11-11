import React, { useEffect, useState, useContext } from 'react'
import {Button} from 'reactstrap'
import Avatar from 'react-avatar'
import { FirebaseContext } from '../../Firebase'


  const KarenStory = ({author, story, img, date, markup, userRef}) =>{
    
    const [info, setInfo] = useState([])
    //const dateNote = date.toString()
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

  return (
    <div style={{
        display: "flex",
        flexFlow: "column",
        width: "100%",
        backgroundColor: "rgb(33, 35, 39)",
        borderRadius: "15px"
    }}>
        <span style={{
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        padding: "5px"
    }}> 
        <s
        </span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
            
    
  }

  export default KarenStory