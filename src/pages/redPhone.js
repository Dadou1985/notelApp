import React, { useState } from "react"
import Layout from "../components/layout"
import {Form, FormControl, Button} from 'react-bootstrap'
import HotelMap from '../components/section/map'
import RoomAvailable from '../components/section/form/roomAvailable'
import OverbookingBox from '../components/section/overbookingBox'


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
          marginTop: "2%",
          marginBottom: "2%"
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
        <OverbookingBox />
        <RoomAvailable />
      </div>
    </Layout>
  )
}

export default RedPhone
