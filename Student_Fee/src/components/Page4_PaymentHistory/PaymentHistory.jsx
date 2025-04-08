import React,{useState,useEffect} from "react";
import { useMyContext } from "../../global/MyContext.jsx";
import {formatCurrency} from '../../global/GlobalFunctions.jsx';


const PaymentHistory = (props) => {

  useEffect(() => {
  
    props.setTitle("Payment History"); //  Updates title after mount
  }, [props.setTitle]);

  
const {paymentData} = useMyContext();
const [sortOrder, setSortOrder] = useState('newest');

const handleSortChange = (event) => {
  setSortOrder(event.target.value);
};
const sortedData = sortOrder === 'newest' ? paymentData.slice().reverse() : paymentData;

  return (
    <>
     {/* //heading and sort ,flter options */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Payment History
            </h2>
            <div className="flex space-x-2">
              {/* <button className="!rounded-button px-3 py-1 text-sm border border-gray-300 bg-white text-gray-700">
                <i className="fas fa-filter mr-2"></i>
                Filter
              </button> */}
              <div >
        <label htmlFor="sortOrder" className=" text-sm text-gray-700 mr-2">Sort by </label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange} 
        className="p-2  text-sm text-gray-700 border border-gray-300 bg-white rounded ">
          <option value="newest">New</option>
          <option value="oldest">Old</option>
        </select>
      </div>


            </div>
          </div>
          <div className="overflow-x-auto  overflow-y-auto max-h-[80vh]">
            <table className="min-w-full divide-y divide-gray-200">
              {/* ****************** */}
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Student Id
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Student Name
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                     Course
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              {/* ********************* */}
              <tbody className="bg-white divide-y divide-gray-200">
               
                {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
                <tr key={index}>
                  <td className="px-3 py-4 text-sm text-gray-900">
                    {new Date(item.DATE).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900">
                    {item.STUDENT_ID}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900">
                    {item.STUDENT_NAME}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 hidden sm:table-cell">
                    {item.COURSE}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900">{formatCurrency(item.FEE_RECIVED)}</td>
                </tr>
                  ))
              ):(null)}
               
                
                
                
              </tbody>
            </table>
          </div>
        
      
    </>
  );
};

export default PaymentHistory;
