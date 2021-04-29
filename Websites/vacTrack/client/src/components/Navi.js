//code for the navbar
//imports
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

//navbar
function Navi() {
  return (
  <div>
    <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "#21262f"}} variant='dark'>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href=""style={{fontSize: "18px", color:"white"}}>VacTrack</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
  );
}

export default Navi;
