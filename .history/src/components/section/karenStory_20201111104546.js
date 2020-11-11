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
    <div st>
        <span>
        <Avatar 
            //src="https://besthqwallpapers.com/Uploads/7-5-2018/51482/thumb-super-mario-portrait-cartoon-character-plumber-3d.jpg"
            round={true}
            name={author}
            size="20"
            color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
            style={{filter: "drop-shadow(1px 1px 2px)", marginBottom: "3vh"}}    />
            {author}
        </span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
            
    
  }

  export default KarenStory