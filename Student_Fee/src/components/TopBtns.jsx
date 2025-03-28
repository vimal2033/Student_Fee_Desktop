import React from 'react'
import { Link } from 'react-router-dom'
const TopBtns = () => {
  return (
    <>
    {/* <!-- creating buttons for add new student, record payment, generate receipt and search student --> */}
    <div className="grid grid-cols-4 gap-4 mb-6">
      
            <Link to="/" exact="true" className="!rounded-button flex items-center justify-center px-4 py-3 bg-black cursor-pointer text-white font-medium text-sm drop-shadow-xl" >
              <i className="fas fa-money-bill-wave mr-2"></i>
              Payment
            </Link>
            <Link to="/add-student" exact="true" className="!rounded-button flex items-center justify-center px-4 py-3 bg-black cursor-pointer text-white font-medium text-sm drop-shadow-xl" >
              <i className="fas fa-user-plus mr-2"></i>
             <div className="hidden md:block">New Student</div><div className="md:hidden">New</div>
            </Link>
            <Link to="/search-student" className="!rounded-button flex items-center justify-center px-4 py-3 bg-black cursor-pointer text-white font-medium text-sm drop-shadow-xl">
              <i className="fas fa-search mr-2"></i>
              Search
            </Link>
            <Link to="/payment-history" exact="true" className="!rounded-button flex items-center justify-center px-4 py-3 bg-black cursor-pointer text-white font-medium text-sm drop-shadow-xl" >
              <i className="fas fa-receipt mr-2"></i>
              History
            </Link>

          </div>
            {/* <!-- 4 buttons created and div closed --> */}
    
    </>
  )
}

export default TopBtns
