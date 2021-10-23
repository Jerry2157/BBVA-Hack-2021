const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: "sin descripción"
    },
    category: {
        type: String,
        required: false,
        default: "gastos general"
    },
    money: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("Transaction", TransactionSchema);