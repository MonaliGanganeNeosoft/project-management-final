import React from 'react';
import {
  Navbar,
  Container,
  Nav,
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '../../../actions/userAction';
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";



const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  
  const logoutUser=()=>{
    

    dispatch(logout());
    history.push("/login");
    // alert.success("Logout Successfully");
    
    
  }
  return <>
  <div>
  <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Project Management</Navbar.Brand>
   
    <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="text-white">
                <Link to="/all">ALL</Link>
              </Nav.Link>
    </Nav>
    <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="text-white">
              <Link to="/admin/projectDetails">Self</Link>
              </Nav.Link>
    </Nav>
    <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="text-white">
              <Link to="/others">Others</Link>
              </Nav.Link>
    </Nav>
    
    {/* <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="text-white">
              <Link to="/login">Login</Link>
              </Nav.Link>
    </Nav> */}
    <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="text-white">
              
               <p onClick={()=>logoutUser()}>Logout</p>
              </Nav.Link>
    </Nav>
   
    </Container>
  </Navbar>
  </div>
  </>
};

export default Header;
