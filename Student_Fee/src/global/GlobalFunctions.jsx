//creating global functions to be accessible in all components
//database table headers
export const tableHeaders = {  
                                  Title:"Title", //title of the page
                                  //student routs fields
                                  headerId:"studentRollNo", 
                                  headerImg:"studentImage", 
                                  headerName:"studentName",
                                  headerDate:"DATE", 
                                  headerAmount:"FEE PAID",          
                                  headerCourse:"studentClass", 
                                  headerPhone:"studentphone", 
                                  headerUniversity:"studentUniversity", 
                                  headerTotalFee:"studentFee", 
                                  headerFeePaid:"studentFeePaid", 
                                  headerAddress:"studentAddress",
                                  headerEmail:"studentEmail",
                                  headerFeeStatus:"studentFeeStatus",
                                  headerAdmissionDate:"studentAdmmissionDate",
                                  headerCourseDuration:"studentCourseDuration",
                                  //passbook fields
                              paymentId:"studentRollNo",
                              paymentName:"studentName",
                              paymentCourse:"studentClass",
                              paymentDate:"paymentDate",
                              paymentFeeRecived:"paymentAmount"

                               
                              };

// set default date to today
export const setToday=()=>{
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    // Ensure two digits for month and day
    if (month < 10) { month = '0' + month; }
    if (day < 10) { day = '0' + day; }
    const formattedDate = `${year}-${month}-${day}`; // Use YYYY-MM-DD format which is default for input type date
    return formattedDate;
  }

  
//sending payment deta
  export const submit_Payment = async (fee, date,stuId,updatedFee) => {

    //sending payment details to backend
    const url = import.meta.env.VITE_API_STUDENTURL + "/createPaymentRecord";
    //for updating payment details in student profile
    const url2 = import.meta.env.VITE_API_STUDENTURL + "/updateStudentProfile/";
    //get auth token from local storage
    const authToken =  localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Authentication error");
      return { data: null, status: "error" };
    }
    const payload = {              ///need to be fixed to send dynamic data
      studentId: stuId,
      [tableHeaders.paymentFeeRecived]: fee,
      paymentMethod: "Online",
      paymentDate: date
    };
      const payload2 = {
           studentFeePaid:updatedFee
      }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(payload),
      });
      //----------- Update student profile with new payment details
      const response2 = await fetch(url2+stuId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify(payload2),
      });
      //-----------

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      console.log({ status: response.status, data });
      return { status: response.status, data };
    } catch (error) {
      console.error("Payment Error:", error);
      return { status: "error", data: error.toString() };
    }
  };

  
  //submit student details for creating new student profile with try-catch and response handling
  export const submit_Student_Details = async (newRollNo,name, phone, address, course, university,addmission,duration,emailvalue) => {
    const url = import.meta.env.VITE_API_STUDENTURL + "/createStudentProfile";
    // console.log("Submitting student details to:", url);
    //get auth token from local storage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Authentication error");
      return { data: null, status: "error" };
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        body: JSON.stringify({
         
          
          [tableHeaders.headerName]: name,
          [tableHeaders.headerPhone]: phone,
          [tableHeaders.headerEmail]: emailvalue, 
          [tableHeaders.headerAddress]: address,
          [tableHeaders.headerCourse]: course,
          [tableHeaders.headerId]: newRollNo, //****  TO BE MODIFIED FOR PREFIX
          // [tableHeaders.headerImg]: "https://example.com/image.jpg", //****  TO BE MODIFIED FEATURE NOT ADDED YET
          [tableHeaders.headerTotalFee]: "10000", //****  TO BE MODIFIED TO SET BY COURSE
          // [tableHeaders.headerFeeStatus]:"unpaid", //will set by default automatically in backend
          [tableHeaders.headerAdmissionDate]: addmission, 
          [tableHeaders.headerUniversity]: university,
          [tableHeaders.headerCourseDuration]: duration, 
          // [tableHeaders.headerFeePaid]: "0", //WILL SET "0" BY DEFAULT IN BACKEND FOR INITIAL PROFILE CREATION
        })
      });

      // Try to parse JSON response, fallback to text if not JSON
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      return {status: response.status, data: data};
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

// Format numbers as currency in INR
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export const showPopup=()=>{
  document.getElementById('popup').classList.add('scale-100');
  document.getElementById('popup').classList.remove('scale-0');
  document.getElementById('overlay').classList.remove('hidden');
}

export const hidePopup=() =>{
  document.getElementById('popup').classList.remove('scale-100');
  document.getElementById('popup').classList.add('scale-0');
  document.getElementById('overlay').classList.add('hidden');
}
