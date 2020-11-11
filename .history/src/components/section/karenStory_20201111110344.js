import React, { useEffect, useState, useContext } from 'react'
import {Button} from 'reactstrap'
import Avatar from 'react-avatar'
import { FirebaseContext } from '../../Firebase'
import Divider from '@material-ui/core/Divider'


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
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px"
    }}> 
            <span>
            <Avatar 
                //src="https://besthqwallpapers.com/Uploads/7-5-2018/51482/thumb-super-mario-portrait-cartoon-character-plumber-3d.jpg"
                round={true}
                name={author}
                size="50"
                color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                style={{marginRight: "3vh"}}    />
                {author}
            </span>
            {date}
        </span>
        <Divider />
        <span style={{padding: "15px"}}>{story}</span>
        <Divider />
        <span><img src={require(`../../svg/${img}`)} style={{
            backgroundSize
        }} /></span>
        <span></span>
        <span></span>
    </div>
  )
            
    
  }

  export default KarenStory