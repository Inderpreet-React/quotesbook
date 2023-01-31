// import { ApolloServerPluginCacheControlDisabled } from "apollo-server-core";
import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { GET_USER_BY_ID } from "../gqloperations/queries";
import Loader from "./Loader";

const OtherUserProfile = () => {
  const { userid } = useParams();
  console.log(userid);
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      userid: userid,
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log("Error while loading other's profile", error.message);
  }
  if (data) {
    console.log(data);
  }

  return (
    <>
      <div>
        <img
          style={{ border: "2px solid", marginTop: "10px" }}
          //   className="circle"
          src={`https://robohash.org/${data.user.firstName}.png`}
          alt="ProfilePicture"
        />
        <h4>
          Name: {data.user.firstName} {data.user.lastName}
        </h4>
        <h4>Email: {data.user.email}</h4>
      </div>
      <h3> Your Quotes</h3>

      {data.user.quotes.map((quot, index) => {
        return (
          <blockquote key={index}>
            <h4>Quotes: {quot.name}</h4>
          </blockquote>
        );
      })}
    </>
  );
};
export default OtherUserProfile;
