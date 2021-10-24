const utils = {};
const Onboardings = require("../models/Onboardings");

utils.ShowedOnboarding = async(user_id, onboarding_id) => {
    var query = { user: user_id },
        update = { onboarding_id: true },
        options = {
            upsert: false,
            new: false
        };
    var isShowed = true;
    switch (onboarding_id) {
        case "onboardingwelcomeshowed":
            update = { onboardingwelcomeshowed: true }
            break;
        case "onboardinginvestmentsshowed":
            update = { onboardinginvestmentsshowed: true }
            break;
        case "onboardingnotificationsshowed":
            update = { onboardingnotificationsshowed: true }
            break;
        case "onboardinggoalsshowed":
            update = { onboardinggoalsshowed: true }
            break;
        case "onboardingrecommendationsshowed":
            update = { onboardingrecommendationsshowed: true }
            break;
        case "onboardingcontractshowed":
            update = { onboardingcontractshowed: true }
            break;
        default:
            return true;
    }
    try {
        var result = await Onboardings.findOne(query);
        if (result == null) {
            console.log("no hay documento")
            update.user = user_id
            onboardings = new Onboardings(update);
            onboardings.save();
            return false;
        } else {
            result_two = await Onboardings.findOneAndUpdate(query, update, options, async function(error, result) {});
            return result[onboarding_id];
        }
    } catch (error) {

    }

    return isShowed;
}

module.exports = utils;