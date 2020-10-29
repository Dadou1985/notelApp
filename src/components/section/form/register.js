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
        {/*const validationInfo = firebase.getUserFields({refHotel: formValue.refHotel, username: formValue.username})
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
    console.log(validationInfo)*/}
        //if(validationInfo) {
            if(formValue.password === formValue.confPassword){
                firebase.freeRegister({username: formValue.username, email: formValue.email, password: formValue.password, refHotel: formValue.refHotel})
                .catch(error=>{
                    if(error.message){
                        setErrorMessage("Inscription invalide")
                        //return firebase.deleteUserAuth()
                    }else{}
                })
                return hide()
            }else{
                setFormValue({username: "",email: "", password: "", confPassword: "", refHotel: ""})
                return setErrorMessage("Désolé, confirmation de mot de passe incorrecte !")
            }
        //}else{
            //setMessageError("Désolé, l'administrateur n'a pas encore validé votre inscription.")
        //}
      }

    return (
        <div>
            <Modal.Body>
            <div className="register_modal_container">
                <Form.Group controlId="formGroupName" className="register_input">
                    <Form.Control value={formValue.username} name="username" type="text" placeholder="Entrer votre prénom et votre nom" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupEmail" className="register_input">
                    <Form.Control value={formValue.email} name="email" type="email" placeholder="Entrer un e-mail" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupPassword" className="register_input">
                    <Form.Control value={formValue.password} name="password" type="password" placeholder="Entrer un mot de passe" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupConfPassword" className="register_input">
                    <Form.Control value={formValue.confPassword} name="confPassword" type="password" placeholder="Confirmer le mot de passe" onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="formGroupRefHotel" className="register_input">
                    <Form.Control value={formValue.refHotel} name="refHotel" type="text" placeholder="Référence Hôtel" onChange={handleChange} required />
                </Form.Group>
                {!!errorMessage && <div id="wrongConf">{errorMessage}</div>}
                {!!messageError && <div id="uncompleteRegistration">{messageError}</div>}
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={handleSubmit}>Enregistrer</Button>
            </Modal.Footer>
         </div>
    )
}

export default Register