import React from 'react'
import { NavLink } from 'react-router-dom'
import SideInfoCards from './SideInfoCards.jsx'
import logo from '/images/icons/icon.svg';  // Import image

const SideNavBar = () => {

  const imageUrl = new URL(logo, import.meta.url).href;

  return (
    <>
     {/* <!-- side nevigation bar --> */}
     <aside className="w-64 bg-white border-r border-gray-200 fixed h-full drop-shadow-lg">
        {/* <!-- main logo --> */}
        <div className="px-6 py-4 border-b border-gray-200 ">
          <span className="flex items-center">
          <img src={imageUrl}  alt="Logo"className="h-8"/>
          <h1 className="text-xl font-semibold text-gray-900 ml-2">LOGO</h1>
          </span>
        </div>
        {/* <!-- side nevigation bar options --> */}
        <nav className="mt-6 px-4 drop-shadow-md">

        <div className="bg-white rounded-lg border border-gray-200 mb-10">
          {/* <NavLink to="/" exact className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-50 ${isActive ? 'text-custom bg-indigo-100' : 'text-gray-600'}`
              }  >
            <i className="fas fa-chart-line w-5 h-5 mr-3"></i>
           
            Dashboard
          </NavLink> */}

          <NavLink to="/" exact="true" className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-50 ${isActive ? 'text-custom bg-indigo-100' : 'text-gray-600'}`
              }>
            <i className="fas fa-money-bill w-5 h-5 mr-3"></i>
            Payment
          </NavLink>

          <NavLink to="/add-student" exact="true" className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-50 ${isActive ? 'text-custom bg-indigo-100' : 'text-gray-600'}`
              }>
            <i className="fas fa-user-graduate w-5 h-5 mr-3"></i>
            New Students
          </NavLink>

          <NavLink to="/search-student" exact="true" className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-50 ${isActive ? 'text-custom bg-indigo-100' : 'text-gray-600'}`
              }>
          <i className="fas fa-search mr-2"></i>
            Search Students
          </NavLink>

          <NavLink to="/payment-history"  exact="true" className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-50 ${isActive ? 'text-custom bg-indigo-100' : 'text-gray-600'}`
              }>
            <i className="fas fa-file-alt w-5 h-5 mr-3"></i>
           Payment HIstory
          </NavLink>
          </div>
          
          <SideInfoCards/>
          
        </nav>
      </aside>
    </>
  )
}

export default SideNavBar
