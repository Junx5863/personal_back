const userSchema = require("#M/user.model");

const UserDao = {
  async createUser(userData) {
    const newUser = new userSchema(userData);
    return await newUser.save();
  },

  async findUserByEmailAndPassword(email, hashedPassword) {
    return await userSchema.findOne({ email, password: hashedPassword });
  },
};

module.exports = UserDao;
