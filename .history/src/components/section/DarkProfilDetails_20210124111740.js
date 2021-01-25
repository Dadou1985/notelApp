import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import Avatar from 'react-avatar'
import AvatarUi from '@material-ui/core/Avatar'
import Hotel from '../../svg/hotel.svg'
import Cap from '../../svg/cap.svg'
import Medal from '../../svg/medal.svg'


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
                    height: "43%", 
                    borderTopLeftRadius: "15px", 
                    borderTopRightRadius: "15px",
                    backgroundImage: `url(https://www.hotel-le-bugatti.com/media/cache/jadro_resize/rc/KLkbuO7J1607354568/jadroRoot/medias/5658345e8f976/_chb7675-md.jpg)`}}>
                    <AvatarUi
                    src="data:image/jpeg;base64,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"
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
                    marginBottom: "1%",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px", 
                }}>
                    <h2 style={{
                        filter: "drop-shadow(1px 1px 1px)", 
                        marginTop: "1vh", 
                        marginBottom: "2vh",                    fontSize: "1em"
                    }}>
                            {flow.id}
                    </h2>
                    <p style={{textAlign: "center",                    fontSize: "1em"
}}>
                        <img src={Hotel} alt="hotel" style={{width: "10%", marginRight: "3%"}} />
                        <b>{flow.hotelName}</b>
                    </p>
                    <p style={{textAlign: "center"}}>
                        <img src={Cap} alt="hotel" style={{width: "10%", marginRight: "3%"}} /> 
                        {flow.job}
                    </p>
                    <p style={{textAlign: "center"}}>
                        <img src={Medal} alt="hotel" style={{width: "10%", marginRight: "3%"}} />
                        {flow.category}
                    </p>
                </div>
                <Button variant="info" style={{width: "100%"}} onClick={handleShow}>Modifier mon profil</Button>
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
                    <Form.Control type="text" placeholder={flow.hotelName} style={{width: "20vw"}} value={formValue.hotelName} name="hotelName" onChange={handleChange} />
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
                        <option>Jeune Padawan</option>
                        <option>Je gère, tranquille !!</option>
                        <option>I'm a living Legend !!!</option>
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
