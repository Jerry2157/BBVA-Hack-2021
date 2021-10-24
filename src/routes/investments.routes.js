const express = require("express");
const router = express.Router();

// Controller
const {
    renderNoteForm,
    createNewNote,
    renderInvestments,
    renderEditForm,
    updateNote,
    deleteInvestment,
    renderWelcomeInvestments,
    Recommendations,
    AllProducts,
    RecommendedProducts,
    renderWizardInvestments,
    productOne,
    contractProductOne,
    productTwo,
    contractProductTwo,
    productThree,
    contractProductThree,
    landingNewInvestment,
    renderInsights
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
router.get("/investments", isAuthenticated, renderInvestments);

// Get All Products Investements
router.get("/investments/allproducts", isAuthenticated, AllProducts);

// Get Recommended Products Investements
router.get("/investments/recommendedproducts", isAuthenticated, RecommendedProducts);

// Get Recommended Products Investements
router.get("/investments/insights", isAuthenticated, renderInsights);

// Edit Investment
router.get("/investments/edit/:id", isAuthenticated, renderEditForm);

router.put("/investments/edit-note/:id", isAuthenticated, updateNote);

// Delete Investment
router.get("/investments/delete/:id", isAuthenticated, deleteInvestment);


router.get("/investments/landing-new-investment", isAuthenticated, landingNewInvestment);

// Contract Investment
router.get("/investments/productinfo/product_one", isAuthenticated, productOne);
router.post("/investments/productinfo/product_one", isAuthenticated, contractProductOne);

router.get("/investments/productinfo/product_two", isAuthenticated, productTwo);
router.post("/investments/productinfo/product_two", isAuthenticated, contractProductTwo);

router.get("/investments/productinfo/product_three", isAuthenticated, productThree);
router.post("/investments/productinfo/product_three", isAuthenticated, contractProductThree);


module.exports = router;