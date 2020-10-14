import React, { useContext, useEffect, useState } from 'react'
import {Card} from 'react-bootstrap'
import {Button} from 'reactstrap'
import { FirebaseContext } from '../../Firebase'

  const MessageLoaded = ({author, text, hour, markup, blueprint, date}) =>{

    const [username, setUsername] = useState(null)
    const { user, firebase } = useContext(FirebaseContext)
    
    const handleRemove = () =>{
        firebase.deleteDocument({documentId: user.displayName, collection: "message", document: markup})
    }

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
            <Card className="shadow"  style={{ 
            maxWidth: "84%",
            backgroundColor: "lightgrey",
            fontSize: "small",
            marginLeft: "7vw",
            marginBottom: "2%"}}>
            <Card.Header className="d-flex justify-content-between text-right bg-success font-weight-bolder">{author}<Button close onClick={handleRemove} /></Card.Header>
            <Card.Body className="bg-light">
                <Card.Text>
                {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-light blockquote-footer text-right">noté le {date} à {hour} </Card.Footer>
        </Card>
        )
      }else{
        return(
          <Card className="shadow" style={{ 
            maxWidth: "84%",
            backgroundColor: "lightgrey",
            fontSize: "small",
            marginLeft: "7vw",
            marginBottom: "2%"}}>
            <Card.Header className="d-flex justify-content-between text-right font-weight-bolder">{author}</Card.Header>
            <Card.Body className="bg-light">
                <Card.Text>
                {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-light blockquote-footer text-right">noté le {date} à {hour} </Card.Footer>
        </Card>
        )
      }
        
          }else{
            if(date === today){
              return(
                <Card className="shadow" style={{ 
                  maxWidth: "84%",
                  backgroundColor: "lightgrey",
                  fontSize: "small",
                  marginBottom: "2%"}}>
                  <Card.Header className="font-weight-bolder" style={{backgroundColor: "mediumturquoise"}}>{author}</Card.Header>
                  <Card.Body className="bg-light">
                      <Card.Text>
                      {text}
                      </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-light blockquote-footer text-right">notée le {date} à {hour} </Card.Footer>
              </Card>
              )
            }else{
              return(
                <Card className="shadow" style={{ 
                  maxWidth: "84%",
                  backgroundColor: "lightgrey",
                  fontSize: "small",
                  marginBottom: "2%"}}>
                  <Card.Header className="font-weight-bolder">{author}</Card.Header>
                  <Card.Body className="bg-light">
                      <Card.Text>
                      {text}
                      </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-light blockquote-footer text-right">notée le {date} à {hour} </Card.Footer>
              </Card>
              )
            }
    }
    
  }

  export default MessageLoaded