import React, { useState, useEffect } from 'react'
import { Form, Button, Input, FormGroup } from 'reactstrap'
import KarenStory from './karenStory'
import UploadIcon from '../../svg/file.svg'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';



export default function KarenStories({firebase, user}) {

    const [info, setInfo] = useState([])
    const [note, setNote] = useState('')
    const [img, setImg] = useState(null)
    const [url, setUrl] = useState("")

    const handleChange = (event) =>{
        setNote(event.currentTarget.value)
    }    

      const handleImgChange = (event) => {
        if (event.target.files[0]){
            setImg(event.target.files[0])
        }
    }

      console.log(url)

      const handleSubmit = (event) => {
        event.preventDefault()
        const uploadTask = firebase.storage.ref(`images/${img.name}`).put(img)
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {console.log(error)},
          () => {
            firebase.storage
              .ref("images")
              .child(img.name)
              .getDownloadURL()
              .then(url => {
                const uploadTask = () => {
                    setNote("")
                    firebase.addKarenStory({ author: user.username, story: note, date: new Date(), userId: user.uid, img: url })
                }
                  return setUrl(url, uploadTask())})
          }
        )
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
     },[firebase])

    return (
            <div style={{width: "90%"}}>
            <PerfectScrollbar>
            <div id="box" className="karenStories_notebox">
                {info.map(flow => (
                    <KarenStory
                    storyRef={flow.id}
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
            </PerfectScrollbar>
            <div>
                <Form inline className="karenStories_form"
                onSubmit={handleSubmit}>
                <FormGroup  className="karenStories_form_input_container"> 
                    <Input name="text" placeholder="Ecrire une story..."  
                    value={note}
                    onChange={handleChange}
                    id="dark_message_story" />
                    <input type="file" style={{
                        position: "absolute", 
                        width: "4vw", 
                        height: "8vh", 
                        zIndex: "2",
                        right: "31%",  
                        opacity: "0"}}
                        onChange={handleImgChange} />
                    <img src={UploadIcon} style={{
                        width: "3vw", 
                        bottom: "17vh",
                        }} alt="uploadIcon" />
                </FormGroup>
                <div className="karenStories_form_footer">
                    <Button color="primary" block id="karenStories_noteButton">Noter</Button>
                </div>
                </Form>
            </div>
        </div>
            
    )
}
