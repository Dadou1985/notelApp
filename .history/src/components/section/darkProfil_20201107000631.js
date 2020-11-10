import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import Avatar from 'react-avatar'


export default function DarkProfil() {

    const { user, firebase } = useContext(FirebaseContext)

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            width: "30%",
            height: "100%"
        }}>
            <div style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                height: "50vh"
            }}>
            {!!user &&
                <Avatar 
                src="https://besthqwallpapers.com/Uploads/7-5-2018/51482/thumb-super-mario-portrait-cartoon-character-plumber-3d.jpg"
                round={true}
                size="100"
                color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                    />}
            </div>
            
        </div>
    )
}
