import React from 'react'
import Hotel from '../../svg/hostel.png'

export default function MarkerImg({room}) {

    if(room > 0) {
        return (
            <div>
                <img src={Hotel} alt="hotel" style={{width: "40px"}} />
            </div>
        )
    }else {
         return (<div></div>)   
    }
    
}
