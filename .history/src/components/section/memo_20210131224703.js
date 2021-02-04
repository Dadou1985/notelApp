import React, { useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import StickList from './stickList'
import CoolBar from './coolBar'
import '../css/memo.css'
import Divider from '@material-ui/core/Divider'


const Memo =()=>{


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