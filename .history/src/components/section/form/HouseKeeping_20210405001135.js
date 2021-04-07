import React, {useState } from 'react'
import { Button, Modal, InputGroup, FormControl, Form, OverlayTrigger, Tooltip, Nav, Row, Col, Tab } from 'react-bootstrap'
import CheckListTable from '../checkListTable'
import HouseKeeping from '../../../svg/maid.svg'


const HouseKeeping = ({user, firebase}) =>{

    const [list, setList] = useState(false)

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)

    return(
        <div style={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "center"
        }}>
        <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="title">
                Conciergerie
              </Tooltip>
            }>
                <img src={Hou} className="icon" alt="todolist" onClick={handleShow} style={{width: "30%"}} />
        </OverlayTrigger>

            <Modal
                show={list}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title id="contained-modal-title-vcenter">
                Conciergerie
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
            style={{overflow: "auto"}}>
                <Tab.Container defaultActiveKey="matin">
                <Row>
                    <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="matin">Serviette</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="soir">Savon</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="nuit">Papier Toilette</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="matin">Sèche-cheveux</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="soir">Coussin</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="nuit">Couverture</Nav.Link>
                        </Nav.Item><Nav.Item>
                        <Nav.Link eventKey="matin">Fer à repasser</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="soir">Lit Bébé</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="matin">
                            {!!firebase && !!user && 
                            <CheckListTable shift="matin" firebase={firebase} user={user} />}
                        </Tab.Pane>
                        <Tab.Pane eventKey="soir">
                        {!!firebase && !!user && 
                            <CheckListTable shift="soir" firebase={firebase} user={user} />}
                        </Tab.Pane>
                        <Tab.Pane eventKey="nuit">
                        {!!firebase && !!user && 
                            <CheckListTable shift="nuit" firebase={firebase} user={user} />}
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </Modal.Body>
            </Modal>
    </div>
    )
}

export default HouseKeeping