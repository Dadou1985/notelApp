import React, {useState, useEffect, useContext } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FirebaseContext, db, auth } from '../../../Firebase'


const UserList = () => 
    const [info, setInfo] = useState([])
    const [user, setUser] = useState(auth.currentUser)

    const { userDB, setUserDB } = useContext(FirebaseContext)

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        db.toolOnAir({hotelId: userDB.hotelId, region: userDB.hotelRegion, departement: userDB.hotelDept, collection: "users", signal : signal}).onSnapshot(function(snapshot) {
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
                    <td className="bg-light"><Button variant="outline-danger" size="sm" onClick={()=>db.deleteUser({hotelId: userDB.hotelId, region: userDB.hotelRegion, departement: userDB.hotelDept, document: flow.id})}>Supprimer</Button></td>
                </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default UserList