import React, { useContext, useEffect, useState } from 'react'
import {Button} from 'reactstrap'
import Avatar from 'react-avatar'
import { FirebaseContext } from '../../Firebase'

  const MessageCommunizi = ({author, text, hour, markup, blueprint, date}) =>{

    const { user, firebase } = useContext(FirebaseContext)
    
    const dateNote = date.toString()

    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal

      const currentUser = firebase.getUserId({signal : signal})
      setUsername(currentUser.uid)
      return () => {
        abortController.abort()
      }
    }, [])

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

    if(blueprint === username){
      if(date === today){
        return(
            <Card className="shadow user_Message">
            <Card.Header className="text-right bg-success message_header">{author}<Button close onClick={handleRemove} /></Card.Header>
            <Card.Body className="bg-light">
                <Card.Text>
                {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer id="userMessage_footer" className="blockquote-footer text-right message_footer">
              <Avatar 
              className="avatar_icon"
              name={author}
              round={true}
              size="25"
              color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                />noté le {date} à {hour} </Card.Footer>
        </Card>
        )
      }else{
        return(
          <Card className="shadow user_Message">
            <Card.Header className="text-right message_header">{author}</Card.Header>
            <Card.Body className="bg-light">
                <Card.Text>
                {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer id="oldMessage_footer" className="bg-light blockquote-footer text-right">
              <Avatar 
              className="avatar_icon"
              name={author}
              round={true}
              size="25"
              color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                />noté le {date} à {hour} </Card.Footer>
        </Card>
        )
      }
        
          }else{
            if(date === today){
              return(
                <Card className="shadow incomingMessage">
                  <Card.Header className="message_header" style={{backgroundColor: "mediumturquoise"}}>{author}</Card.Header>
                  <Card.Body className="bg-light">
                      <Card.Text>
                      {text}
                      </Card.Text>
                  </Card.Body>
                  <Card.Footer id="incomingMessage_footer" className="bg-light blockquote-footer text-right">
                    <Avatar 
                    className="avatar_icon"
                    name={author}
                    round={true}
                    size="25"
                    color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                      />notée le {date} à {hour} </Card.Footer>
              </Card>
              )
            }else{
              return(
                <Card className="shadow incomingMessage">
                  <Card.Header className="message_header">{author}</Card.Header>
                  <Card.Body className="bg-light">
                      <Card.Text>
                      {text}
                      </Card.Text>
                  </Card.Body>
                  <Card.Footer id="oldMessage_footer" className="bg-light blockquote-footer text-right">
                  <Avatar 
                  className="avatar_icon"
                  name={author}
                  round={true}
                  size="25"
                  color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                    />notée le {date} à {hour} </Card.Footer>
              </Card>
              )
            }
    }
    
  }

  export default MessageLoaded