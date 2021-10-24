const { Schema, model } = require("mongoose");

const InvestmentSchema = new Schema({
    idCatalogInvestment: {
        type: Number,
        required: true,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: "sin descripción"
    },
    type_rent: {
        type: String,
        required: true
    },
    init_balance: {
        type: Number,
        required: true
    },
    investment_balance: {
        type: Number,
        required: true
    },
    interest: {
        type: Number,
        required: false,
        default: 3.0
    },
    periodicity: {
        type: String,
        required: true,
        default: "monthly"
    },
    init_date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("Investment", InvestmentSchema);