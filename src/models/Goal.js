const { Schema, model } = require("mongoose");

const GoalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        default: 1000
    },
    finish_date: {
        type: Date,
        default: Date.now
    },
    fulfillment_date: {
        type: Date,
        default: Date.now
    },
    buyed_date: {
        type: Date,
        default: Date.now
    },
    accomplished: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("Goal", GoalSchema);