const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

require("dotenv").config();

const uri =
  process.env.MONGODB_URI ??
  "mongodb+srv://jopms:QwErTy123%23@grocery-store.ncgm5.mongodb.net/?retryWrites=true&w=majority";

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });

  app.use((_, res) => {
    res.send("");
  });

  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  app.listen(process.env.PORT || 4000, () =>
    console.log(`Server is running on port ${process.env.PORT || 4000}`)
  );
}

startServer();
