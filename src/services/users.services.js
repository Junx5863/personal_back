const crypto = require("crypto");
const userSchema = require("#M/user.model");
const UserDao = require("#DAO/users.dao");
const jwt = require("jsonwebtoken");

exports.registerUser = async (userData) => {
  const hashedPassword = crypto
    .createHash("sha512")
    .update(userData.password)
    .digest("hex");

  userData.password = hashedPassword;

  const savedUser = await UserDao.createUser({
    ...userData,
    password: hashedPassword,
  });
  return savedUser; 
};

exports.loginUser = async (email, password) => {
  const hashedPassword = crypto
    .createHash('sha512')
    .update(password)
    .digest('hex');

  let user;

  if (UserDao) {
    user = await UserDao.findUserByEmailAndPassword(email, hashedPassword);
  } else {
    user = await userSchema.findOne({ email, password: hashedPassword });
  }

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id, email: user.email }, '__recret__', { expiresIn: '12h' });
  return { token, user };
};

exports.getAllUsers = async () => {
  const users = await userSchema.find();
  return users;
};
