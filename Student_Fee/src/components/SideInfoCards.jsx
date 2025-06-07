import React from 'react'
import { useMyContext } from '../global/MyContext.jsx'
import  {formatCurrency,tableHeaders}  from '../global/GlobalFunctions.jsx'

const SideInfoCards = () => {
const {StudentData}=useMyContext();
 
const TotalStudentNumber = StudentData?.length;
let TotalFeeReceived = 0;
if (StudentData?.length > 0) {
console.log(StudentData);
  for (let i = 0; i < StudentData.length; i++) {
    TotalFeeReceived =Number(TotalFeeReceived)+ Number(StudentData[i][tableHeaders.headerFeePaid]);
  console.log(StudentData[i][tableHeaders.headerFeePaid]);
  }
} else {
   TotalFeeReceived = 0;
}
let TotalFee = 0;
if (StudentData?.length > 0) {
  for (let i = 0; i < StudentData.length; i++) {
    TotalFee =Number(TotalFee)+ Number(StudentData[i][tableHeaders.headerTotalFee]);
  }
} else {
  TotalFee = 0;
}

let BalanceFee=TotalFee-TotalFeeReceived;



  return (
   <>
   
 {/* <!-- creating cards on top of the page --> */}
 <div className="grid grid-cols-1 gap-6 mb-6 drop-shadow-lg">
 {/* <!-- first card for total students  --> */}
 <div className="bg-white rounded-lg border border-gray-200 p-4">
   <div className="flex items-center">
     <div className="p-3 bg-indigo-50 rounded-lg">
       <i className="fas fa-users text-custom text-xl"></i>
     </div>
     <div className="ml-4">
       <h3 className="text-sm font-medium text-gray-500">
         Total Students
       </h3>
       <p className="text-2xl font-semibold text-gray-900">{TotalStudentNumber}</p>
     </div>
   </div>
 </div>
 {/* <!-- second card for total fee collected --> */}
 <div className="bg-white rounded-lg border border-gray-200 p-4">
   <div className="flex items-center">
     <div className="p-3 bg-red-50 rounded-lg">
       {BalanceFee!==0?<i className="fas fa-exclamation-circle text-red-600 text-xl"></i>:<i className="fas fa-check-circle text-green-600 text-xl"></i>}
     </div>
     <div className="ml-4">
       <h3 className="text-sm font-medium text-gray-500">
         Fee Balance Due
       </h3>
       <p className="text-2xl font-semibold text-gray-900"> {formatCurrency(BalanceFee)}</p>
     </div>
   </div>
 </div>
 {/* <!-- third card for total fee received --> */}
 <div className="bg-white rounded-lg border border-gray-200 p-4">
   <div className="flex items-center">
     <div className="p-3 bg-green-50 rounded-lg">
       <i className="fas fa-check-circle text-green-600 text-xl"></i>
     </div>
     <div className="ml-4">
       <h3 className="text-sm font-medium text-gray-500">
         Total Fee Received
       </h3>
       <p className="text-2xl font-semibold text-gray-900"> {formatCurrency(TotalFeeReceived)}</p>
     </div>
   </div>
 </div>
</div>
{/* <!-- 3 cards created and div closed --> */}
   </>
  )
}

export default SideInfoCards
