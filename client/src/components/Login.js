import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqloperations/mutations";
import Loader from "./Loader";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.log("Error while logging in", error.message);
  }
  if (data) {
    console.log(data);
    localStorage.setItem("token", data.user.token);
    navigate("/");
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
    // navigate("/");
  };
  return (
    <div className="container">
      <h5>Login</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="email"
            placeholder="email"
            name="email"
            //   value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            //   value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn" type="submit">
          Login
        </button>
        <p>
          <b>
            <Link to="/signup">Dont have an account? Sign Up</Link>
          </b>
        </p>
      </form>
    </div>
  );
};

export default Login;
