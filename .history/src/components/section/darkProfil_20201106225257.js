import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import Avatar from 'react-avatar'


export default function DarkProfil() {

    const { user, firebase } = useContext(FirebaseContext)

    return (
        <div style={{
            width: "30vw",
            height: "100%"
        }}>
            
        </div>
    )
}
