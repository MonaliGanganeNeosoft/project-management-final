import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../layout/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { IoMdMail } from "react-icons/io";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Register = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const registerTab = useRef(null);

  const [user, setUser] = useState({
    first_name: "",
    last_name:"",
    email: "",
    password: "",
    

  });
  const { first_name,last_name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

   const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("first_name", first_name);
    myForm.set("last_name",last_name);
    myForm.set("email", email);
    myForm.set("password", password);
    
    myForm.set("avatar", avatar);
   
    console.log("signup form submitted")
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/all";

  // const redirect = "/all";
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
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <div className="registerpa" style={{border:"2px solid red",width:"100vw",height:"100vh",maxWidth:"100%",backgroundColor:"white",position:"fixed",top:"0%"}}>
          <Container>
            <Form
              className="registration"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <hr />
              <h3>Register to Project Management</h3>
              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="first_name"
                    required
                    name="first_name"
                    value={first_name}
                    onChange={registerDataChange}
                  />
                  {/* change icon here */}
                </InputGroup>
              </Form.Group>


              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="last_name"
                    required
                    name="last_name"
                    value={last_name}
                    onChange={registerDataChange}
                  />
                  {/* change icon here */}
                </InputGroup>
              </Form.Group>


              <Form.Group>
                <InputGroup>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                  <IoMdMail className="iconlogin" />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup>
                  <FormControl
                    placeholder="Password"
                    type={showpassword ? "text" : "password"}
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
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


             
             

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>

              <Button type="submit">Register</Button>
            </Form>
            <p className="w-100 text-start">
                <span style={{ cursor: "pointer" }}>
                  <Link to="/login">Login</Link>
                </span>
            </p>
          </Container>
        </div>
        </>
      )}
    </>
  );
};

export default Register;
