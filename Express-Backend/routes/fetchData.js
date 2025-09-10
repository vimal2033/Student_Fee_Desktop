const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator"); // Import validation functions
require('dotenv').config();
const jwt_secret = process.env.jwt_secret; // Define your JWT secret key 
const fetchuser = require("./fetchUser"); // Middleware to fetch user details
const StudentProfiles = require("../models/StudentSchema"); // Import the StudentProfiles model
const PaymentDetails = require("../models/PaymentSchema"); // Import the PaymentDetails model

//Route to create a new student profile
router.post(
    "/createStudentProfile",
    fetchuser,
    [
        body("studentName", "Enter a valid student name").not().isEmpty(),
        body("studentClass", "Enter a valid class").not().isEmpty(),
        body("studentRollNo", "Enter a valid roll number").not().isEmpty(),
        body("studentFee", "Enter a valid fee amount").isNumeric(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
  
        try {
        const { studentName, studentphone, studentEmail, studentAddress, studentClass, studentRollNo, studentImage, studentFee,studentAdmmissionDate } = req.body;
        const AdminId = await req.user.userId; // Get the admin ID from the authenticated user
   
        const newStudentProfile = new StudentProfiles({
            AdminId,
            studentName,
            studentphone,
            studentEmail,
            studentAddress,
            studentClass,
            studentRollNo,
            studentImage,
            studentFee,
            studentAdmmissionDate
        });
    
        const savedProfile = await newStudentProfile.save();
        res.json(savedProfile);
        } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        }
    }
    );
//Route to fetch all student profiles
router.get("/getAllStudentProfiles", fetchuser, async (req, res) => {
    try {
        const studentProfiles = await StudentProfiles.find({ AdminId: req.user.userId });
        res.json(studentProfiles);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
//Route to fetch a specific student profile by ID
router.get("/getStudentProfile/:id", fetchuser, async (req, res) => {
    try {
        const studentProfile = await StudentProfiles.findById(req.params.id);
        if (!studentProfile) {
            return res.status(404).send("Student profile not found");
        }
        // Check if the AdminId matches the authenticated user's ID
        if (studentProfile.AdminId.toString() !== req.user.userId) {
            return res.status(403).send("Access denied");
        }
        res.json(studentProfile);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Route to update a student profile
router.put("/updateStudentProfile/:id", fetchuser, async (req, res) => {
    try {
        // Find the profile first
        const studentProfile = await StudentProfiles.findById(req.params.id);
        if (!studentProfile) {
            return res.status(404).send("Student profile not found");
        }
        // Check if the AdminId matches the authenticated user's ID
        if (studentProfile.AdminId.toString() !== req.user.userId) {
            return res.status(403).send("Access denied");
        }
        // Only update fields present in req.body
        Object.keys(req.body).forEach(key => {
            studentProfile[key] = req.body[key];
        });
        const updatedProfile = await studentProfile.save();
        res.json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Route to delete a student profile
router.delete("/deleteStudentProfile/:id", fetchuser, async (req, res) => {
    try {
        const studentProfile = await StudentProfiles.findById(req.params.id);
        if (!studentProfile) {
            return res.status(404).send("Student profile not found");
        }
        // Check if the AdminId matches the authenticated user's ID
        if (studentProfile.AdminId.toString() !== req.user.userId) {
            return res.status(403).send("Access denied");
        }
        await studentProfile.deleteOne();
        res.json({ message: "Student profile deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//route to create a payment record
router.post(
    "/createPaymentRecord",
    fetchuser,
    [
        body("studentId", "Student ID is required").not().isEmpty(),
        body("paymentAmount", "Payment amount must be a number").isNumeric(),
        body("paymentMethod", "Payment method is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { studentId, paymentAmount, paymentMethod } = req.body;
            const AdminId = req.user.userId; // Get the admin ID from the authenticated user

            const newPaymentRecord = new PaymentDetails({
                AdminId,
                studentId,
                paymentAmount,
                paymentMethod
            });

            const savedPaymentRecord = await newPaymentRecord.save();
            res.json(savedPaymentRecord);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
);

// Route to fetch all payment records for a specific student
router.get("/getPaymentRecords/:studentId", fetchuser, async (req, res)=> {
    try {
        const studentId = req.params.studentId;
        const paymentRecords = await PaymentDetails.find({ studentId, AdminId: req.user.userId }).populate('studentId', 'studentName studentRollNo studentClass');
        res.json(paymentRecords);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Route to update a payment recourd of a specific student
router.put("/updatePaymentRecord/:id", fetchuser, async (req, res) => {
    try {
        const paymentRecord = await PaymentDetails.findById(req.params.id);
        if (!paymentRecord) {
            return res.status(404).send("Payment record not found");
        }
        // Check if the AdminId matches the authenticated user's ID
        if (paymentRecord.AdminId.toString() !== req.user.userId) {
            return res.status(403).send("Access denied");
        }
        // Only update fields present in req.body
        Object.keys(req.body).forEach(key => {
            paymentRecord[key] = req.body[key];
        });
        const updatedPaymentRecord = await paymentRecord.save();
        res.json(updatedPaymentRecord);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
//Route to delete a payment record of a specific student
router.delete("/deletePaymentRecord/:id", fetchuser, async (req, res) => {
    try {
        const paymentRecord = await PaymentDetails.findById(req.params.id);
        if (!paymentRecord) {
            return res.status(404).send("Payment record not found");
        }
        // Check if the AdminId matches the authenticated user's ID
        if (paymentRecord.AdminId.toString() !== req.user.userId) {
            return res.status(403).send("Access denied");
        }
        await paymentRecord.deleteOne();
        res.json({ message: "Payment record deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//route to fetch all payment records api/student/getAllPaymentRecords
router.get("/getAllPaymentRecords", fetchuser, async (req, res) => {
    try {
        const paymentRecords = await PaymentDetails.find({ AdminId: req.user.userId }).populate('studentId', 'studentName studentRollNo studentClass');
        res.json(paymentRecords);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


    module.exports = router; // Export the router to be used in the main app