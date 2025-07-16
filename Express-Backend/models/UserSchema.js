const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    UserName: {
        type: String,
        required: true
    },
    UserEmail: {
        type: String,
        required: true,
        unique: true
    },
    UserPassword: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});
module.exports = mongoose.model('UserData', UserSchema);