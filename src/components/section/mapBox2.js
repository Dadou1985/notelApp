import React, { useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import DeepMap2 from './deepMap2'

export default function MapBox2() {

    const { user, firebase } = useContext(FirebaseContext)

     return (
        <>
            {!!firebase && !!user &&
            <DeepMap2 firebase={firebase} user={user} />}
        </>
    )
}
