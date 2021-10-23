const investmentsCtrl = {};

// Models
const Note = require("../models/Note");
const Investment = require("../models/Investment");

investmentsCtrl.renderWelcomeInvestments = (req, res) => {
    res.render("investments/welcome-investments");
};

investmentsCtrl.renderWizardInvestments = (req, res) => {
    res.render("investments/wizard-investments");
};

investmentsCtrl.Recommendations = (req, res) => {
    res.render("investments/recommendations");
};

investmentsCtrl.AllProducts = (req, res) => {
    res.render("investments/products/all-products");
};

investmentsCtrl.RecommendedProducts = (req, res) => {
    res.render("investments/products/recommended-products");
};

investmentsCtrl.renderNoteForm = (req, res) => {
    res.render("investments/new-investment");
};

investmentsCtrl.createNewNote = async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
        errors.push({ text: "Please Write a Description" });
    }
    if (errors.length > 0) {
        res.render("investments/new-investment", {
            errors,
            title,
            description,
        });
    } else {
        const newNote = new Note({ title, description });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash("success_msg", "Note Added Successfully");
        res.redirect("/investments");
    }
};

investmentsCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find({ user: req.user.id })
        .sort({ date: "desc" })
        .lean();
    res.render("investments/all-investments", { notes });
};

investmentsCtrl.renderEditForm = async(req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/notes");
    }
    res.render("notes/edit-note", { note });
};

investmentsCtrl.updateNote = async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Note Updated Successfully");
    res.redirect("/notes");
};

investmentsCtrl.deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Note Deleted Successfully");
    res.redirect("/notes");
};

module.exports = investmentsCtrl;