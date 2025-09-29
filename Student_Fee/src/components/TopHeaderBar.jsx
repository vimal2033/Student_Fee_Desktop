import React,{ useEffect, useState} from 'react'
import { useMyContext } from '../global/MyContext'
import profileImg from '/images/corporate-user-icon.png'; //import image
import YearDropdown from './YearDrop';


const TopHeaderBar = () => {
  const {setLoadingoverlystate,setInput,deshboardTitle,setCurrentSession,currentSession,get_student_data,addAlert,removeAlert,title,logo}=useMyContext();
  const profileImgUrl = new URL(profileImg, import.meta.url).href;
 
const [showYear, setShowYear] = useState(false);

const handleSessionSelect = async (session) => {
  if (session === currentSession) {
    setShowYear(false);
    return; // No change needed
  }
setLoadingoverlystate(true); // Set loading state to true
  setCurrentSession(session); // Update the current session state
  // console.log("Selected session:", currentSession); // Handle the selected session here
  setShowYear(false); // Close the dropdown after selection
  // Handle the selected session here
  // get_student_data();

  setInput(prevState => ({ ...prevState, Id: "",
    Name: "", 
    ImgLink:profileImgUrl,
   Course: "",
    Phone: "",
    University: "",
    TotalFee: "0",
    FeePaid: "0",
    Balance:"0"
    }))
 addAlert("Session changed", "bg-green-500");
  setTimeout(() => { removeAlert(0); }, 5000);
}

useEffect(() => {
  get_student_data();
  setLoadingoverlystate(false); // Set loading state to false after data is fetched
}, [currentSession]);



  return (
    <>

    {/* <!-- header of the web page --> */}
    <header className="bg-white border-b border-gray-200 drop-shadow-md ">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* *************************** */}
            <div className="px-6   block  lg:hidden">
          <span className="flex items-center">
          <img src={logo} alt=" Logo"className="h-8"/>
          <h1 className="text-xl font-semibold text-gray-900 ml-2">{title}</h1>
          
          </span>
        </div>
        {/* //*****************************WILL BE ADDED AGAIN LETER*************** */ }
            {/* ******************************* */}
            {/* <!-- page title  --> */}
            <h1 className="text-xl font-semibold text-gray-900">{deshboardTitle}</h1>
            {/* <!-- user profile --> */}
            <div className="flex items-center">
              <button className="flex items-center text-sm font-medium text-gray-700 drop-shadow-md"
                onClick={() => setShowYear(!showYear)}>   
                {/*  Toggle dropdown visibility */}
                <img src={profileImgUrl}
                  alt="" className="w-8 h-8 rounded-full mr-2 "/>
                <span>{currentSession?currentSession:""}</span>
                <i className="fas fa-chevron-down ml-2 text-gray-400"></i>
              </button>

{/* ************************* */}

<YearDropdown showYearDropdown={showYear} setYerDropdown={setShowYear} onSelect={handleSessionSelect}/>

{/* ******************************* */}

            </div> 
            {/* <!-- user profile div close --> */}
            
          </div>
            {/* <!-- header div close --> */}
        </header>
    </>
  )
}

export default TopHeaderBar
