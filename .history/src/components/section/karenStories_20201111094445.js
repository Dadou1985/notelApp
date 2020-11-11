import React, { useState, useEffect } from 'react'

export default function KarenStories({}) {

    const [info, setInfo] = useState([])
    const [note, setNote] = useState('')
    const [startDate, setStartDate] = useState(new Date())

    const handleChange = event =>{
        setNote(event.currentTarget.value)
    }

    let hours = new Date().getHours() + "h"
    let minutes = new Date().getMinutes()
    let time = hours + minutes

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

    const handleSubmit = (event) =>{
        event.preventDefault()
        setNote("")
        let marker = startDate.getTime()
        let date = startDate.yyyymmdd()
        firebase.addIziMessage({author: user.username, text: note, hour: time, markup: marker, userId: user.uid, date: date})

    }

    return (
        <div>
            
        </div>
    )
}
