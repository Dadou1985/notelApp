import React, {useState } from 'react'
import { Form, Button } from 'react-bootstrap'



const Lost = ({user, firebase}) =>{

    const [formValue, setFormValue] = useState({type: "", place: "", details: "", description: ""})

    const hitek = "Hi-tech"
    const id = "Documents officiels"
    const clothes = "Vêtements"
    const others = "Autres"

    const hall = "Hall"
    const restaurant = "Restaurant"
    const parking = "Parking"
    const wc = "Toilettes"
    const floors = "Etages"
    const otherPlace = "Ailleurs"

    const handleChange = (event) =>{
        event.persist()
        setFormValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

      const handleSubmit = event => {
        event.preventDefault()
        setFormValue("")
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()
        let time = day + "/" + month + "/" + year
        let marker = Date.now()
        firebase.addLostFound({documentId: user.displayName, author: user.username, date: time, type: formValue.type, markup: marker, place: formValue.place, details: formValue.details, description: formValue.description})
    }

    return(
      <div style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-around",
              padding: "5%",
              textAlign: "center"
          }}>
              <Form.Row>
                  <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Quel type d'objet ?</Form.Label><br/>
                      <select class="selectpicker" value={formValue.type} name="type" onChange={handleChange} 
                      style={{width: "20vw", 
                      height: "6vh", 
                      border: "1px solid lightgrey", 
                      borderRadius: "3px",
                      backgroundColor: "white"}}>
                          <option></option>
                          <option>High Tech</option>
                          <option>Documents Officiels</option>
                          <option>Vêtements</option>
                          <option>Autres</option>
                      </select>
                  </Form.Group>
              </Form.Row>
              <Form.Row>
                  <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Lieu ?</Form.Label><br/>
                      <select class="selectpicker" value={formValue.place} name="place" onChange={handleChange} 
                      style={{width: "20vw", 
                      height: "6vh", 
                      border: "1px solid lightgrey", 
                      borderRadius: "3px",
                      backgroundColor: "white"}}>
                          <option></option>
                          <option>Hall</option>
                          <option>Restaurant</option>
                          <option>Parking</option>
                          <option>Toilettes</option>
                          <option>Etages</option>
                          <option>Autres</option>
                      </select>
                  </Form.Group>
              </Form.Row>
              <Form.Row>
                  <Form.Group controlId="description">
                  <Form.Label>Description de l'objet</Form.Label>
                  <Form.Control type="text" placeholder="ex: un i-phone noir" style={{width: "35vw"}} value={formValue.description} name="description" onChange={handleChange} />
                  </Form.Group>
              </Form.Row>
              <Form.Row>
                  <Form.Group controlId="details">
                      <Form.Label>Plus de détails</Form.Label>
                      <Form.Control as="textarea" rows="3" style={{width: "48vw", maxHeight: "15vh"}} value={formValue.details} name="details" onChange={handleChange}  />
                  </Form.Group>
              </Form.Row>
              <Button variant="outline-success" onClick={handleSubmit}>Enregistrer</Button>
          </div>
    )
}

export default Lost