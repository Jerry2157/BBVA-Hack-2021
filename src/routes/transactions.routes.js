const express = require("express");
const router = express.Router();

// Controller
const {
    renderTransactionForm,
    createNewTransaction,
    renderTransactions,
    renderEditForm,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transactions.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Note
router.get("/transactions/add", isAuthenticated, renderTransactionForm);

router.post("/transactions/new-transaction", isAuthenticated, createNewTransaction);

// Get All Notes
router.get("/transactions", isAuthenticated, renderTransactions);

// Edit Notes
router.get("/transactions/edit/:id", isAuthenticated, renderEditForm);

router.put("/transactions/edit-transaction/:id", isAuthenticated, updateTransaction);

// Delete Notes
router.delete("/transactions/delete/:id", isAuthenticated, deleteTransaction);

module.exports = router;