import React, {  useContext } from "react";
import { useHistory } from "react-router-dom";
import { ReactReduxContext } from "react-redux";

export default function Logout() {
  const loginStore = useContext(ReactReduxContext);
  const history = useHistory();
  loginStore.store.dispatch();
  
  window.alert('User Logged out!');
  history.push("/home");
  return <></>;
}
