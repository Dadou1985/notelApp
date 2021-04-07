import React from "react"
import UserProfile from '../components/section/form/phoneForm/userProfile'
import {FirebaseContext, useAuth} from '../Firebase'

const UserPage = () => {

    const { user, firebase, loading } = useAuth()

  return(
    <FirebaseContext.Provider>
            <UserProfile />
    </FirebaseContext.Provider>
  )
}

export default UserPage