//schema for payment details
const mongoose = require('mongoose');
const { Schema } = mongoose;
const PaymentSchema = new Schema({
    AdminId: {
        type: Schema.Types.ObjectId,
        ref: 'UserData',
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'StudentProfiles',
        required: true
    },

    paymentAmount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'Online'],
        default: 'Cash',
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Completed', 'Pending', 'Failed'],
        default: 'Pending'
    }
});
module.exports = mongoose.model('PaymentDetails', PaymentSchema);