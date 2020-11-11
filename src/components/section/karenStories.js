import React, { useState, useEffect } from 'react'
import { Form, Button, Input, FormGroup } from 'reactstrap'
import KarenStory from './karenStory'

export default function KarenStories({firebase, user}) {

    const [info, setInfo] = useState([])
    const [note, setNote] = useState('')
    const [img, setImg] = useState("")
    const [startDate, setStartDate] = useState(new Date())

    const handleChange = event =>{
        setNote(event.currentTarget.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        setNote("")
        firebase.addKarenStory({author: user.username, story: note, date: startDate, userId: user.uid, img: img})
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        firebase.iziLifeOnAir({collection: "karenStories", signal : signal}).onSnapshot(function(snapshot) {
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
            <div style={{width: "80%"}}>
            <div id="box" className="dark_messenger_notebox">
                {info.map(flow => (
                    <KarenStory
                    author={flow.author}
                    img={flow.img}
                    story={flow.story}
                    tips={flow.tips}
                    userRef={flow.userId}
                    date={flow.date}
                    markup={flow.markup}
                />
                ))}
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
        </div>
            
    )
}
