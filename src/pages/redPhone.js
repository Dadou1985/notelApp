import React, { useState } from "react"
import Layout from "../components/layout"
import {Form, FormControl, Button} from 'react-bootstrap'
import HotelMap from '../components/section/map'
import RoomAvailable from '../components/section/form/roomAvailable'


const RedPhone = () => {


  return(
    <Layout>
       <HotelMap />
       <div 
        style={{
          display: "flex",
          height: "85vh",
          flexFlow: "column",
          width: "34%",
          padding: "1%",
          position: "absolute",
          right: "0px",
          top: "8%"
        }}> 
        <h5 className="text-center" style={{marginBottom: "5%"}}><b>Red Phone</b> - <small>Dashboard</small></h5>
        <h6 className="text-center"><b>Filtrer les recherches d'hôtels par :</b></h6>
        <div style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-around",
          width: "100%",
          padding: "1%",
          marginTop: "5%",
          marginBottom: "5%"
        }}>
          <Form.Row>
              <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label className="text-center" style={{width: "12vw"}}>Zone géographique</Form.Label>
              <Form.Control as="select" custom style={{width: "12vw", filter: "drop-shadow(2px 2px 5px black)"}}>
                  <option>Ville</option>
                  <option>Département</option>
                  <option>Région</option>
              </Form.Control>
              </Form.Group>
          </Form.Row>
          <Form.Row>
              <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label className="text-center" style={{width: "12vw"}}>Etoiles</Form.Label>
              <Form.Control as="select" custom style={{width: "12vw", filter: "drop-shadow(2px 2px 5px black)"}}>
                  <option>Toutes étoiles</option>
                  <option>1 étoile</option>
                  <option>2 étoiles</option>
                  <option>3 étoiles</option>
                  <option>4 étoiles</option>
                  <option>5 étoiles</option>
              </Form.Control>
              </Form.Group>
          </Form.Row>
        </div>
        <div style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "space-around",
          width: "100%",
          padding: "1%", 
          marginBottom: "3%"
        }}>
          <h6 className="text-center">Overbooking Inbox</h6>
          <div style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "start",
          width: "100%",
          height: "35vh",
          padding: "1%",
          border: "1px solid white",
          borderRadius: "2%",
          filter: "drop-shadow(4px 4px 5px black)"
        }}>

          </div>
        </div>
        <RoomAvailable />
      </div>
    </Layout>
  )
}

export default RedPhone
