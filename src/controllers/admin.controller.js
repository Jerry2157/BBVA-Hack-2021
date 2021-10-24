const adminsCtrl = {};

// Models
const User = require("../models/User");
const InvestmentTransactions = require("../models/InvestmentTransactions");
const Investment = require("../models/Investment");
const Transaction = require("../models/Transaction");
const Notification = require("../models/Notification");

adminsCtrl.renderAdminForm = (req, res) => {
    res.render("admins/new-admin");
};

adminsCtrl.createNewAdmin = async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
        errors.push({ text: "Please Write a Description" });
    }
    if (errors.length > 0) {
        res.render("admins/new-admin", {
            errors,
            title,
            description,
        });
    } else {
        const newAdmin = new Admin({ title, description });
        newAdmin.user = req.user.id;
        await newAdmin.save();
        req.flash("success_msg", "Admin Added Successfully");
        res.redirect("/admins");
    }
};


adminsCtrl.renderUsers = async(req, res) => {
    const users = await User.find({})
        .sort({ date: "desc" })
        .lean();
    res.render("admin/all-users", { users });
};

adminsCtrl.renderContractedInvestments = async(req, res) => {
    console.log("req.params.id ", req.params.id)
    const investment = await Investment.find({ user: req.params.id })
        .sort({ date: "desc" })
        .lean();
    console.log("Investment ", investment)
    res.render("admin/all-contracted-investments", { investment });
};

adminsCtrl.renderPayContractedInvestments = async(req, res) => {
    try {
        console.log("req.params.id ", req.params.id)
        const investment = await Investment.findOne({ _id: req.params.id })
            .sort({ date: "desc" })
            .lean();
        console.log("Investment ", investment)
        res.render("admin/pay-investment", { investment });
    } catch (error) {
        res.render("admin/pay-investment", {});
    }
};
adminsCtrl.createNewPaymentInvestment = async(req, res) => {
    const { monto } = req.body;
    var title = ""
    const errors = [];
    if (!monto) {
        errors.push({ text: "Please Write Monto." });
    }
    if (errors.length > 0) {
        res.render("/listusers", {
            errors,
            title,
            description,
        });
    } else {
        /*
        const newAdmin = new Admin({ title, description });
        newAdmin.user = req.user.id;
        await newAdmin.save();*/
        const newNotification = new Notification({ title: "Nuevo deposito de inversión", description: "Revisa tu estado de cuenta :D", user: req.params.id })
        await newNotification.save();

        const newInvestmentTransactions = new InvestmentTransactions({
            user: req.params.id,
            concept: "Pago de inversión",
            money_payed: monto,
            inversion_id: req.params.inversion_id
        });
        await newInvestmentTransactions.save();


        req.flash("success_msg", "Pago realizado correctamente");
        res.redirect("/listusers");
    }
};



adminsCtrl.renderEditForm = async(req, res) => {
    const admin = await Admin.findById(req.params.id).lean();
    if (admin.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/admins");
    }
    res.render("admins/edit-admin", { admin });
};

adminsCtrl.updateAdmin = async(req, res) => {
    const { title, description } = req.body;
    await Admin.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Admin Updated Successfully");
    res.redirect("/admins");
};

adminsCtrl.deleteAdmin = async(req, res) => {
    await Admin.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Admin Deleted Successfully");
    res.redirect("/admins");
};

module.exports = adminsCtrl;