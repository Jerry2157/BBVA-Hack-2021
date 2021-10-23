const { Schema, model } = require("mongoose");

const InvestmentTransactionsSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    concept: {
        type: String,
        required: true
    },
    money_payed: {
        type: Number,
        required: true
    },
    inversion_id: {
        type: String,
        required: true
    },
    payed_date: {
        type: Date,
        default: Date.now
    },
    userwhopayed: {
        type: String,
        required: true,
        default: "0"
    }
}, {
    timestamps: true
});

module.exports = model("InvestmentTransactions", InvestmentTransactionsSchema);