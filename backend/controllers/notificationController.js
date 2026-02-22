/**
 * File: notificationController.js
 * Purpose:
 * Handles fetching and updating notifications.
 */

import Notification from "../models/Notification.js";

// ==============================
// Get My Notifications
// ==============================

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// Mark Notification as Read
// ==============================

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};