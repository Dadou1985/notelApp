import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../Firebase'
import DarkProfilDetails from "./DarkProfilDetails"


export default function DarkProfil() {

    const { user, firebase } = useContext(FirebaseContext)

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
            height: "93vh"
        }}>                
            {!!firebase && !!user &&
            <DarkProfilDetails firebase={firebase} user={user} />}
            
        </div>
    )
}
