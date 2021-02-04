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
                <div style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingBottom: "1%"
                }}> 
                    <h5 className="font-weight-bolder memo_title">Memo Board</h5>
                </div>
                <Divider/>
                {!!firebase && !!user &&
                <div style={{
                    
                }}>
                    <StickList firebase={firebase} user={user} />
                    <CreateSticker firebase={firebase} user={user} />
                </div>}
    
                <CoolBar />
            </div>
    )
}

export default Memo