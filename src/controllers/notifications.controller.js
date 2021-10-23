const notificationsCtrl = {};

// Models
const Notification = require("../models/Notification");

notificationsCtrl.renderNotificationForm = (req, res) => {
    res.render("notifications/new-notification");
};

notificationsCtrl.createNewNotification = async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
        errors.push({ text: "Please Write a Description" });
    }
    if (errors.length > 0) {
        res.render("notifications/new-notification", {
            errors,
            title,
            description,
        });
    } else {
        const newNotification = new Notification({ title, description });
        newNotification.user = req.user.id;
        await newNotification.save();
        req.flash("success_msg", "Notification Added Successfully");
        res.redirect("/notifications");
    }
};

notificationsCtrl.renderNotifications = async(req, res) => {
    const notifications = await Notification.find({ user: req.user.id })
        .sort({ date: "desc" })
        .lean();
    res.render("notifications/all-notifications", { notifications });
};

notificationsCtrl.renderEditForm = async(req, res) => {
    const notification = await Notification.findById(req.params.id).lean();
    if (notification.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/notifications");
    }
    res.render("notifications/edit-notification", { notification });
};

notificationsCtrl.updateNotification = async(req, res) => {
    const { title, description } = req.body;
    await Notification.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Notification Updated Successfully");
    res.redirect("/notifications");
};

notificationsCtrl.deleteNotification = async(req, res) => {
    await Notification.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Notification Deleted Successfully");
    res.redirect("/notifications");
};

module.exports = notificationsCtrl;