const goalsCtrl = {};

// Models
const Goal = require("../models/Goal");

goalsCtrl.renderGoalForm = (req, res) => {
    res.render("goals/new-goal");
};

goalsCtrl.createNewGoal = async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
        errors.push({ text: "Please Write a Description" });
    }
    if (errors.length > 0) {
        res.render("goals/new-goal", {
            errors,
            title,
            description,
        });
    } else {
        const newGoal = new Goal({ title, description });
        newGoal.user = req.user.id;
        await newGoal.save();
        req.flash("success_msg", "Goal Added Successfully");
        res.redirect("/goals");
    }
};

goalsCtrl.renderGoals = async(req, res) => {
    const goals = await Goal.find({ user: req.user.id })
        .sort({ date: "desc" })
        .lean();
    res.render("goals/all-goals", { goals });
};

goalsCtrl.renderEditForm = async(req, res) => {
    const goal = await Goal.findById(req.params.id).lean();
    if (goal.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/goals");
    }
    res.render("goals/edit-goal", { goal });
};

goalsCtrl.updateGoal = async(req, res) => {
    const { title, description } = req.body;
    await Goal.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Goal Updated Successfully");
    res.redirect("/goals");
};

goalsCtrl.deleteGoal = async(req, res) => {
    await Goal.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Goal Deleted Successfully");
    res.redirect("/goals");
};

module.exports = goalsCtrl;