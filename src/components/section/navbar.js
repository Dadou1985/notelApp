import React, { useState } from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Button, Form, FormGroup, Input
} from 'reactstrap'
import Connection from '../../images/connection.png'
import Notification from '../../svg/bell.svg'

const NavbarPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar style={{
        display: "flex",
        justifyContent: "space-between",
        height: "7vh"
      }} color="info" light expand="md">
        <NavbarBrand href="/" style={{
          fontWeight: "bolder",
          fontSize: "1.5em",
          marginLeft: "5%"
        }}>Notel</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <div style={{
          display: "flex",
          flexFlow: "row",
          width: "35%",
          height: "5vh",
          justifyContent: "space-around",
          alignItems: "center"
        }}>
          <img src={Connection} alt="connect" style={{width: "7%"}} />
          <img src={Notification} alt="connect" style={{width: "6%"}} />
          <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" id="examplePassword" placeholder="Recherche" style={{height: "4vh"}} />
            </FormGroup>
            <Button size="sm" style={{height: "4vh", alignContent: "center"}}>Recherche</Button>
          </Form>
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarPage;