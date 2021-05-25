import { Route, Redirect } from "react-router";
import "./App.css";
import Banner from "./components/Banner";
import Header from "./components/Header";
import LoginSign from "./components/LoginSign";
import MyProfileCard from "./components/MyProfileCard";
import BlogPost from "./components/BlogPost";

function App() {
  return (
    <>
      <Header />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home">
        <Banner />
      </Route>
      <Route exact path="/myprofile">
        <MyProfileCard />
      </Route>
      <Route exact path="/login">
        <LoginSign />
      </Route>
      <Route exact path="/blogpost">
        <BlogPost />
      </Route>
    </>
  );
}

export default App;
