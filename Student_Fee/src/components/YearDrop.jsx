// YearDropdown.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { useMyContext } from '../global/MyContext';

const YearDropdown = ({ showYearDropdown, setYerDropdown,onSelect }) => {
  const {
    setLoadingoverlystate,
    setCurrentSession,
    get_student_data,
    allStudetFetchedData, // <-- consider renaming to allStudentFetchedData
    // setIsAuthenticated // <-- get this from context if needed
  } = useMyContext();

  // get the list of sessions from student data
  const sessionList = Array.from(
    new Set(
      allStudetFetchedData?.map(student => {
        const date = new Date(student.studentAdmmissionDate);
        const year = date.getFullYear();
        const nextYearShort = String(year + 1).slice(-2); // last 2 digits
        return `${year}-${nextYearShort}`;
      })
    )
  ).sort((a, b) => b.localeCompare(a)); // sort descending

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
        {sessionList?.map((session, index) => (
          <li
            key={index}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(session)}
          >
            {session}
          </li>
        ))}
        {/* Settings Option */}
        
      <li
        className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer border-t border-gray-200"
        onClick={() => setYerDropdown(false)}
      >
        <NavLink
          to="/AdminSettings"
          exact="true"
          className="text-blue-600"
          
        >
          Settings
        </NavLink>
      </li>
       
        <li
          className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 cursor-pointer border-t border-gray-200"
          onClick={() => {
            localStorage.removeItem('authToken');
            // if (typeof setIsAuthenticated === 'function') setIsAuthenticated(false);
            window.location.href = '/login';
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
