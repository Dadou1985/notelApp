import React, {useState, useEffect } from 'react'
import { Button, Table, Form, InputGroup, FormControl } from 'react-bootstrap'

const CheckListTable = ({user, firebase, shift}) => {

    const [info, setInfo] = useState([])
    const [formValue, setFormValue] = useState({task: ""})

    const handleChange = (event) =>{
        event.persist()
        setFormValue(currentValue =>({
          ...currentValue,
          [event.target.name]: event.target.value
        }))
      }

    const handleSubmit = event => {
        event.preventDefault()
        setFormValue("")
        let marker = Date.now()
        firebase.addTask({documentId: user.displayName, collection: shift, task: formValue.task, markup: marker})
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        firebase.listOnAir({documentId: user.displayName, collection: shift, signal : signal}).onSnapshot(function(snapshot) {
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
            <h5 className="text-center bg-dark text-light">Check list - {shift}</h5>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Ajouter une tâche"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={formValue.task}
                name="task"
                onChange={handleChange}
                />
                <InputGroup.Append>
                <Button variant="outline-success" onClick={handleSubmit}>Valider</Button>
                </InputGroup.Append>
            </InputGroup>
            <Table striped bordered hover size="sm">
                <tbody>
                    {info.map(flow =>(
                        <tr key={flow.id}>
                        <td>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" />
                            </Form.Group> 
                        </td>
                        <td style={{width: "80%"}}>
                            {flow.task}
                        </td>
                        <td className="bg-light">
                            <Button variant="outline-danger" size="sm" onClick={()=>firebase.deleteTask({documentId: user.displayName, collection: shift, document: flow.id})}>Supprimer</Button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default CheckListTable