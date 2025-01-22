let users = [];

const resolvers = {
  hello: () => 'Hello, World!',
  user: ({ id }) => users.find(user => user.id === id),
  addUser: ({ name, email }) => {
    const newUser = { id: `${users.length + 1}`, name, email };
    users.push(newUser);
    return newUser;
  },
};

module.exports = resolvers;
