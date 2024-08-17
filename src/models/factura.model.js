const { mongoose } = require("mongoose");
const { Schema } = mongoose;


const FacturaSchema = new mongoose.Schema({
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
                ref: "producto", // Asegúrate de que esto referencie al modelo correcto de productos
            },
            amount: {
                type: Number,
            },
        },
    ],
    totalPayment: {
        type: Number,
        required: true,
    },
});

module.exports =mongoose.model('factura', FacturaSchema);