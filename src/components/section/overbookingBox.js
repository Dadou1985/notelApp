import React, { useContext } from 'react'
import OverIn from './overbookIn'
import OverOut from './overbookOut'
import {FirebaseContext} from '../../Firebase'
import {Tab, Tabs} from 'react-bootstrap'


const OverbookingBox = () => {

    const {user, firebase} = useContext(FirebaseContext)

    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
            width: "100%",
            padding: "1%", 
            marginBottom: "3%"
          }}>
            <h6 className="text-center"><b>Overbooking Box</b></h6>
            <Tabs defaultActiveKey="incoming" id="uncontrolled-tab-example" className="bg-light">
                <Tab eventKey="incoming" title="Réception">
                <div style={{
                    display: "flex",
                    width: "100%",
                    flexFlow: "row wrap",
                    justifyContent: "center",
                    height: "30vh",
                    padding: "1%",
                    borderRadius: "2%",
                    filter: "drop-shadow(4px 4px 5px black)",
                    padding: "3%",
                    backgroundColor: "white"
                  }}>
                  {!!firebase && !!user &&
                  <OverIn firebase={firebase} user={user} />}
                </div>
                </Tab>
                <Tab eventKey="outcoming" title="Emission">
                <div style={{
                    display: "flex",
                    width: "100%",
                    flexFlow: "row wrap",
                    justifyContent: "center",
                    height: "30vh",
                    padding: "1%",
                    borderRadius: "2%",
                    filter: "drop-shadow(4px 4px 5px black)",
                    padding: "3%",
                    backgroundColor: "white"
                  }}>
                  {!!firebase && !!user &&
                  <OverOut firebase={firebase} user={user} />}
                </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default OverbookingBox