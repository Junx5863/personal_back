const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const CaritoSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    nombre_cliente: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    products: [
        {
            product_code: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "tickets",
            },
        },
    ],
});

module.exports = mongoose.model("carrito", CaritoSchema);