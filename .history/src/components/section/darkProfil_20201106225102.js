import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../Firebase'


export default function DarkProfil() {

    const { user, firebase } = useContext(FirebaseContext)

    return (
        <div style={{
            width: "30vw",
            height: "90vh"
        }}>
            
        </div>
    )
}
