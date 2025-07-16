import React, { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { submit_Student_Details } from '../../global/GlobalFunctions.jsx';
import AlertDismissible from '../AlertDismissible.jsx';
import { useMyContext } from '../../global/MyContext.jsx';

const AddStudent = (props) => {

  useEffect(() => {
  
    props.setTitle("Add Student"); // ✅ Updates title after mount
  }, [props.setTitle]);
  
  const { addAlert, removeAlert } = useMyContext();
  const {get_student_data,currentSession}=useMyContext();
  
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(value);
  };

  const handleAddStudent = async () => {
    const name = document.querySelector('input[type="text"]').value.trim();
    const course = document.querySelector('select').value.trim();
    const university = document.querySelectorAll('select')[1].value.trim();
    const address = document.querySelector('textarea').value.trim();
    
    // Regular expression for validating mobile number
    const phoneRegex = /^[0-9]{10}$/;

    if (name !== "" && course !== ""  && phone !== "" && address !== "") {
      if (!phoneRegex.test(phone)) {
        addAlert("Failed! Please enter a valid 10-digit mobile number.", "bg-red-500");
        setTimeout(() => { removeAlert(0); }, 3000);
        return;
      }
// console.log(currentSession);
     const DataSubmitted = await submit_Student_Details(name, phone, address, course, university);
      // console.log("Data submitted successfully");
      if(DataSubmitted.status === 200){
      fill_blank_student();
      addAlert("Success! Your changes have been saved.", "bg-green-500");
      // get_student_data(currentSession);
      get_student_data();
      setTimeout(() => { removeAlert(0); }, 3000);
      }
      
    } else {
      addAlert("Failed! Please enter all the details correctly.", "bg-red-500");
      setTimeout(() => { removeAlert(0); }, 3000);
    }
  };
  const fill_blank_student=()=>{
      // Clear the add student form fields
      document.querySelector('input[type="text"]').value = "";
      document.querySelector('select').value = "";
      document.querySelectorAll('select')[1].value = "";
      setPhone("");
      document.querySelector('textarea').value = "";
  }

  return (
    <>
      <AlertDismissible />
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
                <option value="DCA">DCA</option>
                <option value="PGDCA">PGDCA</option>
                <option value="MDCH">MDCH</option>
                <option value="TALLY">TALLY</option>
                <option value="BASIC">BASIC</option> 
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

            <div className="mt-6 flex justify-end space-x-4">

              {/* <Link to="/" exact="true" type="button" className="!rounded-button px-4 py-2 bg-gray-500 text-white text-sm font-medium drop-shadow-sm hover:bg-indigo-50 hover:text-gray-700">
                <i className="fas fa-home mr-2"></i>
                Home
              </Link> */}

              <button type="button" className="!rounded-button px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium drop-shadow-sm"
              onClick={()=>{fill_blank_student();}}>
                Clear
              </button>
              
              <button type="button" className="!rounded-button px-4 py-2 bg-black cursor-pointer text-white text-sm font-medium drop-shadow-sm" 
              onClick={()=>{handleAddStudent();}}>
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