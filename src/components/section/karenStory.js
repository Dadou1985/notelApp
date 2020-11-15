import React, { useEffect, useState, useContext } from 'react'
import {Button, Input} from 'reactstrap'
import Avatar from 'react-avatar'
import { FirebaseContext } from '../../Firebase'
import Divider from '@material-ui/core/Divider'
import Tips from '../../svg/coin.svg'
import moment from 'moment'
import 'moment/locale/fr'
import Arrow from '../../svg/arrowDown.svg'
import Comment from '../../svg/comment.svg'


  const KarenStory = ({author, story, img, date, tips, userRef, markup, storyRef}) =>{
    
    const [info, setInfo] = useState([])
    const [details, setDetails] = useState([])
    const [comment, setComment] = useState("")
    const { user, firebase } = useContext(FirebaseContext)

    Date.prototype.yyyymmdd = function() {
      let day = this.getDate()
      let month = this.getMonth()
      let calendar = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
      let year = this.getFullYear()

      let date = day + " " + calendar[month] + " " + year
      return date
  };

  const handleChange = (event) =>{
    setComment(event.currentTarget.value)
}   

  const handleShow = () => {
      let comment = document.getElementById("comment")
      let arrow = document.getElementById("arrow")
      if (comment.style.display === "none") {
        comment.style.display = "block"
        arrow.style.transform = "rotate(0.5turn)"
      }else{
        comment.style.display = "none"
        arrow.style.transform = "rotate(0turn)"
    }
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      setComment("")
      firebase.addCommentKarenStories({storyId: storyRef, author: user.username, comment: comment, date: new Date()})
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    firebase.commentOnAir({storyId: storyRef, signal : signal}).onSnapshot(function(snapshot) {
                const snapInfo = []
              snapshot.forEach(function(doc) {          
                snapInfo.push({
                    id: doc.id,
                    ...doc.data()
                  })        
                });
                console.log(snapInfo)
                setDetails(snapInfo)
            });
            return () => {
                abortController.abort()
            }
 },[firebase, userRef])

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

 console.log(details)


  moment.locale("fr")
  let dayIn = Date.now()
  let storyDate = moment(markup).startOf('hour').fromNow()
  let commentDate = moment(details.markup).startOf('hour').fromNow()
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
        <Divider style={{height: "1vh"}} />
        <span style={{padding: "15px"}}>{story}</span>
        <Divider style={{height: "1vh"}} />
        {img &&
        <span>
            <img src={img} style={{width: "100%", backgroundSize: "cover"}} />
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
        </span>
        <div style={{
            display: "flex",
            flexFlow: "row",
            padding: "15px"}}>
            <Input style={{
                width: "95%", 
                borderRadius: "15px", 
                backgroundColor: "rgb(67, 66, 66)", 
                border: "none", 
                color: "white", 
                marginRight: "1vw"}} 
                placeholder="Ecrire un commentaire..." 
                onChange={handleChange}
                value={comment} />
            <img src={Comment} alt="comment" style={{width: "2vw", cursor: "pointer", filter: "invert(100%)"}} onClick={handleSubmit} />
        </div>
        <Divider style={{height: "1vh"}} />
        <div style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "space-between",
            padding: "15px"
        }}>
            <span>{details.length} commentaires</span>
            <img src={Arrow} alt="arrow" style={{width: "1vw", cursor: "pointer", filter: "invert(100%)"}} id="arrow" onClick={handleShow} />
        </div>
        {details.map(flow => (
        <div id="comment" style={{display: "none"}}>
            <div style={{
                display: "flex",
                flexFlow: "row",
                padding: "15px"
            }}>
                <span>
                <Avatar 
                    round={true}
                    name={flow.author}
                    size="30"
                    color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                    style={{marginRight: "1vw"}}    />
                </span>
                <div className="comment">
                    <span style={{marginBottom: "2%"}}>{flow.comment}</span>
                    <span style={{color: "gray", fontSize: "85%", textAlign: "right"}}><i>{commentDate}</i></span>
                </div>
            </div>
        </div>
        ))}
    </div>
  )
            
    
  }

  export default KarenStory