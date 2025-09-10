// MyContext.js
import React, { createContext, useContext, useState } from "react";
import {setToday,tableHeaders} from './GlobalFunctions.jsx'; //accessing global functions
import profileImg from '/images/corporate-user-icon.png'; //import image

// Create Context
const MyContext = createContext();


// Create Provider Component
export const MyProvider = ({ children }) => {

  const profileImgUrl = new URL(profileImg, import.meta.url).href;
  
  const [StudentData,setStudentData]=useState([]);  //state for data of all the students
  const [allStudetData,setAllStudentData]=useState([]);  //copy for data of all the students if student data is filtered
  const [paymentData,setPaymentData]=useState([]);  //state for data of all the payments
  const [Input,setInput]= useState({Id:"",ImgLink:profileImgUrl,Name:"",Date:setToday(),Amount:"",Course:"",Phone:"",University:"",TotalFee:0,FeePaid:0,Balance:0});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
   //for current session //set current session according to current year by default
 const [currentSession, setCurrentSession] = useState( ()=>{
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  console.log("Initial session set to:", `${currentYear}-${nextYear}`);
  return `${currentYear}-${nextYear}`;
 } );

// Filter data based on name and student ID
const filteredData = (Input.Name.trim() !== "" || Input.Id.trim() !== "") 
  ? StudentData.filter((item) =>
      (Input.Name.trim() !== "" && item[tableHeaders.headerName].toLowerCase().includes(Input.Name.toLowerCase())) ||
      (Input.Id.trim() !== "" && item[tableHeaders.headerId].toLowerCase().includes(Input.Id.toLowerCase()))
    )
  : [];

  const [allStudetFetchedData,setAllStudentFetchedData]=useState([]); // to store all fetched student data
//get student data
async function get_student_data() {
  const url = import.meta.env.VITE_API_STUDENTURL + "/getAllStudentProfiles";
  //get auth token from local storage
  const authToken =  localStorage.getItem("authToken");
  if (!authToken) {
    console.error("authantication error");
    return { data: null, status: "error" };
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      }
    });
    const data = await response.json();
    setAllStudentFetchedData(data);
    // Filter data based on current session if provided
    if (currentSession) {
      const [startYear, endYear] = currentSession.split('-').map(Number);
      const filteredBySession = data.filter(student => {
        const admissionYear = new Date(student.studentAdmmissionDate).getFullYear();
        return admissionYear === startYear || admissionYear === endYear;
      });
      setStudentData(filteredBySession);
    } 
    // setStudentData(data);
    get_payment_data(); // Fetch payment data after student data is fetched
    setLoadingoverlystate(false); // Set loading state to false after data is fetched
    console.log("Student Data:", data);
    return { data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
    return { data: null, status: "error" };
  }
}
const [allFechedPaymentData,setAllFetchedPaymentData]=useState([]); // to store all fetched payment data
//get student payment data
async function get_payment_data() {
  const url = import.meta.env.VITE_API_STUDENTURL + "/getAllPaymentRecords/";
//get auth token from local storage
  const authToken =  localStorage.getItem("authToken");
  if (!authToken) {
    console.error("Authentication error");
    return { data: null, status: "error" };
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      }
    });

    const data = await response.json();
    setAllFetchedPaymentData(data);
      // Filter data based on current session if provided
      if (currentSession) {
        const [startYear, endYear] = currentSession.split('-').map(Number);
        const filteredBySession = data.filter(payment => {
          const paymentYear = new Date(payment.paymentDate).getFullYear();
          return paymentYear === startYear || paymentYear === endYear;
        });
        setPaymentData(filteredBySession);
      }

    // setPaymentData(data);
    console.log("Payment Data:", data);

    // Return both data and status
    return {
      status: response.status,
      data: data
    };
  } catch (error) {
    console.error("Error:", error);
    // You can return an error object or throw again
    return {
      status: 500,
      data: null,
      error: error.message
    };
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

const [dataurl,setdataUrl]=useState("");
//for loading screen
 const [loadingoverlystate, setLoadingoverlystate] = useState(false);
  return (
    <MyContext.Provider value={{ StudentData,setStudentData,paymentData,setPaymentData,
                                get_student_data,Input,setInput,filteredData,
                                alerts, addAlert, removeAlert,
                                highlightedIndex, setHighlightedIndex,
                                deshboardTitle, setDeshboardTitle,
                                tableHeaders,
                                currentSession, setCurrentSession,
                                dataurl,setdataUrl,
                                loadingoverlystate, setLoadingoverlystate,
                                isAuthenticated, setIsAuthenticated,
                                allStudetData,setAllStudentData,
                                allStudetFetchedData
                                
                              }}>
      {children}
    </MyContext.Provider>
  );
};

// Export custom hook for easy access
export const useMyContext = () => useContext(MyContext);
