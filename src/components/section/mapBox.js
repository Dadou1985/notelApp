import React, { useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import DeepMap from './deepMap'

export default function MapBox() {

    const { user, firebase } = useContext(FirebaseContext)

     return (
        <>
            {!!firebase && !!user &&
            <DeepMap firebase={firebase} user={user} />}
        </>
    )
}
