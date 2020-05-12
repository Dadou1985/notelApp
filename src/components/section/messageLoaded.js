import React, { useContext, useEffect, useState } from 'react'
import {Card} from 'react-bootstrap'
import {Button} from 'reactstrap'
import { FirebaseContext } from '../../Firebase'


  const MessageLoaded = ({author, text, hour, markup, blueprint, date}) =>{

    const [username, setUsername] = useState(null)
    const { user, firebase } = useContext(FirebaseContext)
    
    const handleRemove = () =>{
        firebase.deleteDocument({collection: "message", document: markup})
    }

    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal

      const currentUser = firebase.getUserId({signal : signal})
      setUsername(currentUser.uid)
      return () => {
        abortController.abort()
      }
    }, [])

    if(blueprint === username){
        return(
            <Card className="shadow" style={{ 
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

  export default MessageLoaded