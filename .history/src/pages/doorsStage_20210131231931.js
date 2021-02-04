import React from 'react'
import Layout from "../components/layout"
import Dilema from '../components/section/dilema'
import {FirebaseContext, useAuth} from '../Firebase'


export default function DoorsStage() {

    const { user, firebase, loading } = useAuth()

    return (
        <div>
            <Dilema />
        </div>
    )
}
