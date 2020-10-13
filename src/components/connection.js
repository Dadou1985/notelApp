import React, { useState, useContext } from 'react'
import { Jumbotron, Modal } from 'react-bootstrap'
import { FirebaseContext } from '../Firebase'
import Register from '../components/section/form/register'

const Connection = () =>{

  const [list, setList] = useState(false)
  const [formValue, setFormValue] = useState ({email: "", password: ""})
  
  const { firebase } = useContext(FirebaseContext)
     
      const handleChange = (event) =>{
        event.persist()
        document.getElementById('warning').innerHTML = ""
        setFormValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

     const handleSubmit = (event) => {
        event.preventDefault()
        
        firebase.login({email: formValue.email, password: formValue.password}).catch(error=>{
          if (error.message !== ""){
            return document.getElementById('warning').innerHTML = "Vos identifiants sont erronés !"
          }else{}
        })
      }   

    const handleShow = () => setList(true)
    const handleClose = () => setList(false)
    
    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Jumbotron fluid className="bg-info">
                 <h2 style={{
                   display: "flex",
                   flexFlow: "column",
                   justifyContent: "center",
                   alignItems: "center"
                 }}><p style={{fontFamily: "Charmonman", position: "absolute", top: "5vh"}}>Izi</p>Shift</h2>
            </Jumbotron>
            <form 
              method="post" 
              className="text-center border border-light p-5"
              onSubmit={handleSubmit}>

            <p className="h4 mb-4">Identifiez-vous</p>

            <input 
                value={formValue.email}
                type="email" 
                name="email" 
                className="form-control mb-4" 
                placeholder="Email"
                onChange={handleChange}
                required />

            <input 
                value={formValue.password}
                type="password" 
                name="password" 
                className="form-control mb-4" 
                placeholder="Password"
                onChange={handleChange}
                required />

            <div id="warning" style={{color: 'red'}}></div>

            <button className="btn btn-info btn-block my-4" type="submit">Connecter</button>
            <p style={{textAlign: "center", cursor: 'pointer'}} onClick={handleShow}>S'inscrire ?</p>
            </form>
            <Modal show={list}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
                >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Formulaire d'inscription
                </Modal.Title>
            </Modal.Header>
            {!!firebase &&  
            <Register firebase={firebase} hide={handleClose} />}
             </Modal>
        </div>
    )
}

export default Connection