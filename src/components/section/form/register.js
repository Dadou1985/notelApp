import React, { useState } from 'react'
import {Form, Button, Modal} from 'react-bootstrap'

const Register = ({firebase, hide}) => {

    const [formValue, setFormValue] = useState({username: "" || undefined, email: "" || undefined, password: "" || undefined, confPassword: "" || undefined, refHotel: "" || undefined})
    const [errorMessage, setErrorMessage] = useState('')
    const [messageError, setMessageError] = useState('')


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
        setFormValue("")
        const validationInfo = firebase.getUserFields({refHotel: formValue.refHotel, username: formValue.username})
        .get()
        .then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data().adminRegistration;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })
        console.log(validationInfo)
        if(validationInfo) {
            if(formValue.password === formValue.confPassword){
                firebase.register({username: formValue.username, email: formValue.email, password: formValue.password, refHotel: formValue.refHotel})
                .catch(error=>{
                    if(error.message){
                        setErrorMessage("Inscription invalide")
                        return firebase.deleteUserAuth()
                    }else{}
                })
                return hide()
            }else{
                setFormValue({username: "",email: "", password: "", confPassword: "", refHotel: ""})
                return setErrorMessage("Désolé, confirmation de mot de passe incorrecte !")
            }
        }else{
            setMessageError("Désolé, l'administrateur n'a pas encore validé votre inscription.")
        }
      }

    return (
        <div>
            <Modal.Body>
            <div style={{
                    display: "flex",
                    flexFlow: "column wrap",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: "5%",
                    textAlign: "center"
                }}>
                <Form.Group controlId="formGroupName">
                    <Form.Control style={{width: "20vw"}} value={formValue.username} name="username" type="text" placeholder="Entrer un nom" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control style={{width: "20vw"}} value={formValue.email} name="email" type="email" placeholder="Entrer un email" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Control style={{width: "20vw"}} value={formValue.password} name="password" type="password" placeholder="Entrer un mot de passe" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupConfPassword">
                    <Form.Control style={{width: "20vw"}} value={formValue.confPassword} name="confPassword" type="password" placeholder="Confirmer le mot de passe" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupRefHotel">
                    <Form.Control style={{width: "20vw"}} value={formValue.refHotel} name="refHotel" type="text" placeholder="Référence Hotel" onChange={handleChange} required />
                </Form.Group>
                {!!errorMessage && <div id="wrongConf" style={{color: 'red', textAlign: 'center'}}>{errorMessage}</div>}
                {!!messageError && <div id="uncompleteRegistration" style={{color: 'red', textAlign: 'center'}}>{messageError}</div>}
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={handleSubmit}>Enregistrer</Button>
            </Modal.Footer>
         </div>
    )
}

export default Register