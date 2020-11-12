import React, { useEffect, useState, useContext } from 'react'
import {Button, Input} from 'reactstrap'
import Avatar from 'react-avatar'
import { FirebaseContext } from '../../Firebase'
import Divider from '@material-ui/core/Divider'
import Tips from '../../svg/coin.svg'
import moment from 'moment'
import 'moment/locale/fr'


  const KarenStory = ({author, story, img, date, tips, userRef, markup}) =>{
    
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
 },[])

 useEffect(() => {
     let tipsCount = document.get
 })

  moment.locale("fr")
  let dayIn = Date.now()
  let storyDate = moment(markup).startOf('hour').fromNow()
  console.log(storyDate)

  return (
    <div style={{
        display: "flex",
        flexFlow: "column",
        width: "100%",
        backgroundColor: "rgb(33, 35, 39)",
        borderRadius: "15px",
        marginBottom: "3vh"
    }}>
        <span style={{
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
    }}> 
            <span>
            <Avatar 
                round={true}
                name={author}
                size="50"
                color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                style={{marginRight: "1vw"}}    />
                {author}
            </span>
            {storyDate}
        </span>
        <Divider />
        <span style={{padding: "15px"}}>{story}</span>
        <Divider />
        {img &&
        <span>
            <img src={require(`../../svg/${img}`)} style={{width: "100%", backgroundSize: "cover"}} />
        </span>}
        <span style={{display: "flex", flexFlow: "row", alignItems: "center", justifyContent: "space-between", padding: "15px"}}>
        {info.map(doc => (
            <span>
                <img src={Tips} style={{width: "3vw", marginRight: "1vw", cursor: "pointer"}} id="coin" onClick={()=>{
                    let tipsAmount = doc.tips
                    let tipsUp = tipsAmount + 1
                    let userAccount = doc.id
                    let coin = document.getElementById("coin")
                    return firebase.updateTips({userId: userAccount, tips: tipsUp}).then(coin.style.filter = "contrast(0%)")
                }} />
                <span id="tipsCount">{doc.tips} tips</span>
            </span>))}
            <span>commentaires</span>
        </span>
        <span style={{padding: "15px"}}>
            <Input style={{borderRadius: "15px", backgroundColor: "rgb(67, 66, 66)", border: "none", color: "white"}} placeholder="Ecrire un commentaire..." />
        </span>
    </div>
  )
            
    
  }

  export default KarenStory