import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USERS } from "../gqloperations/mutations";
import Loader from "./Loader";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USERS);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.log("Error while creating new user", error.message);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signupUser({
      variables: {
        userNew: formData,
      },
    });
  };

  return (
    <div className="container">
      {error && <div className="red">{error.message}</div>}

      {data && data.user && (
        <div className="green">
          {data.user.firstName} is Signed Up. You can login now
        </div>
      )}
      <h5>Sign Up</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="firstName"
            placeholder="firstName"
            name="firstName"
            //   value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="lastName"
            placeholder="lastName"
            name="lastName"
            //   value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
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
          Signup
        </button>
        <p>
          <b>
            <Link to="/login">Already have an account? Login</Link>
          </b>
        </p>
      </form>
    </div>
  );
};

export default Signup;
