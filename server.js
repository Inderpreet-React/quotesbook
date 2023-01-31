import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGql.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_SECRET, MONGO_URI } from "./config.js";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error While Connecting", err);
});

//Import Models
import "./models/Quotes.js";
import "./models/User.js";

//Import Resolvers
import resolvers from "./resolvers.js";

//Middleware
const context = ({ req }) => {
  const { authorization } = req.headers;
  // console.log(authorization, req.headers.authorization);
  if (authorization) {
    const { userId } = jwt.verify(authorization, JWT_SECRET);
    return { userId };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //Below line will work everytime before resolver
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
