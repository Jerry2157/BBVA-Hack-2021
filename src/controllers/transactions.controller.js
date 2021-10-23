const transactionsCtrl = {};

// Models
const Note = require("../models/Note");
const Transaction = require("../models/Transaction");

transactionsCtrl.renderTransactionForm = (req, res) => {
    res.render("transactions/new-transaction");
};

transactionsCtrl.createNewTransaction = async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
        errors.push({ text: "Please Write a Description" });
    }
    if (errors.length > 0) {
        res.render("transactions/new-transaction", {
            errors,
            title,
            description,
        });
    } else {
        const newNote = new Note({ title, description });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash("success_msg", "Note Added Successfully");
        res.redirect("/transactions");
    }
};

transactionsCtrl.renderTransactions = async(req, res) => {
    const notes = await Note.find({ user: req.user.id })
        .sort({ date: "desc" })
        .lean();
    res.render("transactions/all-transactions", { notes });
};

transactionsCtrl.renderEditForm = async(req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/notes");
    }
    res.render("transactions/edit-transaction", { note });
};

transactionsCtrl.updateTransaction = async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Note Updated Successfully");
    res.redirect("/transactions");
};

transactionsCtrl.deleteTransaction = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Note Deleted Successfully");
    res.redirect("/transactions");
};

module.exports = transactionsCtrl;