import React from "react"
import UserProfile from '../components/section/form/phoneForm/userProfile'

const UserPage = () => {

  return(
    <FirebaseContext.Provider>
            <UserProfile />
    </FirebaseContext.Provider>
  )
}

export default UserPage