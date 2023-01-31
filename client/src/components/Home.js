import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log("Error while fetching data", error.message);
  }
  if (data.quotes.length === 0) {
    return <h2>No Quotes Available</h2>;
  }
  return (
    <div className="container">
      <h3> Home Page</h3>
      {data.quotes.map((quote, index) => {
        return (
          <blockquote key={index}>
            <h4>{quote.name}</h4>
            <Link to={`/profile/${quote.by._id}`}>
              <p>~Created By: {quote.by.firstName}</p>
            </Link>
          </blockquote>
        );
      })}
    </div>
  );
};

export default Home;
