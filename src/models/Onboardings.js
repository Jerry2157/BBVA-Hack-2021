const { Schema, model } = require("mongoose");

const OnboardingsSchema = new Schema({
    onboardingwelcomeshowed: {
        type: Boolean,
        required: false,
        default: false
    },
    onboardinginvestmentsshowed: {
        type: Boolean,
        required: false,
        default: false
    },
    onboardingnotificationsshowed: {
        type: Boolean,
        required: false,
        default: false
    },
    onboardinggoalsshowed: {
        type: Boolean,
        required: false,
        default: false
    },
    onboardingrecommendationsshowed: {
        type: Boolean,
        required: false,
        default: false
    },
    onboardingcontractshowed: {
        type: Boolean,
        required: false,
        default: false
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("Onboardings", OnboardingsSchema);