const mongoose = require('mongoose');
let userNotificationSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });
let userNotification = mongoose.model('userNotification', userNotificationSchema);
module.exports = userNotification;