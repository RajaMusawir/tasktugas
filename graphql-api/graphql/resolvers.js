// Mock database to store user data
let users = [];

const resolvers = {
  // Resolver for the 'hello' query
  hello: () => 'Hello, World!',

  // Resolver for fetching a user by ID
  user: ({ id }) => users.find(user => user.id === id),

  // Resolver for adding a new user
  addUser: ({ name, email }) => {
    const newUser = { id: `${users.length + 1}`, name, email }; // Create a new user object
    users.push(newUser); // Add the new user to the mock database
    return newUser; // Return the newly added user
  },
};

module.exports = resolvers;
