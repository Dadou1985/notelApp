import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import Avatar from 'react-avatar'


export default function DarkProfil() {

    const { user, firebase } = useContext(FirebaseContext)

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            width: "40vw",
            height: "100%"
        }}>
            <div style={{
                width: "100%",
                height: "50%"
            }}>
            {!!user &&
                <Avatar 
                name={user.username}
                round={true}
                size="60"
                color={'#'+(Math.random()*0xFFFFFF<<0).toString(16)}
                    />}
            </div>
            
        </div>
    )
}
