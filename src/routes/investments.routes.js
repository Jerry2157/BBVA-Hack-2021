const express = require("express");
const router = express.Router();

// Controller
const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote,
    renderWelcomeInvestments,
    Recommendations,
    AllProducts,
    RecommendedProducts,
    renderWizardInvestments
} = require("../controllers/investments.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// Wizard inversiones
router.get("/investments/wizard-investments", isAuthenticated, renderWizardInvestments);

// Stepper inversiones
router.get("/investments/welcome-investments", isAuthenticated, renderWelcomeInvestments);

// Recomendaciones
router.get("/investments/recommendations", isAuthenticated, Recommendations);

// Agregar notas
router.get("/investments/add", isAuthenticated, renderNoteForm);

router.post("/investments/new-investment", isAuthenticated, createNewNote);

// Get All Investements
router.get("/investments", isAuthenticated, renderNotes);

// Get All Products Investements
router.get("/investments/allproducts", isAuthenticated, AllProducts);

// Get Recommended Products Investements
router.get("/investments/recommendedproducts", isAuthenticated, RecommendedProducts);

// Edit Investment
router.get("/investments/edit/:id", isAuthenticated, renderEditForm);

router.put("/investments/edit-note/:id", isAuthenticated, updateNote);

// Delete Investment
router.delete("/investments/delete/:id", isAuthenticated, deleteNote);

module.exports = router;