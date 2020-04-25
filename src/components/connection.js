import React, { useState, useContext } from 'react'
import { Jumbotron } from 'react-bootstrap'
import { FirebaseContext } from '../Firebase'
import Register from '../components/section/form/register'

const Connection = () =>{

  const [formValue, setFormValue] = useState ({email: "", password: ""})
  const [popup, setPopup] = useState("")
  

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

      const handleShowRegister = () =>{
        setPopup(<Register hide={()=>setPopup('')} />)
      }


    
    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Jumbotron fluid className="bg-info">
                 <h2>Notel</h2>
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
            <p style={{textAlign: "center", cursor: 'pointer'}} onClick={handleShowRegister}>S'inscrire ?</p>
            </form>
            <div style={{
                maxHeight: "38vh",
                overflow: "auto",
                marginBottom: "2vh"
                }}>
              {popup}
            </div>
        </div>
    )
}

export default Connection