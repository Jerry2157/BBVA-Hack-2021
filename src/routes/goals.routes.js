const express = require("express");
const router = express.Router();

// Controller
const {
    renderGoalForm,
    createNewGoal,
    renderGoals,
    renderEditForm,
    updateGoal,
    deleteGoal
} = require("../controllers/goals.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Note
router.get("/investments/goals/add", isAuthenticated, renderGoalForm);

router.post("/investments/goals/new-goal", isAuthenticated, createNewGoal);

// Get All Notes
router.get("/investments/goals", isAuthenticated, renderGoals);

// Edit Notes
router.get("/investments/goals/edit/:id", isAuthenticated, renderEditForm);

router.put("/investments/goals/edit-goal/:id", isAuthenticated, updateGoal);

// Delete Notes
router.delete("/investments/goals/delete/:id", isAuthenticated, deleteGoal);

module.exports = router;