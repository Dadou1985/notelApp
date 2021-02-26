import React, {useState, useContext, useEffect } from 'react'
import Fom from '../../svg/fom.svg'
import { navigate } from 'gatsby'
import { sha256, sha224 } from 'js-sha256';
import { Form, Button, Table, Tabs, Tab, OverlayTrigger, Modal } from 'react-bootstrap'
import { Input } from 'reactstrap'
import Portrait from '../../svg/photoId.jpg'
import Tips from '../../svg/coin.svg'
import ToggleDisplay from 'react-toggle-display'
import Arrow from '../../svg/arrowDown.svg'


const Dilema = ({user, firebase}) => {

    const [showModal, setShowModal] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [createRefSpace, setCreateRefSpace] = useState("")
    const [joinRefSpace, setJoinRefSpace] = useState("")
    const [info, setInfo] = useState([])
    const [list, setList] = useState(false)
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
    
    console.log(user)

    return (
        info.map(flow => (

        <div className=>
                <div style={{
                    display: 'flex',
                    flexFlow: "column",
                    width: '60%',
                    borderBottom: "1px solid lightgrey",
                    marginTop: "5vh",
                    marginBottom: "5vh"
                }}>
                    <h1 style={{fontSize: "5em", marginBottom: "5vh", marginLeft: "3vw"}}>
                        <b>{flow.id}</b>
                        <div style={{
                            display: "flex", 
                            flexFlow: "row",
                            alignItems: "center",
                            marginLeft: "1vw", 
                            fontSize: "20px"}}><img src={Tips} alt="tips" style={{width: "2vw"}} /> {flow.tips} tips <img src={Arrow} alt="arrow" style={{width: "1vw", cursor: "pointer", marginLeft: "1vw", transform: "rotate(0turn)"}} id="arrowTop" onClick={handleShowDetails} /> </div>
                    </h1>
                    <ToggleDisplay show={showDetails}>
                        <div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-around",

                        }}>
                            <div>
                                hotel<p style={{fontSize: "1.5em"}}>{flow.hotelName}</p>
                            </div>
                            <div>
                                poste<p style={{fontSize: "1.5em"}}>{flow.job}</p>
                            </div>
                            <div>
                                level<p style={{fontSize: "1.5em"}}>{flow.category}</p>
                            </div>
                        </div>
                        <Button variant="outline-secondary"  style={{float: 'right', marginBottom: "1vh"}} onClick={handleShowUpdate}>Actualiser votre profil</Button>
                        </div>
                    </ToggleDisplay>
                </div>
            <div style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-around",
            width: "60%"}}>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20vw",
                    height: "40vh",
                    border: "1px solid lightgrey",
                    borderBottomLeftRadius: "2%",
                    borderTopLeftRadius: "2%",
                    borderBottomRightRadius: "2%",
                    borderTopRightRadius: "2%",
                    color: "gray",
                    cursor: "pointer"
                    }}
                    className="doors"
                    onClick={handleWorkspace}>
                <h2>Work Space</h2>
                <h4 style={{color: "darkgoldenrod"}}>Hello, Karen !</h4>
                <img src={Fom} alt="Fom" style={{width: "10vw", filter: "invert()"}} />
                </div>
            </div>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20vw",
                    height: "40vh",
                    borderBottomLeftRadius: "2%",
                    borderTopLeftRadius: "2%",
                    borderBottomRightRadius: "2%",
                    borderTopRightRadius: "2%",
                    color: "gray",
                    cursor: "pointer",
                }}
                className="boomSkakalaka doors"
                onClick={()=>navigate('/izilife')}>
                    <h2>Fun Space</h2>
                    <h4 style={{color: "darkred"}}>Hell no, Karen !</h4>
                    <img src={Fom} alt="Fom" style={{width: "10vw", filter: "drop-shadow(-1px 1px 1px)", opacity: "0.7"}} />
                </div>
            </div>
            <h2 style={{color: "lightgrey", filter: "drop-shadow(-1px 1px 1px)", marginTop: "3vh"}}>Choisissez votre espace</h2>
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
                                <div  style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    padding: "5%",
                                    textAlign: "center"
                                }}>
                                    <Form.Row style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        width: "100%",
                                        marginBottom: "2vh"
                                    }}>
                                        <Input type="text" placeholder="Donner un nom à votre espace de travail..." style={{width: "25vw", border: "none", borderBottom: "1px solid lightgrey", textAlign: "center"}} value={createRefSpace} name="createRefSpace" onChange={handleChangeCreate} />
                                    </Form.Row>
                                    <Button variant="outline-success" onClick={handleCreateSpaceSubmit}>Créer l'espace</Button>
                                </div>
                            </Tab>
                            <Tab eventKey="Rejoindre" title="Rejoindre un espace de travail">
                            <div  style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    padding: "5%",
                                    textAlign: "center"
                                }}>
                                    <Form.Row style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        width: "70%",
                                        marginBottom: "2vh"
                                    }}>
                                        <Input type="text" placeholder="Entrer le nom de votre espace de travail" style={{width: "20vw", border: "none", borderBottom: "1px solid lightgrey", textAlign: "center"}} value={joinRefSpace} name="joinRefSpace" onChange={handleChangeJoin} />
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
                paddingLeft: "1vw"}}
                >
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
                style={{width: "20vw", 
                height: "6vh", 
                border: "1px solid lightgrey", 
                borderRadius: "3px",
                backgroundColor: "white", 
                paddingLeft: "1vw"}}>
                    <option></option>
                    <option>Jeune Padawan</option>
                    <option>Je gère, tranquille</option>
                    <option>I'm a living Legend</option>
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

export default Dilema