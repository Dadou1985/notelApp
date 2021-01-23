import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import Avatar from 'react-avatar'
import AvatarUi from '@material-ui/core/Avatar'


export default function DarkProfilDetails({firebase, user}) {

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])
    const [formValue, setFormValue] = useState({hotelName: "", job: "", level: "", mood: ""})

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)

    const handleChange = (event) =>{
        event.persist()
        setFormValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

      const handleSubmit = event => {
        event.preventDefault()
        setFormValue({hotelName: "", job: "", level: "", mood: ""})
        firebase.updateIziProfile({username: user.username, hotelName: formValue.hotelName, job: formValue.job, level: formValue.level, mood: formValue.mood}).then(handleClose)
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziUserOnAir({email: user.email, signal : signal}).onSnapshot(function(snapshot) {
                    const snapInfo = []
                  snapshot.forEach(function(doc) {          
                    snapInfo.push({
                        id: doc.id,
                        ...doc.data()
                      })        
                    });
                    console.log(snapInfo)
                    setInfo(snapInfo)
                });
                return () => {
                    abortController.abort()
                }
     },[firebase, user.email])

     console.log(user.email)

    return (
        info.map(flow =>(
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "70%",
                height: "50%",
                color: "lightgray",
                zIndex: "2", 
                borderRadius: "15px",
            }}>
                <div style={{
                    display: 'flex',
                    flexFlow: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    backgroundColor: "rgb(33, 35, 39)", 
                    width: "100%", 
                    height: "40%", 
                    marginBottom: "1%", 
                    borderTopLeftRadius: "15px", 
                    borderTopRightRadius: "15px"}}>
                    <AvatarUi
                    style={{width: "5vw", 
                    height: "10vh", 
                    backgroundColor: "'#'+(Math.random()*0xFFFFFF<<0).toString(16)", 
                    marginBottom: "2vh"}}
                    />
                    {/*<Avatar 
                        src="https://besthqwallpapers.com/Uploads/7-5-2018/51482/thumb-super-mario-portrait-cartoon-character-plumber-3d.jpg"
                        round={true}
                        name={flow.id}
                        size="150"
                    color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)} />*/}
                </div>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    backgroundColor: "rgb(33, 35, 39)",  
                    width: "100%", 
                    height: "45%", 
                    marginBottom: "1%"
                }}>
                    <h2 style={{
                        filter: "drop-shadow(1px 1px 1px)", 
                        marginTop: "1vh", 
                        marginBottom: "2vh"}}>
                            {flow.id}
                    </h2>
                    <p><b>{flow.hotelName}</b></p>
                    <p><b>Casquette: </b>{flow.job}</p>
                    <p><b>Level: </b>{flow.category}</p>
                </div>
                
                <div style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "center",
                    alignItems: "center"
                    backgroundColor: "rgb(33, 35, 39)", 
                    width: "100%", 
                    height: "13%", 
                    marginBottom: "1%", 
                    borderBottomLeftRadius: "15px", 
                    borderBottomRightRadius: "15px"}}> 
                    <Button variant="info" onClick={handleShow}>Modifier mon profil</Button>
                </div>                
                <Modal show={list}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={handleClose}
                        >
                        <Modal.Header closeButton className="bg-light">
                            <Modal.Title id="contained-modal-title-vcenter">
                            Modifier mon profil
                            </Modal.Title>
                        </Modal.Header>
                <Modal.Body>
                <div className="register_modal_container">
                <Form.Row>
                    <Form.Group controlId="description">
                    <Form.Label>Change d'hôtel</Form.Label>
                    <Form.Control type="text" placeholder="ex: Bates Motel" style={{width: "20vw"}} value={formValue.hotelName} name="hotelName" onChange={handleChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="description">
                    <Form.Label>Change de <i>casquette</i></Form.Label><br/>
                    <select class="selectpicker" value={formValue.job} name="job" onChange={handleChange} 
                    style={{width: "20vw", 
                    height: "6vh", 
                    border: "1px solid lightgrey", 
                    borderRadius: "3px",
                    backgroundColor: "white", 
                    paddingLeft: "1vw"}}>
                        <option></option>
                        <option>Réceptionniste</option>
                        <option>Chef de Brigade</option>
                        <option>Chef de Réception</option>
                        <option>Assistant de direction</option>
                        <option>Head Manager</option>
                    </select>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="description">
                    <Form.Label>Change de <i>level</i></Form.Label><br/>
                    <select class="selectpicker" value={formValue.level} name="level" onChange={handleChange} 
                    style={{width: "20vw", 
                    height: "6vh", 
                    border: "1px solid lightgrey", 
                    borderRadius: "3px",
                    backgroundColor: "white", 
                    paddingLeft: "1vw"}}>
                        <option></option>
                        <option>Padawan</option>
                        <option>Je gère !</option>
                        <option>I'm a Legend</option>
                    </select>
                    </Form.Group>
                </Form.Row>
                {/*<Form.Row>
                    <Form.Group controlId="description">
                    <Form.Label>Dans quel <i>mood</i> êtes-vous ?</Form.Label><br/>
                    <select class="selectpicker" value={formValue.mood} name="mood" onChange={handleChange} 
                    style={{width: "20vw", 
                    height: "6vh", 
                    border: "1px solid lightgrey", 
                    borderRadius: "3px",
                    backgroundColor: "white", 
                    paddingLeft: "1vw"}}>
                        <option></option>
                        <option>Sky is the limit</option>
                        <option>Don't f*ck with me today !!</option>
                        <option>Feng Shui Master</option>
                        <option>J-1 avant dépression</option>
                    </select>
                    </Form.Group>
                </Form.Row>*/}
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={handleSubmit}>Modifier</Button>
                </Modal.Footer>
            </Modal>
        </div>
        ))
        
    )
}
