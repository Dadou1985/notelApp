import React, { useContext, useEffect, useState } from 'react'
import {Button} from 'reactstrap'
import Avatar from 'react-avatar'
import { FirebaseContext } from '../../Firebase'

  const MessageCommunizi = ({firebase, user, author, text, hour, date, markup}) =>{

    const { user, firebase } = useContext(FirebaseContext)
    
    const dateNote = date.toString()

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

    if(date === today){
      switch (moo) {
        case value:
          
          break;
      
        default:
          break;
      }
    }
    
  }

  export default MessageCommunizi