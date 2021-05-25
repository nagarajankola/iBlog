import React, { useLayoutEffect, useContext } from "react";
import "../styles/utils.css";
import "../styles/style.css";
import "../styles/mobile.css";
import logoImg from "../images/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import { ReactReduxContext } from "react-redux";
import { userLoggedOut } from "../store/login";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";

export default function Header() {
  // snackbar states
  const [openSnack, setOpenSnack] = React.useState(false);
  const [openSnackLogout, setOpenSnackLogout] = React.useState(false);

  const handleCloseSnackLogout = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackLogout(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  // redux snipppet to store login info
  const loginStore = useContext(ReactReduxContext);
  const loggedUserData = useContext(ReactReduxContext);
  const currentUser = loggedUserData.store.getState();

  // console.log(currentUser.isLoggedIn);

  const loginStatus = currentUser.isLoggedIn;

  const history = useHistory();
  const location = useLocation();

  function logoutUser() {
    history.push("/home");
    loggedUserData.store.dispatch(userLoggedOut({}));
    setOpenSnackLogout(true);
  }

  // if used has not logged in
  function myProfileClickHandler() {
    setOpenSnack(true);
  }
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <nav className="navigation max-width-1 m-auto">
        <div className="nav-left">
          <NavLink to="/home">
            <span>
              <img src={logoImg} style={{ width: "94px" }} />
            </span>
          </NavLink>
          <ul>
            <NavLink
              to="/home"
              style={{ textDecoration: "none" }}
              activeClassName="selected"
            >
              <li>
                <a>Home</a>
              </li>
            </NavLink>
            {loginStatus ? (
              <NavLink
                to="/myprofile"
                style={{ textDecoration: "none" }}
                activeClassName="selected"
              >
                <li>
                  <a>My Profile</a>
                </li>
              </NavLink>
            ) : (
              <NavLink
                onClick={myProfileClickHandler}
                to="/login"
                style={{ textDecoration: "none" }}
                // activeClassName="selected"
              >
                <li>
                  <a>My Profile</a>
                </li>
              </NavLink>
            )}
          </ul>
        </div>
        <div className="nav-left">
          <ul>
            {loginStatus ? (
              <NavLink
                onClick={logoutUser}
                to="/home"
                style={{ textDecoration: "none", color: "red" }}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                onClick={() => {
                  loginStore.store.dispatch(userLoggedOut());
                }}
                to="/login"
                style={{ textDecoration: "none" }}
                activeClassName="selected"
              >
                <li>
                  <a>Login</a>
                </li>
              </NavLink>
            )}
          </ul>
        </div>
      </nav>
      <div className="max-width-1 m-auto">
        <hr />
      </div>
      {/* please login snack  */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message="Please Login!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="white"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" style={{ color: "white" }} />
            </IconButton>
          </React.Fragment>
        }
      />
      {/* userLoggedOut snackbar  */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openSnackLogout}
        autoHideDuration={3000}
        onClose={handleCloseSnackLogout}
        message="User Loggedout"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="white"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" style={{ color: "white" }} />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
