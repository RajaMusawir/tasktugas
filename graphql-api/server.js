const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const app = express(); 
const mongoose = require('mongoose');
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));
mongoose.connect('mongodb+srv://rajamusawirwork:kfADqwhdjl2trR7E@cluster0.ivi1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {
  app.listen(4000, () => {
    console.log('Server running at http://localhost:4000/graphql');
  });
}).catch((error) => {
console.error('Error connecting to MongoDB:', error);
});