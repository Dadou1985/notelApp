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
                    {!!firebase && !!user &&
                    <CreateSticker firebase={firebase} user={user} />}
                    <h5 className="font-weight-bolder memo_title">Memo Board</h5>
                    <img src={Plus} alt="Plus" style={{
                        width: "15px", 
                        cursor: "pointer", 
                        marginLeft: "1.3%", 
                        margin
                        position: "absolute", 
                        filter: "drop-shadow(2px 2px 2px)",
                        filter: "invert(100%)"}}
                         />
                </div>
                <Divider/>
                {!!firebase && !!user &&
                <StickList firebase={firebase} user={user} />}
    
                <CoolBar />
            </div>
    )
}

export default Memo