// SessionDropdown.jsx
import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useMyContext } from '../global/MyContext';

const YearDropdown = ({ showYearDropdown, onSelect }) => {

const {setCurrentSession,sheetList,setSheetList,get_student_data} = useMyContext();

const fetchSheetLIst=async () => {
    const url = import.meta.env.VITE_API_DATA_URL+"?apiKey="+import.meta.env.VITE_API_KEY;
    try {
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        // console.log("GET Response:", data);
        setSheetList(data.sheets);
        setCurrentSession(data.sheets[0]); // Set default session when component mounts
        get_student_data(data.sheets[0].url); // Fetch student data when component mounts
      //  console.log(data.sheets[0].url);

    } catch (error) {
        console.error("Error:", error);
    }
}

useEffect(() => {
  fetchSheetLIst(); // Fetch sheet list when component mounts
 
  
    sheetList? setCurrentSession(sheetList[0]):setCurrentSession(null) // Set default session when component mounts
}, [])
  if (!showYearDropdown) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-16 right-4 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[9999]">
      <ul className="py-2">
        {sheetList?.map((session) => (
          <li
            key={session.name}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={() => {onSelect(session);}} // Call onSelect and close the dropdown
          >
            {session.name}
          </li>
        ) )}
      </ul>
    </div>,
    document.body // mount dropdown to body to avoid layout issues
  );
};

export default YearDropdown;
