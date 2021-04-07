import React from "react"
import UserProfile from '../components/section/form/phoneForm/userProfile'
import Layout from "../components/layout"

const UserPage = () => {

  return(
    <FirebaseContext.Provider>
            <UserProfile />
    </FirebaseContext.Provider>
  )
}

export default UserPage