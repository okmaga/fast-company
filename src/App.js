import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualityProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:action?" component={Users}/>
              <Route path="/login/:type?" component={Login}/>
              <Route path="/logout" component={LogOut} />
              <Route path="/" exact component={Main}/>
              <Redirect to="/" />
            </Switch>
          </QualityProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
