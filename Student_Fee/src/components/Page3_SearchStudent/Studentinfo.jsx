import React from 'react'
import { hidePopup } from '../../global/GlobalFunctions'
import { useMyContext } from '../../global/MyContext';
import { formatCurrency } from '../../global/GlobalFunctions';
const Studentinfo = () => {
const {filteredData,paymentData}=useMyContext();
  return (
    <>
      {/* <div className="bg-white rounded-lg shadow-lg p-6 w-52 text-center">
        <button className="w-full py-2 px-4 bg-green-500 text-white rounded-md" onClick={()=>{showPopup(event)}}>Click</button>
    </div> */}
    
    <div id="overlay" className="fixed top-0 left-0 w-full h-full bg-black/75 z-20 hidden" onClick={()=>{hidePopup()}}></div>
    
    <div id="popup" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 bg-white p-6 rounded-lg shadow-lg w-lg z-30 transition-transform">
        <h3 className="text-lg font-bold mb-4">Student Details</h3>
        <div className="grid grid-cols-3 gap-4 items-center">
            {/* <input type="text" placeholder="Search..." className="col-span-1 border border-gray-300 rounded-md p-2"/> */}
           {/* ************************details************************** */}
           {filteredData.length!==0?<div className="col-span-3 grid grid-cols-2 gap-4 items-center bg-gray-100 p-4 rounded-md ">
                
                
                
                  <div className="col-span-1">
                    <p><strong>ID:</strong> {filteredData[0]['STUDENT ID']}</p>
                    <p><strong>Name:</strong> {filteredData[0].NAME}</p>
                    <p><strong>Number:</strong> {filteredData['MOBILE NO']}</p>
                    <p><strong>Course:</strong>{filteredData[0].COURSE}</p>
                  </div>
                  <div className="col-span-1">
                    <p><strong>University:</strong> {filteredData[0].UNIVERSITY}</p>
                    <p><strong>Total Fee:</strong> {formatCurrency(filteredData[0]['FEE PAID'])}</p>
                    <p><strong>Fee Paid:</strong> {formatCurrency(filteredData[0]['TOTAL FEE'])}</p>
                    <p><strong>Balance:</strong> {formatCurrency(filteredData[0].BALANCE)}</p>
                  </div>
                
            </div>:null}
            {/* *********************************************************** */}
            {/* ************************details************************** */}
            {paymentData.length!==0 && (() => {
                const filterPayment = (filteredData.length!==0) 
                    ? paymentData.filter((item) => filteredData[0]['STUDENT ID'] === item.STUDENT_ID) 
                    : [];
                return (
                    <div className="col-span-3 grid grid-cols-2 gap-2 items-center bg-gray-100 p-4 rounded-md ">
                        <div className="text-center"><p><strong>Date</strong> </p></div>
                        <div className="text-center"><p><strong>Amount</strong></p></div>
                        {filterPayment.map((item,index) => (
                          <React.Fragment key={`${item.STUDENT_ID}-${index}`}>
                            <div className="text-center"><p>{new Date(item.DATE).toLocaleDateString('en-GB')}</p></div>
                            <div className="text-center"><p>{formatCurrency(item.FEE_RECIVED)}0</p></div>
                          </React.Fragment>
                        ))}
                    </div>
                );
            })()}
        </div>
        <button className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-md" onClick={()=>{hidePopup()}}>Close</button>
    </div>

    </>
  )
}

export default Studentinfo
