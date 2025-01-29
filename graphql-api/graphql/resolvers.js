const User = require('./../../mongodb/Users'); // Import the User model

const resolvers = {
  // Query resolvers
  hello: () => 'Hello, World!',
  program: () => 'This is a program',
  user: async ({ id }) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (err) {
      throw new Error('Error fetching user:', err);
    }
  },
  addUser: async ({ name, email }) => {
    try {
      if (/[!@#$%^&*(),.?":{}|<>;'``+=-]/.test(name)) {
        throw new Error('Invalid name format');
      }
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        throw new Error('Invalid email format');
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already registered');
      }
      const user = new User({ name, email });
      return await user.save();
    } catch (err) {
      throw new Error(`Error adding user: ${err.message}`);
    }
  },
};

module.exports = resolvers;
