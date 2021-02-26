import React, {useState, useContext, useEffect } from 'react'
import Fom from '../../svg/fom.svg'
import { navigate } from 'gatsby'
import { sha256, sha224 } from 'js-sha256';
import { Form, Button, Table, Tabs, Tab, OverlayTrigger, Modal } from 'react-bootstrap'
import { Input } from 'reactstrap'
import Tips from '../../svg/coin.svg'
import ToggleDisplay from 'react-toggle-display'
import Arrow from '../../svg/arrowDown.svg'
import Dialog from './common/fullScreenDialog'


const Dilema = ({user, firebase}) => {

    const [showModal, setShowModal] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [createRefSpace, setCreateRefSpace] = useState("")
    const [joinRefSpace, setJoinRefSpace] = useState("")
    const [info, setInfo] = useState([])
    const [list, setList] = useState(false)
    const [showDialog, setShowDialog] = useState(true)
    const [formValue, setFormValue] = useState({hotelName: "", job: "", level: "", mood: ""})

    const handleWorkspace = () => {
        if(!user.displayName) {
            setShowModal(true)
        }else{
            navigate('/singlePage')
        }
    }

    const handleShowDetails = () =>{
        let arrowTop = document.getElementById("arrowTop")
      if(arrowTop.style.transform === "rotate(0turn)"){
        setShowDetails(!showDetails)
          return arrowTop.style.transform = "rotate(0.5turn)"
      }
      if(arrowTop.style.transform === "rotate(0.5turn)"){
        setShowDetails(!showDetails)
          return arrowTop.style.transform = "rotate(0turn)"
      }
      
  }  
  

    const handleChange = (event) =>{
        event.persist()
        setFormValue(currentValue =>({
        ...currentValue,
        [event.target.name]: event.target.value
        }))
    }

    const handleChangeCreate = event =>{
        setCreateRefSpace(event.currentTarget.value)
    }

    const handleChangeJoin = event =>{
        setJoinRefSpace(event.currentTarget.value)
    }


    const handleCreateSpaceSubmit = () => {
        setCreateRefSpace('')
        firebase.adminWorkspaceRegister({email: user.email, username: user.username, userId: user.uid, refSpace: sha224(createRefSpace)})
    }

    const handleJoinSpaceSubmit = () => {
        setJoinRefSpace("")
        firebase.workspaceRegister({email: user.email, username: user.username, userId: user.uid, refSpace: joinRefSpace})
    }  

    const handleSubmit = event => {
        event.preventDefault()
        setFormValue({hotelName: "", job: "", level: "", mood: ""})
        firebase.updateIziProfile({username: user.username, hotelName: formValue.hotelName, job: formValue.job, level: formValue.level, mood: formValue.mood}).then(handleClose)
    }


    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    const handleCloseUpdate = () => setList(false)
    const handleShowUpdate = () => setList(true)


    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziUserOnAir2({userId: user.uid, signal : signal}).onSnapshot(function(snapshot) {
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
    
    console.log(window.innerWidth)

    return (
        info.map(flow => (

        <div className="global-container"
        style={{ backgroundImage: `url(${"https://i.pinimg.com/originals/cb/59/ff/cb59ffb54f7bcca4dbbc1517a65c1f01.jpg"})` }}>
                <div className="profile-container">
                    <h1>
                        <b>{flow.id}</b>
                        <div className="header-profile">
                            <img src={Tips} alt="tips" className="tips" /> 
                            {flow.tips} tips 
                            <img src={Arrow} alt="arrow" style={{width: "1vw", cursor: "pointer", marginLeft: "1vw", transform: "rotate(0turn)"}} id="arrowTop" onClick={handleShowDetails} /> 
                        </div>
                    </h1>
                    <ToggleDisplay show={showDetails}>
                        <div>
                        <div className="header-toggle-container">
                            <div>
                                hotel<p className="profile-details">{flow.hotelName}</p>
                            </div>
                            <div>
                                poste<p className="profile-details">{flow.job}</p>
                            </div>
                            <div>
                                level<p className="profile-details">{flow.category}</p>
                            </div>
                        </div>
                        <Button variant="outline-secondary" className="update-profile-button" onClick={handleShowUpdate}>Actualiser votre profil</Button>
                        </div>
                    </ToggleDisplay>
                </div>
            <div className="space-container">
            <div className="space-box">
                <div className="softSkin space-card"
                    onClick={handleWorkspace}>
                <h2>Work Space</h2>
                <h4 style={{color: "darkgoldenrod"}}>Hello, Karen !</h4>
                <img src={Fom} alt="Fom" className="white-fom-icon" />
                </div>
            </div>
            <div className="space-box">
                <div className="boomSkakalaka space-card"
                onClick={()=>navigate('/izilife')}>
                    <h2>World Space</h2>
                    <h4 style={{color: "darkred"}}>Hell no, Karen !</h4>
                    <img src={Fom} alt="Fom" className="black-fom-icon" />
                </div>
            </div>
            <h2 className="dilema-sentence">Choisissez votre espace</h2>
        </div>
        <Modal show={showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Work Space
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    <Tabs defaultActiveKey="Créer" id="uncontrolled-tab-example">
                            <Tab eventKey="Créer" title="Créer un espace de travail">
                                <div className="modal-tab-container">
                                    <Form.Row className="create-space-form">
                                        <Input type="text" placeholder="Donner un nom à votre espace de travail..." className="create-space-input" value={createRefSpace} name="createRefSpace" onChange={handleChangeCreate} />
                                    </Form.Row>
                                    <Button variant="outline-success" onClick={handleCreateSpaceSubmit}>Créer l'espace</Button>
                                </div>
                            </Tab>
                            <Tab eventKey="Rejoindre" title="Rejoindre un espace de travail">
                            <div className="modal-tab-container">
                                    <Form.Row className="join-space-form">
                                        <Input type="text" placeholder="Entrer le nom de votre espace de travail" className="join-space-input" value={joinRefSpace} name="joinRefSpace" onChange={handleChangeJoin} />
                                    </Form.Row>
                                    <Button variant="outline-success" onClick={handleJoinSpaceSubmit}>Rejoindre l'espace</Button>
                                </div>
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
                    <Modal show={list}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleCloseUpdate}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Modifier mon profil
                        </Modal.Title>
                    </Modal.Header>
            <Modal.Body>
            <div className="update_modal_container">
            <Form.Row>
                <Form.Group controlId="description">
                <Form.Label>Change d'hôtel</Form.Label>
                <Form.Control type="text" placeholder={flow.hotelName} className="hotelName-input" value={formValue.hotelName} name="hotelName" onChange={handleChange} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="description">
                <Form.Label>Change de <i>casquette</i></Form.Label><br/>
                <select class="selectpicker" value={formValue.job} name="job" onChange={handleChange} 
                className="update-profile-select">
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
                <select class="selectpicker"defaultValue={flow.category} value={formValue.level} name="level" onChange={handleChange} 
                className="update-profile-select">
                    <option></option>
                    <option>Jeune Padawan</option>
                    <option>Je gère, tranquille</option>
                    <option>I'm a living Legend</option>
                </select>
                </Form.Group>
            </Form.Row>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={handleSubmit}>Modifier</Button>
            </Modal.Footer>
        </Modal>
        <Dia
        </div>
    ))
    )
}

export default Dilema