import React from 'react';
import { useMyContext } from '../../global/MyContext.jsx';
import {submit_Payment,formatCurrency} from '../../global/GlobalFunctions.jsx';
import InputSuggestion from './InputSuggestion.jsx';
import AlertDismissible from '../AlertDismissible.jsx';
import profileImg from '/images/corporate-user-icon.png'; //import image
import Studentinfo from '../Page3_SearchStudent/Studentinfo.jsx';


const FeeEntryCardDeshboard = (props) => {
const {get_student_data,currentSession}=useMyContext();
const {Input,setInput,dropdownVisible,}=useMyContext();
const { addAlert, removeAlert } = useMyContext();

const profileImgUrl = new URL(profileImg, import.meta.url).href;

const fillblank=()=>{
  setInput(prevState => ({ ...prevState, Id: "",
    // Name: "", 
    ImgLink:profileImgUrl,
   Course: "",
    Phone: "",
    University: "",
    TotalFee: "0",
    FeePaid: "0",
    Balance:"0"
    }));
}

 const handleSubmitPayment = () => {
    if (Input.Name.trim() !== "" && Input.Id.trim() !== "" && Input.Amount.trim()!=="") {
      submit_Payment(Input.Id, Input.Name, Input.Course, Input.Amount, Input.Date,currentSession.url);
      addAlert("Success! Your changes have been saved.", "bg-green-500");
      setTimeout(() => { removeAlert(0); }, 3000);
      fillblank();
      setInput(prevState => ({ ...prevState, Name: "", Amount: "" }));
      setTimeout(() => {get_student_data(currentSession.url);}, 500);
      setTimeout(() => {get_student_data(currentSession.url);}, 5000);
    } else {
      addAlert("Failed! Please enter all the details correctly.", "bg-red-500");
      setTimeout(() => { removeAlert(0); }, 3000);
    }
  }

  return (
    <>
    <Studentinfo/>
    <AlertDismissible />
       {/* <!-- fee entry card --> */}
    
       <div className="bg-white rounded-lg border border-gray-200 p-6 drop-shadow-xl ">
        {/* <!-- profile photo --> */}
        <div className="absolute top-0 right-0 p-6 ">
        {/* <img src="public/images/corporate-user-icon.png" alt="" className="w-16 h-16 rounded-full " /> */}
        <button>
        <div className="w-24 h-32 rounded-lg border border-gray-200 ">
    <img src={(Input.ImgLink !== "" && Input.ImgLink !== null)?Input.ImgLink:profileImgUrl} alt="" className="object-cover w-full h-full rounded-20 "/>
  </div></button>
        </div>
        {/* <!-- fee entry heading --> */}
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Fee Entry
              </h2>
                {/* <!-- form for fee entry --> */}
              <form>
                <div className="space-y-4">

                  {/* //********input box for student id********* */}
                  <InputSuggestion label="Student ID" placeholder="Enter Student ID" element="Id" width="w-2/3"/>
                  {/* //********input box for student name********* */}
                  <InputSuggestion label="Student Name" placeholder="Enter Student Name" element="Name" width="w-full"/>
                  {/* //********input box for date********* */}
                  <div>
                    <label  className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                    <input type="date" id="myDate" value={Input.Date} 
                    onChange={(e)=>{setInput(prevState => ({...prevState,Date: e.target.value }));}}  
                    className="!rounded-button w-full border-gray-300 border p-2 drop-shadow-sm"/>
                  </div>
                  {/* //********input box for Amount********* */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >Amount</label >
                    <input type="text" value={Input.Amount}
                      className="!rounded-button w-full border-gray-300 border p-2 drop-shadow-sm"
                      placeholder="Enter amount" 
                      onChange={(e)=>{setInput(prevState => ({...prevState,Amount: e.target.value }));}}
                       onKeyDown={(e)=>{
                        if (e.key === 'Enter' && Input.Name.trim() !== "" && Input.Id.trim() !== "") 
                          { handleSubmitPayment();}
                       }}
                      />
                  </div>
                  {/* //*********current balance********** */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >Current Balance</label>
                    <label className="!rounded-button w-full border-gray-300 bg-gray-50 text-red-700 font-semibold text-xl p-2" htmlFor="current-balance">
                          {!dropdownVisible && (Input.Name.trim() !== "" && Input.Id.trim() !== "") ? formatCurrency(Input.Balance) : formatCurrency(0)}
                    </label>
                  </div>
                  {/* //*********Payment submit button********** */}
                  <div className="mt-6  flex space-x-4">
                  <button type="button" className="!rounded-button w-full bg-black cursor-pointer text-white py-2 px-4 font-medium text-sm"
                   onClick={()=>{handleSubmitPayment();}}>
                    Submit Payment
                  </button>
                  {/* <button type="button" className="!rounded-button  px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium" >
                    Clear</button > */}
                </div>

                </div>
              </form>
            </div>
     
    </>
  );
};

export default FeeEntryCardDeshboard;