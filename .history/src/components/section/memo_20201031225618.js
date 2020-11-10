import React, {useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../Firebase'
import StickList from './stickList'
import PostIt from '../../svg/paper.svg'
import CoolBar from './coolBar'
import CreateSticker from './createSticker'
import '../css/memo.css'

const Memo =()=>{

    const {user, firebase} = useContext(FirebaseContext)

    

    return(
        
            <div className="memo_container">
               <h5 className="font-weight-bolder" className="memo_title">Memo Board</h5>
                <hr/>
                {!!firebase && !!user &&
                <CreateSticker firebase={firebase} user={user} />}
                {!!firebase && !!user &&
                <StickList firebase={firebase} user={user} />}
    
                <CoolBar />
            </div>
    )
}

export default Memo