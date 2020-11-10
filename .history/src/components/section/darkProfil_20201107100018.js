import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../Firebase'
import Avatar from 'react-avatar'
import DarkProfilDetails from "./DarkProfilDetails"


export default function DarkProfil() {

    const { user, firebase } = useContext(FirebaseContext)

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: "30%",
            height: "93vh"
        }}>
            <div>
                
            </div>
            {!!firebase && !!user &&
            <DarkProfilDetails firebase={firebase} user={user} />}
            
        </div>
    )
}
