const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
require("dotenv").config();

async function startServer() {
  const PORT = 4000;
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

  mongoose.connect("mongodb://localhost:27017/items_db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  app.listen(process.env.PORT || 4000, () => console.log(`Server is running on port ${process.env.PORT || 4000}`));
}

startServer();
