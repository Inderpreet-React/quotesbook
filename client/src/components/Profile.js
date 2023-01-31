// import { ApolloServerPluginCacheControlDisabled } from "apollo-server-core";
import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router";
import { GET_MY_PROFILE } from "../gqloperations/queries";
import Loader from "./Loader";

const Profile = () => {
  const { data, loading, error } = useQuery(GET_MY_PROFILE);
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1>Unauthorized</h1>;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log("Error while loading the profile", error.message);
  }
  if (data) {
    console.log(data.myprofile);
  }

  return (
    <>
      <div>
        <img
          style={{ border: "2px solid", marginTop: "10px" }}
          //   className="circle"
          src={`https://robohash.org/${data.myprofile.firstName}.png`}
          alt="ProfilePicture"
        />
        <h4>
          Name: {data.myprofile.firstName} {data.myprofile.lastName}
        </h4>
        <h4>Email: {data.myprofile.email}</h4>
      </div>
      <h3> Your Quotes</h3>

      {data.myprofile.quotes.map((quot, index) => {
        return (
          <blockquote key={index}>
            <h4>Quotes: {quot.name}</h4>
          </blockquote>
        );
      })}
    </>
  );
};
export default Profile;
