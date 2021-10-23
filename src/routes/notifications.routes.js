const express = require("express");
const router = express.Router();

// Controller
const {
    renderNotificationForm,
    createNewNotification,
    renderNotifications,
    renderEditForm,
    updateNotification,
    deleteNotification
} = require("../controllers/notifications.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Notification
router.get("/investments/notifications/add", isAuthenticated, renderNotificationForm);

router.post("/investments/notifications/new-note", isAuthenticated, createNewNotification);

// Get All Notifications
router.get("/investments/notifications", isAuthenticated, renderNotifications);

// Edit Notifications
router.get("/investments/notifications/edit/:id", isAuthenticated, renderEditForm);

router.put("/investments/notifications/edit-note/:id", isAuthenticated, updateNotification);

// Delete Notifications
router.delete("/investments/notifications/delete/:id", isAuthenticated, deleteNotification);

module.exports = router;