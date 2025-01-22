const { buildSchema } = require('graphql');

// Define your schema using GraphQL schema language
const schema = buildSchema(`
  # Query is used to fetch data
  type Query {
    hello: String                 # A simple field that returns a greeting message
    user(id: ID!): User           # Fetch a user by their ID
  }

  # Mutation is used to modify data
  type Mutation {
    addUser(name: String!, email: String!): User  # Add a new user with name and email
  }

  # User type represents the structure of a user object
  type User {
    id: ID                         # Unique identifier for the user
    name: String                   # Name of the user
    email: String                  # Email of the user
  }
`);

module.exports = schema;
