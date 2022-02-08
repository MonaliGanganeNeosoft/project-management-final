import React, { useRef, useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";

import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

import { IoMdMail } from "react-icons/io";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";

import "./Login.css";
const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    // console.log("login form submitted")
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  // const redirect = location.search ? location.search.split("=")[1] : "/account";
    const redirect = location.search ? location.search.split("=")[1] : "/all";

  // const redirect="/all";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const [showpassword, setShowPassword] = useState(false);

  const [data,setData]=useState("");
   

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="loginpageContainer" style={{border:"2px solid red",width:"100vw",height:"100vh",maxWidth:"100%",backgroundColor:"white",position:"fixed",top:"0%"}}>
           

            <hr />

            <div className="login" style={{border:"2px solid red",width:"400px",marginLeft:"500px",marginTop:"100px" }}>
            <Container text-start  bg-light>
              <Form ref={loginTab} onSubmit={loginSubmit}>
                <h4>Login to Project Management</h4>
                <Form.Group>
                  <InputGroup>
                    <FormControl
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                    <IoMdMail className="iconlogin" />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <InputGroup>
                    <FormControl
                      name="password"
                      placeholder="Password"
                      type={showpassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    {showpassword ? (
                      <BsEyeFill
                        className="iconlogin"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <BsEyeSlashFill
                        className="iconlogin"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </InputGroup>
                </Form.Group>
                <Button type="submit">Login</Button>
              </Form>
              <p className="w-100 text-start">
                <span style={{ cursor: "pointer" }}>
                  <Link to="/register">dont have account pls ? Register</Link>
                </span>
            </p>
            </Container>
            </div>
            
          </div>
        </>
      )}
    </>
  );
};

export default Login;
