import React from 'react'
import { useMyContext } from '../global/MyContext'
import profileImg from '/images/corporate-user-icon.png'; //import image
import logo from '/images/icons/icon.svg';  // Import image

const TopHeaderBar = () => {
  const {deshboardTitle}=useMyContext();
  const profileImgUrl = new URL(profileImg, import.meta.url).href;
  const imageUrl = new URL(logo, import.meta.url).href;

  return (
    <>
    {/* <!-- header of the web page --> */}
    <header className="bg-white border-b border-gray-200 drop-shadow-md ">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* *************************** */}
            <div className="px-6   block  lg:hidden">
          <span className="flex items-center">
          <img src={imageUrl} alt=" Logo"className="h-8"/>
          <h1 className="text-xl font-semibold text-gray-900 ml-2">Logo</h1>
          </span>
        </div>
            {/* ******************************* */}
            {/* <!-- page title  --> */}
            <h1 className="text-xl font-semibold text-gray-900">{deshboardTitle}</h1>
            {/* <!-- user profile --> */}
            <div className="flex items-center">
              <button className="flex items-center text-sm font-medium text-gray-700 drop-shadow-md">
                <img src={profileImgUrl}
                  alt="" className="w-8 h-8 rounded-full mr-2 "/>
                <span>Admin User</span>
                {/* <i className="fas fa-chevron-down ml-2 text-gray-400"></i> */}
              </button>
            </div> 
            {/* <!-- user profile div close --> */}
          </div>
            {/* <!-- header div close --> */}
        </header>
    </>
  )
}

export default TopHeaderBar
