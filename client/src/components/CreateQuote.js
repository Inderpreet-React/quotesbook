import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_QUOTE } from "../gqloperations/mutations";
import Loader from "./Loader";

const CreateQuote = () => {
  const [quote, setQuote] = useState("");

  const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getMyProfile"],
  });

  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.log("Error while creating a quote", error.message);
  }
  if (data) {
    console.log(data);
    // localStorage.setItem("token", data.user.token);
    // navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quote);
    createQuote({
      variables: {
        name: quote,
      },
    });
    setQuote("");
  };
  return (
    <div className=" container">
      {error && <div className="red">{error.message}</div>}

      {data && <div className="green">{data.quote}</div>}
      <h1>Create Quote</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Write your quote here"
        />
        <button>Create </button>
      </form>
    </div>
  );
};

export default CreateQuote;
