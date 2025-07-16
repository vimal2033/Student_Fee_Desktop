import React,{useEffect} from 'react'
import FeeEntryCardDeshboard from './FeeEntryCardDeshboard.jsx'
import StudentDetailsDeshboard from './StudentDetailsDeshboard.jsx'
import { useMyContext } from '../../global/MyContext.jsx'
import profileImg from '/images/corporate-user-icon.png'; //import image


const DashboardFeeEntry = (props) => {
  const {setInput}=useMyContext();
  const profileImgUrl = new URL(profileImg, import.meta.url).href;
  useEffect(() => {
    setInput(prevState => ({ ...prevState, 
        
      Id: "",
     Name: "", 
    ImgLink:profileImgUrl,
   Course: "",
    Phone: "",
    University: "",
    TotalFee: "0",
    FeePaid: "0",
    Balance:"0"
    }));

    props.setTitle("Dashboard"); // Updates title after mount
  }, [props.setTitle]);
  // props.setTitle("Fee Entry");

  return (
   <>
   

             {/* <!-- creating grid for fee entry and payment history -->  */}
            <div className="grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3 gap-6 ">
              {/* <!-- fee entry card --> */}
              <div className=" md:col-span-2">
                {/* Fee Entry Card Component */}
                <FeeEntryCardDeshboard />
              </div>
              {/* <!-- student details card --> */}
              <div className="  md:col-span-1  hidden  sm:block">
                {/* Student Details Card Component */}
                <StudentDetailsDeshboard/>
              </div>
            </div>
             {/* <!-- grid for fee entry and payment history closed -->  */}

            
   </>
  )
}

export default DashboardFeeEntry
