import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { submit_Student_Details } from '../../global/GlobalFunctions.jsx';
import AlertDismissible from '../AlertDismissible.jsx';
import { useMyContext } from '../../global/MyContext.jsx';
import Loadingoverlay from '../LoadingScreen.jsx';

const AddStudent = (props) => {

  useEffect(() => {
    props.setTitle("Add Student"); //  Updates title after mount
  }, [props.setTitle]);

  // Use loading state from context instead of local state
  const { addAlert, removeAlert, loadingoverlystate, setLoadingoverlystate,courses } = useMyContext();
  // Accessing context to get StudentData and setStudentData
  const { StudentData, setStudentData, currentSession } = useMyContext();
  // State for phone number input
  const [phone, setPhone] = useState("");
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(value);
  };

  // Add state for admission date and course duration
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  const [admissionDate, setAdmissionDate] = useState(getTodayDate());
  const [courseDuration, setCourseDuration] = useState("");
  // Add state for email
  const [email, setEmail] = useState("");

  const handleAddStudent = async () => {
    setLoadingoverlystate(true); // Show loading screen from context
    const name = document.querySelector('input[type="text"]').value.trim();
    const course = document.querySelector('select').value.trim();
    const university = document.querySelectorAll('select')[1].value.trim();
    const address = document.querySelector('textarea').value.trim();
    const admission = admissionDate;
    const duration = courseDuration;
    const emailValue = email.trim();

    // Regular expression for validating mobile number
    const phoneRegex = /^[0-9]{10}$/;
    // Regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      name !== "" &&
      course !== "" &&
      phone !== "" &&
      address !== "" &&
      admission !== "" &&
      duration !== "" &&
      emailValue !== ""
    ) {
      if (!phoneRegex.test(phone)) {
        addAlert("Failed! Please enter a valid 10-digit mobile number.", "bg-red-500");
        setTimeout(() => { removeAlert(0); }, 3000);
        setLoadingoverlystate(false);
        return;
      }
      if (!emailRegex.test(emailValue)) {
        addAlert("Failed! Please enter a valid email address.", "bg-red-500");
        setTimeout(() => { removeAlert(0); }, 3000);
        setLoadingoverlystate(false);
        return;
      }
      const rollnoPrefix = "TCAD";
      let maxRollNo = 0;
      StudentData.forEach(student => {
        if (student.studentRollNo.startsWith(rollnoPrefix)) {
          const rollNoNumber = parseInt(student.studentRollNo.slice(rollnoPrefix.length), 10);
          if (rollNoNumber > maxRollNo) {
            maxRollNo = rollNoNumber;
          }
        }
      });
      const newRollNo = `${rollnoPrefix}${String(maxRollNo + 1).padStart(3, '0')}`;
      const DataSubmitted = await submit_Student_Details(newRollNo, name, phone, address, course, university, admission, duration, emailValue);
      if (DataSubmitted.status === 200) {
        console.log("Response:", DataSubmitted.data);
        await setStudentData(prev => [...prev, DataSubmitted.data]);
        fill_blank_student();
        addAlert("Success! Your changes have been saved.", "bg-green-500");
        setTimeout(() => { removeAlert(0); }, 3000);
      }
      setLoadingoverlystate(false);
    } else {
      addAlert("Failed! Please enter all the details correctly.", "bg-red-500");
      setTimeout(() => { removeAlert(0); }, 3000);
      setLoadingoverlystate(false);
    }
  };
  // Function to clear the form fields
  const fill_blank_student = () => {
    // Clear the add student form fields
    document.querySelector('input[type="text"]').value = "";
    document.querySelector('select').value = "";
    document.querySelectorAll('select')[1].value = "";
    setPhone("");
    document.querySelector('textarea').value = "";
    setAdmissionDate(getTodayDate());
    setCourseDuration("");
    setEmail("");
  }

  return (
    <>
      <AlertDismissible />
      {loadingoverlystate && <Loadingoverlay message="Submitting, please wait..." />}
      <div className="bg-white rounded-lg border border-gray-200 p-6 drop-shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Student Information
        </h2>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="!rounded-button  w-full  border-gray-300 border p-2 drop-shadow-sm"
                placeholder="Enter the full name" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
              <select className="!rounded-button w-full border-gray-300 border p-2 drop-shadow-sm">
                <option value="">Select Course</option>
                {/* map the courses  */}
                {courses.map((course, index) => (
                  <option key={index} value={course.name}>{course.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <select className="!rounded-button w-full border-gray-300 border p-2 drop-shadow-sm">
                <option value="">Select University</option>
                <option value="C.V. RAMAN">C.V. RAMAN</option>
                <option value="ISBM">ISBM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                className="!rounded-button w-full border-gray-300 border p-2 drop-shadow-sm"
                placeholder="Enter phone number"
                value={phone}
                onChange={handlePhoneChange}
                maxLength="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea className="!rounded-button w-full border-gray-300 border p-2 drop-shadow-sm" rows="1" placeholder="Enter address"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
              <input
                type="date"
                className="!rounded-button w-full border-gray-300 border p-2 drop-shadow-sm"
                value={admissionDate}
                onChange={e => setAdmissionDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Duration (months)</label>
              <input
                type="number"
                min="1"
                max="60"
                className="!rounded-button w-full border-gray-300 border p-2 drop-shadow-sm"
                placeholder="Enter duration in months"
                value={courseDuration}
                onChange={e => setCourseDuration(e.target.value.replace(/[^0-9]/g, '').slice(0, 2))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="!rounded-button w-full border-gray-300 border p-2 drop-shadow-sm"
                placeholder="Enter email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-6 flex justify-end space-x-4">

              {/* <Link to="/" exact="true" type="button" className="!rounded-button px-4 py-2 bg-gray-500 text-white text-sm font-medium drop-shadow-sm hover:bg-indigo-50 hover:text-gray-700">
                <i className="fas fa-home mr-2"></i>
                Home
              </Link> */}

              <button type="button" className="!rounded-button px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium drop-shadow-sm"
                onClick={() => { fill_blank_student(); }}>
                Clear
              </button>

              <button type="button" className="!rounded-button px-4 py-2 bg-black cursor-pointer text-white text-sm font-medium drop-shadow-sm"
                onClick={() => { handleAddStudent(); }}>
                Add Student
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStudent;