import React from "react";
import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <>
      {localStorage.removeItem("token")}
      <div>You are Logged Out Successfully</div>
      <p>
        <b>
          <Link to="/login">Login</Link>
        </b>
      </p>

      <p>
        <b>
          <Link to="/signup">Sign Up</Link>
        </b>
      </p>
    </>
  );
};

export default Logout;
