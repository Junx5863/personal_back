const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firt_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
    required: true,
    max: 128,
  },
});

module.exports = mongoose.model("usuarios", UserSchema);
