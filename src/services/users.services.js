const crypto = require('crypto');
const userSchema = require("#M/user.model");
const jwt = require('jsonwebtoken');

exports.registerUser = async (userData) => {
  const hashedPassword = crypto
    .createHash('sha512')
    .update(userData.password)
    .digest('hex');

  const newUser = new userSchema({
    ...userData, // Spread operator to include all user data
    password: hashedPassword,
  });

  const savedUser = await newUser.save();
  return savedUser; // Return the saved user object
};


exports.loginUser = async (email, password) => {
  const hashedPassword = crypto
    .createHash('sha512')
    .update(password)
    .digest('hex');

  const user = await userSchema.findOne({ email, password: hashedPassword });

  if (!user) {
    throw new Error('Invalid email or password'); 
  }

  const token = jwt.sign({ id: user._id, email: user.email }, '__recret__', { expiresIn: '12h' });
  return { token, user }; // Return both token and user object
};