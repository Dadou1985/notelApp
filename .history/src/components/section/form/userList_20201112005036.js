import React, { useState, useEffect} from 'react'
import { Button, Table } from 'react-bootstrap'


const UserList = ({user, firebase}) => {
    const [info, setInfo] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.toolOnAir({documentId: user.displayName, collection: "users", signal : signal}).onSnapshot(function(snapshot) {
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
     },[firebase, user.displayName])

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Pseudo</th>
                    <th>E-mail</th>
                    <th>Mot de Passe</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {info.map(flow =>(
                    <tr key={flow.markup}>
                    <td></td>
                    <td>{flow.id}</td>
                    <td>{flow.mail}</td>
                    <td>{flow.password}</td>
                    <td className="bg-light"><Button variant="outline-danger" size="sm" onClick={()=>firebase.deleteUser({documentId: user.displayName, document: flow.id})}>Supprimer</Button></td>
                </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default UserList