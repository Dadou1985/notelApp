import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

export default function CommuIzi() {
    
    const [info, setInfo] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziLifeOnAir({collection: "communIzi", signal : signal}).onSnapshot(function(snapshot) {
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
            info.map(flow =>(
                <>
                <div id="box" className="dark_messenger_notebox">
                    {!!firebase && !!user &&
                    <NoteBox firebase={firebase} user={user} />}
                </div>
                    <div>
                    <Form inline className="dark_messenger_form"
                    onSubmit={handleSubmit}>
                    <FormGroup  className="dark_messenger_form_input_container"> 
                        <Input type="textarea" name="text" placeholder="Ecrire une note..."  
                        value={note}
                        onChange={handleChange}
                        id="dark_message" />
                    </FormGroup>
                    {/*<FormGroup  style={{
                            width: "100%",
                            marginBottom: "1%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
                    </FormGroup>*/}
                    <div className="dark_messenger_form_footer">
                        <Button color="primary" block id="dark_noteButton">Noter</Button>
                    </div>
                    </Form>
                    </div>
                </>
            ))
        </div>
    )
}
