import path from 'path';
import { createServer } from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import models from './db';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));
const schema = makeExecutableSchema({ typeDefs, resolvers });


const PORT = process.env.PORT || 4000;
const FORCE = false;

const app = express();
const ws = createServer(app);

const server = new ApolloServer({
  schema,
  resolvers,
  context: () => ({
    models
  }),
})

server.applyMiddleware({ app });


models.sequelize.sync({ force: FORCE}).then(() => {
  
  ws.listen(PORT, () => {
    console.log(`Apollo Server is now running on PORT ${PORT}`);

    new SubscriptionServer({
      onConnect: () => {
        console.log('new ws connection');
        return { models };
      },
      execute,
      subscribe,
      schema
    }, {
      server: ws,
      path: '/graphql'
    });
  });
});