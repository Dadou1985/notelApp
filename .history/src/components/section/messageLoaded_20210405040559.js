import React, { useContext, useEffect, useState } from 'react'
import {Card} from 'react-bootstrap'
import {Button} from 'reactstrap'
import Avatar from 'react-avatar'
import { FirebaseContext } from '../../Firebase'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import moment from 'moment'


  const MessageLoaded = ({author, text, hour, title, blueprint, date, key}) =>{

    const [username, setUsername] = useState(null)
    const [expanded, setExpanded] = useState('')
    const { user, firebase } = useContext(FirebaseContext)

    const handleChangeExpanded = (title) => setExpanded(title)
    
    const handleRemove = () =>{
        firebase.deleteDocument({documentId: user.displayName, collection: "message", document: title})
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
          <Accordion allowZeroExpanded>
                  <AccordionItem key={key} onClick={() => handleChangeExpanded(title)}>
                    <AccordionItemHeading style={{
                      backgroundColor: "rgb(33, 35, 39)", 
                      padding: "2%",
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                      marginBottom: "1vh"
                      }}>
                        <AccordionItemButton style={{outline: "none"}}>
                          <Avatar 
                            round={true}
                            name={author}
                            size="30"
                            color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                            style={{marginRight: "1vw"}} />
                            {title}
                            <i style={{color: "gray", float: "right", fontSize: "13px"}}>{moment(key).format('ll')}</i>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel style={{backgroundColor: 'lightgray'}}>
                      {text}
                    </AccordionItemPanel>
                  </AccordionItem>
              </Accordion>
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