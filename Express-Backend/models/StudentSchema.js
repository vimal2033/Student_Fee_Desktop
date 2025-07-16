const mongoose = require('mongoose');
const { Schema } = mongoose;
//schema for student profile
const StudentSchema = new Schema({
    AdminId: {
        type: Schema.Types.ObjectId,
        ref: 'UserData',
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentphone: {
        type: String
    },
    studentEmail: {
        type: String
    },
    studentAddress: {
        type: String
    },
    studentClass: {
        type: String,
        required: true
    },
    studentRollNo: {
        type: String,
        required: true
    },
    studentImage: {
        type: String
    },
    studentFee: {
        type: Number,
        required: true
    },
    studentFeeStatus: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    },
    studentAdmmissionDate: {
        type: Date,
        default: Date.now
    },
    studentUniversity: {
        type: String
    },
    studentCourseDuration: {
        type: String
    },
    studentFeePaid: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('StudentProfiles', StudentSchema);