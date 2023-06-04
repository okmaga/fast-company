import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <ProfessionProvider>
        <QualityProvider>
          <Switch>
            <Route path="/users/:userId?/:action?" component={Users}/>
            <Route path="/login/:type?" component={Login}/>
            <Route path="/" exact component={Main}/>
            <Redirect to="/" />
          </Switch>
        </QualityProvider>
      </ProfessionProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
