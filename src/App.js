import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/users/:userId?" component={Users}/>
        <Route path="/login" component={Login}/>
        <Route path="/" exact component={Main}/>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
