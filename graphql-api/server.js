const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema'); // Import the schema
const resolvers = require('./graphql/resolvers'); // Import the resolvers

const app = express(); // Create an Express app

// Set up the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema, // Provide the schema
  rootValue: resolvers, // Provide the resolvers
  graphiql: true, // Enable GraphiQL, a browser-based UI for testing GraphQL
}));

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/graphql`);
});
