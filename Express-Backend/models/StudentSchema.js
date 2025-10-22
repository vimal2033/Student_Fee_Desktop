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
        type: String,
        default:""
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
        type: String,
        default: ""
    },
    studentCourseDuration: {
        type: String
    },
    studentFeePaid: {
        type: Number,
        default: 0
    }

});

// set fee status on save
StudentSchema.pre('save', function(next) {
    // `this` is the document being saved
    if (typeof this.studentFeePaid === 'number' && typeof this.studentFee === 'number') {
        this.studentFeeStatus = this.studentFeePaid < this.studentFee ? 'Unpaid' : 'Paid';
    }
    next();
});

// set fee status on findOneAndUpdate (covers updates via Model.findOneAndUpdate / findByIdAndUpdate)
StudentSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate() || {};
    // normalize possible $set wrapper
    const candidate = Object.assign({}, update.$set || update);

    // if neither fee nor paid are present in the update, no need to compute
    if (candidate.studentFee === undefined && candidate.studentFeePaid === undefined) {
        return next();
    }

    try {
        // get current document values
        const doc = await this.model.findOne(this.getQuery()).lean();
        const currentFee = candidate.studentFee !== undefined ? candidate.studentFee : doc && doc.studentFee;
        const currentPaid = candidate.studentFeePaid !== undefined ? candidate.studentFeePaid : doc && doc.studentFeePaid;

        if (typeof currentFee === 'number' && typeof currentPaid === 'number') {
            const status = currentPaid < currentFee ? 'Unpaid' : 'Paid';
            if (!update.$set) update.$set = {};
            update.$set.studentFeeStatus = status;
            this.setUpdate(update);
        }
    } catch (err) {
        return next(err);
    }

    next();
});

module.exports = mongoose.model('StudentProfiles', StudentSchema);