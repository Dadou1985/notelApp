import React, {useState } from 'react'
import { Button, Modal, InputGroup, FormControl, Form, OverlayTrigger, Tooltip, Nav, Row, Col, Tab } from 'react-bootstrap'
import CheckListTable from '../checkListTable'
import TodoList from '../../../svg/todoList.svg'


const HoueKeeping = ({user, firebase}) =>{

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
                Check-list
              </Tooltip>
            }>
                <img src={TodoList} className="icon" alt="todolist" onClick={handleShow} style={{width: "30%"}} />
        </OverlayTrigger>

            <Modal
                show={list}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title id="contained-modal-title-vcenter">
                Check-List
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
            style={{overflow: "auto"}}>
                <Tab.Container defaultActiveKey="matin">
                <Row>
                    <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="matin">Matin</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="soir">Soir</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="nuit">Nuit</Nav.Link>
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

export default HoueKeeping