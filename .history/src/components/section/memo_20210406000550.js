import React, {useContext} from 'react'
import StickList from './stickList'
import CoolBar from './coolBar'
import '../css/memo.css'
import Divider from '@material-ui/core/Divider'
import { FirebaseContext, db, auth } from '../../Firebase'


const Memo =()=>{

    return(
        
            <div className="memo_container">
                <h5 className="font-weight-bolder memo_title">Memo Board</h5>
                <Divider/>
                <StickList />
                <CoolBar />
            </div>
    )
}

export default Memo