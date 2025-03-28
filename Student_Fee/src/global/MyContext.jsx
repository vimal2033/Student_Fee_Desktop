// MyContext.js
import React, { createContext, useContext, useState } from "react";
import {setToday} from './GlobalFunctions.jsx'; //accessing global functions
import profileImg from '/images/corporate-user-icon.png'; //import image

// Create Context
const MyContext = createContext();


// Create Provider Component
export const MyProvider = ({ children }) => {

  const profileImgUrl = new URL(profileImg, import.meta.url).href;
  
  const [StudentData,setStudentData]=useState([]);  //state for data of all the students
  const [paymentData,setPaymentData]=useState([]);  //state for data of all the payments
  const [Input,setInput]= useState({Id:"",ImgLink:profileImgUrl,Name:"",Date:setToday(),Amount:"",Course:"",Phone:"",University:"",TotalFee:0,FeePaid:0,Balance:0});
  
  
// Filter data based on name and student ID
const filteredData = (Input.Name.trim() !== "" || Input.Id.trim() !== "") 
  ? StudentData.filter((item) =>
      (Input.Name.trim() !== "" && item.NAME.toLowerCase().includes(Input.Name.toLowerCase())) ||
      (Input.Id.trim() !== "" && item['STUDENT ID'].toLowerCase().includes(Input.Id.toLowerCase()))
    )
  : [];

  
//get student data
async function get_student_data() {
  const url = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    console.log("GET Response:", data);
    setStudentData(data.DCA);
    setPaymentData(data.PassBook);
    console.log("Student Data:",StudentData);
    console.log("Payment Data:",paymentData);
  
    // document.getElementById("app").textContent = JSON.stringify(data[0].data[0].name);
  } catch (error) {
    console.error("Error:", error);
  }
}

//for alert massage
const [alerts, setAlerts] = useState([]);

const addAlert = (message, color = "bg-green-500") => {
  setAlerts((prevAlerts) => [...prevAlerts, { message, color }]);
};

const removeAlert = (index) => {
  setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
};

// for option heighlighting
const [highlightedIndex, setHighlightedIndex] = useState(0);
//for deshboard title
const [deshboardTitle, setDeshboardTitle] = useState("");
  return (
    <MyContext.Provider value={{ StudentData,setStudentData,paymentData,setPaymentData,
                                get_student_data,Input,setInput,filteredData,
                                alerts, addAlert, removeAlert,
                                highlightedIndex, setHighlightedIndex,
                                deshboardTitle, setDeshboardTitle
                              }}>
      {children}
    </MyContext.Provider>
  );
};

// Export custom hook for easy access
export const useMyContext = () => useContext(MyContext);
