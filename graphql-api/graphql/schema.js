const { buildSchema } = require('graphql');
const schema = buildSchema(`
  type Query {
    hello: String         
    user(id: ID!): User           
  }
  type Mutation {
    addUser(name: String!, email: String!): User 
  }
  type User {
    id: ID
    name: String
    email: String             
`);

module.exports = schema;
