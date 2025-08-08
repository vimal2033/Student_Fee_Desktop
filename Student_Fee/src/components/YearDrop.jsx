// SessionDropdown.jsx
import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useMyContext } from '../global/MyContext';

const YearDropdown = ({ showYearDropdown, onSelect }) => {

const {setLoadingoverlystate,setCurrentSession,sheetList,setSheetList,get_student_data} = useMyContext();

const sessionList = ["2023-24", "2024-25", "2025-26"]; // Example session list

const fetchSheetLIst=async () => {
  setLoadingoverlystate(true); // Set loading state to true while fetching data
  //     const url = import.meta.env.VITE_API_DATA_URL+"?apiKey="+import.meta.env.VITE_API_KEY;
  //     try {
  //         const response = await fetch(url, { method: "GET" });
  //         const data = await response.json();
  //         // console.log("GET Response:", data);
  //         setSheetList(data.sheets);
  //         setCurrentSession(data.sheets[0]); // Set default session when component mounts
  //         get_student_data(data.sheets[0].url); // Fetch student data when component mounts
        
  //       //  console.log(data.sheets[0].url);
  // setLoadingoverlystate(false); // Set loading state to false after data is fetched
  //     } catch (error) {
  //         console.error("Error:", error);
  //         setLoadingoverlystate(false); // Set loading state to false in case of error
  //     }
}
useEffect(() => {
  const fetchData = async () => {
    const studentRes = await get_student_data();
    if (studentRes?.status === 200) {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const sessionName = `${currentYear}-${nextYear}`;
        setCurrentSession(sessionName);
      console.log("Current Session:", sessionName);
    }
  };

  fetchData();
}, []);

  if (!showYearDropdown) return null;

  return ReactDOM.createPortal(
  <div className="fixed top-16 right-4 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[9999]">
    <ul className="py-2">
      {sessionList?.map(( session,index) => (
        <li
          key={index}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(session)}
        >
          {session}
        </li>
      ))}

      <li
        className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 cursor-pointer border-t border-gray-200"
        onClick={() => {
          localStorage.removeItem('authToken'); // clear token
          if (typeof setIsAuthenticated === 'function') setIsAuthenticated(false); // update context if available
          window.location.href = '/login'; // redirect to login
        }}
      >
        Logout
      </li>
    </ul>
  </div>,
  document.body
);

};

export default YearDropdown;
