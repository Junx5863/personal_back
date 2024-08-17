const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const TicketSchema = new Schema({
  code: {
    type: String,
  },
  rchase_date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  carritos: [
    {
      carrito_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carrito",
      },
    },
  ],
});

module.exports = mongoose.model("tickets", TicketSchema);
