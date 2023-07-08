import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:action?" component={Users}/>
          <Route path="/login/:type?" component={Login}/>
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main}/>
          <Redirect to="/" />
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
