import React, {useState, useContext } from 'react'
import { FirebaseContext } from '../../Firebase'
import CommunIzi from "./communIzi"
import KarenStories from './karenStories'
import IziNews from './iziNews'
import Drawer from './common/darkDrawer'


const DarkMessenger = () =>{

    const { user, firebase } = useContext(FirebaseContext)

    const handleChangeScreen = (screen) => {
      const iziChat = document.getElementById('iziChat')
      const iziNews = document.getElementById('iziNews')
      const karenStories = document.getElementById('karenStories')
      
      switch(screen) {
        case 'chat':
          iziNews.style.display = "none"
          karenStories.style.display = "none"
          return iziChat.style.display = "block"
        case 'news':
          iziChat.style.display = "none"
          karenStories.style.display = "none"
          return iziNews.style.display = "block"
        case 'stories':
          iziChat.style.display = "none"
          iziNews.style.display = "none"
          return karenStories.style.display = "block"
      }
    }
    
    return(
        <div style={{
            display: "flex",
            flexFlow: "row",
            width: "100%",
            height: "90vh",
            justifyContent: "space-around", 
            padding: "2%",
            overflow: "hidden"
        }}>
           
        <div id="iziChat" className="dark_messenger_communizi_container">
            <h5 className="font-weight-bolder dark_messenger_title">IziChat</h5>
            {!!firebase && !!user &&
            <CommunIzi firebase={firebase} user={user} />}
        </div>  
        <div id="iziNews" className="dark_messenger_izinews_container">
            <h5 className="font-weight-bolder dark_messenger_title">IziNews</h5>
            <IziNews />
        </div>
        <div id="karenStories" className="dark_messenger_karenStories_container">
            <h5 className="font-weight-bolder dark_messenger_title">Karen Stories</h5>
            {!!firebase && !!user &&
            <KarenStories firebase={firebase} user={user} />}
        </div>
        {!!firebase && !!user && 
                <Drawer className="drawer" firebase={firebase} user={user} screen={handleChangeScreen} />}
      </div>
    )
}

export default DarkMessenger