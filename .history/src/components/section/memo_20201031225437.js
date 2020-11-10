import React, {useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../Firebase'
import StickList from './stickList'
import PostIt from '../../svg/paper.svg'
import CoolBar from './coolBar'
import CreateSticker from './createSticker'
import '../css/memo.css'

const Memo =()=>{

    const [visible, setVisible] = useState(false)
    const [info, setInfo] = useState([])
    const [formValue, setFormValue] = useState({title: "", text: "", assignee: null})
    const {user, firebase} = useContext(FirebaseContext)

    const showSticker = () => {
        setVisible(true)
      }

    const handleChange = (event) =>{
    event.persist()
    setFormValue(currentValue =>({
        ...currentValue,
        [event.target.name]: event.target.value
    }))
    }
    
    const handleSubmit = (event) => {
        console.log(event)
        const markUp = Date.now()
        firebase.addSticker({documentId: user.displayName, title: formValue.title, text: formValue.text, author: user.username, markup: markUp, assignee: formValue.assignee})
        setVisible(false)
        setFormValue({title: "", text: ""})
      }
    
    const handleClose = (event) => {
        console.log(event)
        setVisible(false)
    }

    return(
        
            <div className="memo_container">
               <h5 className="font-weight-bolder" className="memo_title">Memo Board</h5>
                <hr/>
                <CreateSticker firebase={firebase} user={user} 
                {!!firebase && !!user &&
                <StickList firebase={firebase} user={user} />}
    
                <CoolBar />
            </div>
    )
}

export default Memo