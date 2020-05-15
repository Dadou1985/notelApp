import React, { useContext, useEffect, useState} from 'react'
import {FormControl, Button} from 'react-bootstrap'
import { FirebaseContext } from '../../../Firebase'


const RoomAvailable = () => {

    const { user, firebase } = useContext(FirebaseContext)
    const [formValue, setFormValue] = useState({room: ""})

    const handleChange = (event) =>{
        event.persist()
        setFormValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

      const handleSubmit = event => {
        event.preventDefault()
        firebase.updateRoomAvailable({room: formValue.room})
    }

    return (
        <div style={{
            display:"flex",
            flexFlow: "row",
            justifyContent: "space-around",
            height: "6vh",
            alignItems: "center"
          }}>
            <b>Nombre de chambres restantes :</b>
              <FormControl style={{width: "4vw", height: "6vh"}}
                type="number"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={formValue.room}
                name="room"
                onChange={handleChange}/>
              <Button variant="success" onClick={handleSubmit}>Actualiser</Button>
          </div>
    )
}

export default RoomAvailable