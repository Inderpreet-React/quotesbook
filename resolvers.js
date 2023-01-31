import { quotes, users } from "./fakedb.js";
// import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    iquote: async (_, { by }) => await Quote.find({ by }),
    myprofile: async (_, args, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      //   const _id = randomBytes(5).toString("hex");
      //   users.push({
      //     _id,
      //     ...userNew,
      //   });
      //   return users.find((user) => user._id == _id);
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists with that email id");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 10);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUser.save();
    },

    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User does not exist with this email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("Email or Password is Incorrect");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
      //protected
      //   console.log(context, name, userId);
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote Saved Successfully";
    },
  },
};

export default resolvers;
