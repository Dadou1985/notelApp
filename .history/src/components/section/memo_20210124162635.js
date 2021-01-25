import React, {useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../Firebase'
import StickList from './stickList'
import CoolBar from './coolBar'
import CreateSticker from './createSticker'
import '../css/memo.css'
import Divider from '@material-ui/core/Divider'


const Memo =()=>{

    const {user, firebase} = useContext(FirebaseContext)

    return(
        
            <div className="memo_container">
                <div>
                    {!!firebase && !!user &&
                    <CreateSticker firebase={firebase} user={user} />}
                    
                </div>
                <Divider/>
                {!!firebase && !!user &&
                <StickList firebase={firebase} user={user} />}
    
                <CoolBar />
            </div>
    )
}

export default Memo