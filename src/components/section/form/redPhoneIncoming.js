import React, { useState, useEffect } from 'react'
import { Button, Table, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap'
import RedPhoneIncoming from '../../../svg/download.svg'


const IncomingBooking = ({firebase}) =>{

    const [list, setList] = useState(false)
    const [info, setInfo] = useState([])

    const handleClose = () => setList(false)
    const handleShow = () => setList(true)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.toolOnAir({collection: "redPhoneIncoming", signal : signal}).onSnapshot(function(snapshot) {
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
     },[])

    return(
        <div>
            <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="title">
                Délogements reçus
              </Tooltip>
            }>
                <img src={RedPhoneIncoming} className="icon" alt="contact" onClick={handleShow} style={{width: "50%"}} />
            </OverlayTrigger>

            <Modal show={list}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={handleClose}
                    >
                    <Modal.Header closeButton className="bg-light">
                        <Modal.Title id="contained-modal-title-vcenter">
                        Délogements reçus
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <Table striped bordered hover size="sm" className="text-center">
                                <thead className="bg-dark text-center text-light">
                                    <tr>
                                    <th>#</th>
                                    <th>Hotel</th>
                                    <th>Client</th>
                                    <th>Chambre(s)</th>
                                    <th>Nuit(s)</th>
                                    <th>Pax</th>
                                    <th>Montant</th>
                                    <th>PEC</th>
                                    <th className="bg-dark"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {info.map(flow =>(
                                        <tr key={flow.id}>
                                        <td></td>
                                        <td>{flow.hotelName}</td>
                                        <td>{flow.client}</td>
                                        <td>{flow.totalRoom}</td>
                                        <td>{flow.totalNight}</td>
                                        <td>{flow.pax}</td>
                                        <td>{flow.initialPrice}</td>
                                        <td>{flow.pec}</td>
                                        <td className="bg-dark"><Button variant="outline-danger" size="sm" onClick={()=>firebase.deleteDocument({collection: "redPhoneIncoming", document: flow.markup})}>Supprimer</Button></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </Table>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default IncomingBooking