const { buildSchema } = require('graphql');
const schema = buildSchema(`
  scalar Upload
  type Query {
    hello: String         
    program: String
    user(id: ID!): User         
  }
  type Mutation {
    addUser(name: String!, email: String!): User 
  }
  type User {
    id: ID
    name: String
    email: String
    photo: String     
}        
`);

module.exports = schema;
