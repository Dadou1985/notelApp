import React, { useState, useContext } from 'react'
import Stick from '../../svg/paper-color.svg'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FirebaseContext } from '../../Firebase'
import Avatar from 'react-avatar'
import  '../css/post-it.css'

const PostIt = ({title, text, markup, author, assignee}) => {

    const [visible, setVisible] = useState(false)
    const { user, firebase } = useContext(FirebaseContext)

    const showSticker = () => {
        setVisible(true)
      }
    
    const removeSticker = (event) => {
        console.log(event)
        firebase.deleteDocument({documentId: user.displayName, collection: "stickers", document: markup})
        setVisible(false)
      }
    
    const handleClose = (event) => {
        console.log(event)
        setVisible(false)
      }
    
      if(assignee !== null){
        
      }
    
    )
}

export default PostIt