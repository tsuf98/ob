const mongoose = require('mongoose');
const requireAll = require('require-all');
const express = require('express');
const http = require('http');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginDrainHttpServer
} = require('apollo-server-core');
const { mongoUri } = require('./secrets.js');
const ModelInitiator = require('./services/init-models');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();

const PORT = 8080 || process.env.PORT;
const APOLLO_PORT = 4000 || process.env.APOLLO_PORT;

mongoose.connect(mongoUri, () =>
  console.log('DB connection established')
);

requireAll(path.join(__dirname, 'models'));
ModelInitiator.initModels();

app.use(express.static(path.join(__dirname, 'backoffice', 'build')));
app.use(express.static('backoffice/public'));

app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'backoffice', 'build', 'index.html')
  );
});

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) =>
    httpServer.listen({ port: APOLLO_PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${APOLLO_PORT}${server.graphqlPath}`
  );
}

app.listen(PORT, () =>
  console.log(`Amazing! app is listening on port ${PORT} ^_^ `)
);

// app.listen(PORT, () =>
//   console.log(`Amazing! app is listening on port ${PORT} ^_^ `)
// );

startApolloServer(typeDefs, resolvers);
