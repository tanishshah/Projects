//imports
import React from 'react';
import * as reactBootStrap from 'react-bootstrap';

//navbar
function Navi() {
  return (
  <div>
    <reactBootStrap.Navbar collapseOnSelect expand="lg" style={{backgroundColor: "#21262f"}} variant='dark'>
      <reactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <reactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
        <reactBootStrap.Nav className="ml-auto">
          <reactBootStrap.Nav.Link href=""style={{fontSize: "18px", color:"white"}}>VacTrack</reactBootStrap.Nav.Link>
        </reactBootStrap.Nav>
      </reactBootStrap.Navbar.Collapse>
    </reactBootStrap.Navbar>
  </div>
  );
}

export default Navi;
