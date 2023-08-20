import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(type === "register" ? type : "login");
  const toggleFormType = () => {
    setFormType(prev => prev === "register" ? "login" : "register");
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 .offset-md-3 shadow p-4">
          {formType === "register"
            ? <>
              <h3 className="bt-4">Register</h3>
              <RegisterForm /> <p>Already have an account? <a role="button" onClick={toggleFormType}>Sign in</a>.</p></>
            : <>
              <h3 className="bt-4">Login</h3>
              <LoginForm />
              <p>Don`t have an account? <a role="button" onClick={toggleFormType}>Register</a>.</p>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
