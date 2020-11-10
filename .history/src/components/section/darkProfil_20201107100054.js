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
            <div style=>
            {!!user &&
                <Avatar 
                src="https://besthqwallpapers.com/Uploads/7-5-2018/51482/thumb-super-mario-portrait-cartoon-character-plumber-3d.jpg"
                round={true}
                size="200"
                color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                    />}
            </div>
            {!!firebase && !!user &&
            <DarkProfilDetails firebase={firebase} user={user} />}
            
        </div>
    )
}
