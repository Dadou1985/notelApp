import React, {useState} from 'react'
import {
    Button, Form, FormGroup, Input, CustomInput
  } from 'reactstrap'


const MessageForm = (props) =>{

    const [note, setNote] = useState("")

    const handleChange = event =>{
        setNote(event.currentTarget.value)
    }

    return(
        <Form inline style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "flex-start"}}
           >
            <FormGroup  style={{
                    width: "100%",
                    marginBottom: "1%"
                }}> 
                <Input type="textarea" name="text" id="message" placeholder="Ecrire une note..."  style={{
                    width: "100%",
                    minHeight: "7vh",
                    maxHeight: "20vh"
                }} 
                value={note}
                onChange={handleChange} />
            </FormGroup>
            <FormGroup  style={{
                    width: "100%",
                    marginBottom: "1%",
                    display: "flex",
                    justifyContent: "center"
                }}>
                <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
            </FormGroup>
            <Button color="outline-success" block style={{height: "6vh"}}>Noter</Button>
        </Form>
    )
}

export default MessageForm