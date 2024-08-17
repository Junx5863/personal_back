const dotenv = require("dotenv");
dotenv.config();

dataEnv = {
  port_back: process.env.PORT || 3000,
  port_db: process.env.PORT_DB || 27017,
  mongoURI: process.env.MONGO_URI || "127.0.0.1",
  DB_NAME: process.env.DB_NAME || "test",
  mailer:{
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    }
  },

  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = dataEnv;