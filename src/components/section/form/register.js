import React, { useState, useContext } from 'react'
import {Form, Button} from 'react-bootstrap'
import {FirebaseContext} from '../../../Firebase'

const Register = ({hide}) => {

    const [formValue, setFormValue] = useState({username: "", email: "", password: "", confPassword: "", refHotel: ""})
    const [errorMessage, setErrorMessage] = useState('')
    const {firebase} = useContext(FirebaseContext)

    const handleChange = (event) =>{
        event.persist()
        setErrorMessage('')
        setFormValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (formValue.password === formValue.confPassword){
            firebase.register({username: formValue.username, email: formValue.email, password: formValue.password}).catch(error=>{
                if(error.message){
                    setErrorMessage(error.message)
                }else{}
            })
        }else{
            setErrorMessage("Désolé, confirmation de mot de passe incorrecte !")
        }
      }

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            position: "absolute",
            width: "30vw",
            height: "72vh",
            border: "1px solid lightgrey",
            top: "13vh",
            left: "35vw",
            backgroundColor: "white",
            borderRadius: "3%"}}>
                <h5 className="bg-light" style={{textAlign: "center", padding: "3%"}}>Formulaire d'inscription</h5>
            <Form style={{
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "space-between",
            padding: '5%'}}
            onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupName">
                <Form.Control value={formValue.username} name="username" type="text" placeholder="Entrer un pseudo" onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
                <Form.Control value={formValue.email} name="email" type="email" placeholder="Entrer un email" onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Control value={formValue.password} name="password" type="password" placeholder="Entrer un mot de passe" onChange={handleChange} required />
            </Form.Group>
            {!!errorMessage && <div id="wrongConf" style={{color: 'red', textAlign: 'center'}}>{errorMessage}</div>}
            {/*<div id="wrongConf" style={{color: 'red', textAlign: 'center'}}></div>*/}
            <Form.Group controlId="formGroupConfPassword">
                <Form.Control value={formValue.confPassword} name="confPassword" type="password" placeholder="Confirmer le mot de passe" onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formGroupRefHotel">
                <Form.Control value={formValue.refHotel} name="refHotel" type="text" placeholder="Référence Hotel" onChange={handleChange} required />
            </Form.Group>        
            <Button variant="success" type="submit" size="md" block>
                S'enregistrer
            </Button>
            <Button variant="outline-info" size="md" block onClick={hide}>
                Annuler
            </Button>
            </Form>
        </div>
    )
}

export default Register