import React from "react";
import CreateQuote from "./components/CreateQuote";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import OtherUserProfile from "./components/OtherUserProfile";
import Profile from "./components/Profile";
import Signup from "./components/Signup";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <CreateQuote />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:userid",
    element: <OtherUserProfile />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
];
