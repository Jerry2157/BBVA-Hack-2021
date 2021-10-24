const express = require("express");
const router = express.Router();

// Controller
const {
    renderAdminForm,
    createNewAdmin,
    renderUsers,
    renderContractedInvestments,
    renderPayContractedInvestments,
    createNewPaymentInvestment,
    renderEditForm,
    updateAdmin,
    deleteAdmin
} = require("../controllers/admin.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Admin
router.get("/admins/add", isAuthenticated, renderAdminForm);

router.post("/admins/new-admin", isAuthenticated, createNewAdmin);


// Get All Users
router.get("/listusers", isAuthenticated, renderUsers);

// Get All Users
router.get("/listcontracts/:id", isAuthenticated, renderContractedInvestments);

// Get All Users
router.get("/pay-investment/:id", isAuthenticated, renderPayContractedInvestments);
router.post("/pay-investment/:id/:inversion_id", isAuthenticated, createNewPaymentInvestment);



// Edit Admins
router.get("/admins/edit/:id", isAuthenticated, renderEditForm);

router.put("/admins/edit-admin/:id", isAuthenticated, updateAdmin);

// Delete Admins
router.delete("/admins/delete/:id", isAuthenticated, deleteAdmin);

module.exports = router;