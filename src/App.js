import React from "react";
import Users from "./components/Users";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./components/main";
import Login from "./components/login";
import UserPage from "./components/userPage";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/login" component={Login}/>
        <Route path="/users/:userId?" component={Users}/>
        <Route path="/userPage" component={UserPage}/>
      </Switch>
    </div>
  );
};

export default App;
