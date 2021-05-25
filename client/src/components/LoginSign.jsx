import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ReactReduxContext } from "react-redux";
import "../styles/login.css";
import { userLogged } from "../store/login";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import "../styles/loginDropdown.css";

export default function LoginSign() {
  // snackbar states
  const [openSnackFields, setOpenSnackFields] = React.useState(false);
  const [openSnackLogin, setOpenSnackLogin] = React.useState(false);
  const [openSnackRegister, setOpenSnackRegister] = React.useState(false);

  // redux
  const loginStore = useContext(ReactReduxContext);

  const history = useHistory();

  // snack bar
  const handleCloseSnackFields = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackFields(false);
  };

  const handleCloseSnackLogin = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackLogin(false);
  };

  const handleCloseSnackRegister = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackRegister(false);
  };

  function forgetpass() {
    window.alert("Not my problem");
  }
  // For user LOGIN
  const [loginUser, setLoginUser] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  let lname, lvalue;
  const handleLoginInputs = (event) => {
    // console.log(event);

    lname = event.target.name;
    lvalue = event.target.value;

    setLoginUser({ ...loginUser, [lname]: lvalue });
  };

  const loginData = async (event) => {
    event.preventDefault();

    const { loginEmail, loginPassword } = loginUser;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    const loginResData = await res.json();

    if (res.status === 400 || !loginResData) {
      window.alert(loginResData.error);
      // console.log(loginResData.error);
    } else {
      // console.log(loginResData);
      loginStore.store.dispatch(
        userLogged({
          id: loginResData.userLogin._id,
          userName: loginResData.userLogin.userName,
          email: loginResData.userLogin.email,
          profilePicture: loginResData.userLogin.profilePicture,
        })
      );
      setOpenSnackLogin(true);
      // window.alert('Login successfull!');
      history.push("/home");
    }
  };

  // for user RESISTRATION
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { userName, email, password, confirmPassword, profilePicture } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        password,
        confirmPassword,
        profilePicture,
      }),
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert(data.error);
      // console.log(data.error);
    } else {
      // console.log(data);
      loginStore.store.dispatch(
        userLogged({
          id: data.userRegister._id,
          userName: data.userRegister.userName,
          email: data.userRegister.email,
          profilePicture: data.userRegister.profilePicture,
        })
      );
      // console.log("registration successfull");
      // window.alert("Registration successful!");
      setOpenSnackRegister(true);
      history.push("/home");
    }
  };

  return (
    <div>
      {/* // fill all the fields snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        backgroundColor="#FFF8F2"
        open={openSnackFields}
        autoHideDuration={2000}
        onClose={handleCloseSnackFields}
        message="Fields can't be empty"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="white"
              onClick={handleCloseSnackFields}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {/* for login  */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        backgroundColor="#FFF8F2"
        open={openSnackLogin}
        autoHideDuration={2000}
        onClose={handleCloseSnackLogin}
        message="User Loggedin"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="white"
              onClick={handleCloseSnackLogin}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {/* for register  */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        // color="#FFF8F2"
        backgroundColor="#FFF8F2"
        open={openSnackRegister}
        autoHideDuration={2000}
        onClose={handleCloseSnackRegister}
        message="Fields can't be empty"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="white"
              onClick={handleCloseSnackRegister}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <div id="container">
        <div id="cover">
          <h1 className="sign-up">Hello, Friend!</h1>
          <p className="sign-up">
            Enter your personal details, create a personal account
            <br /> and start a journey with us
          </p>
          <a className="button sign-up" href="#cover">
            Sign Up
          </a>

          <h1 className="sign-in">Welcome Back!</h1>
          <p className="sign-in">
            To keep connected with us please
            <br /> login with your personal info
          </p>
          <br />
          <a className="button sub sign-in" href="#">
            Login
          </a>
        </div>

        <div id="login">
          <h1>Login</h1>

          <form method="POST">
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              required
              name="loginEmail"
              value={loginUser.loginEmail}
              onChange={handleLoginInputs}
            />
            <br />

            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              required
              name="loginPassword"
              value={loginUser.loginPassword}
              onChange={handleLoginInputs}
            />
            <br />

            <a id="forgot-pass" onClick={forgetpass}>
              Forgot your password?
            </a>
            <br />
            <input
              className="submit-btn"
              type="submit"
              value="Sign In"
              onClick={loginData}
            />
          </form>
        </div>

        <div id="register">
          <h1>Create Account</h1>
          <form method="POST">
            <input
              type="text"
              placeholder="Full name"
              autoComplete="off"
              required
              name="userName"
              value={user.userName}
              onChange={handleInputs}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              required
              name="email"
              value={user.email}
              onChange={handleInputs}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              required
              name="password"
              value={user.password}
              onChange={handleInputs}
            />
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              required
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputs}
            />
            <br />
            <div className="ip_container_login">
              <div className="ip_select-box_login">
                <select
                  name="profilePicture"
                  onChange={handleInputs}
                  value={user.profilePicture}
                  defaultValue="default"
                  placeholder="Select your Avatar"
                >
                  <option value="fitness">Choose an Avatar</option>
                  <option value="maleAvatar1">Male Avatar 1</option>
                  <option value="maleAvatar2">Male Avatar 2</option>
                  <option value="femaleAvatar1">Female Avatar 1</option>
                  <option value="femaleAvatar2">Female Avatar 2</option>
                  <option value="boyAvatar">Boy Avatar</option>
                  <option value="girlAvatar">Girl Avatar</option>
                </select>
              </div>
            </div>
            <br />
            <input
              className="submit-btn spcial"
              type="submit"
              value="Sign Up"
              onClick={PostData}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
