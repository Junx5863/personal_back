const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "sha512";

exports.generateToken =(user)=> {
  const payload = {
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "5m",
  });
}

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);

    return decoded;
  } catch (error) {
    throw new Error("Token no valido");
  }
}
