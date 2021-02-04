import React, {useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../Firebase'
import StickList from './stickList'
import CoolBar from './coolBar'
import CreateSticker from './createSticker'
import '../css/memo.css'
import Divider from '@material-ui/core/Divider'
import Plus from '../../svg/plus3.svg'


const Memo =()=>{

    const {user, firebase} = useContext(FirebaseContext)

    return(
        
            <div className="memo_container">
                <h5 className="font-weight-bolder memo_title">Memo Board</h5>
                <Divider/>
                {!!firebase && !!user &&
                <StickList firebase={firebase} user={user} />}
    
                <CoolBar />
            </div>
    )
}

export default Memo