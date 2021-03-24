//imports
import React,{Component} from 'react';
import * as reactBootStrap from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

//navbar
class Navi extends Component{
  render(){
    return (
      <div className="Navi">
          <reactBootStrap.Navbar collapseOnSelect expand="lg" className='nmain' variant="light">
              <reactBootStrap.Navbar.Brand>Buggy</reactBootStrap.Navbar.Brand>
              <reactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <reactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
              <reactBootStrap.Nav className="mr-auto">
              <reactBootStrap.Nav.Link as={Link} to="/">Home</reactBootStrap.Nav.Link>
              <reactBootStrap.NavDropdown title="Actions" id="collasible-nav-dropdown">
                  <reactBootStrap.NavDropdown.Item as={Link} to="/List">View Bugs</reactBootStrap.NavDropdown.Item>
                  <reactBootStrap.NavDropdown.Item as={Link} to="/Action">Make Bug</reactBootStrap.NavDropdown.Item>
              </reactBootStrap.NavDropdown>
              </reactBootStrap.Nav>
              </reactBootStrap.Navbar.Collapse>
          </reactBootStrap.Navbar>
      </div>
    );
  }
}

export default Navi;
