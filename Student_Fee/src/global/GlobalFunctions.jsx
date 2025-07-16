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
                              paymentId:"ID",
                              paymentName:"NAME",
                              paymentCourse:"COURSE",
                              paymentDate:"DATE",
                              paymentFeeRecived:"FEE_RECIVED"

                               
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
  export const submit_Payment = (id, name, course, fee, date,currenturl) => {
    // console.log(currenturl);
    const url = import.meta.env.VITE_API_URL;
    const payload = {
      apiKey: import.meta.env.VITE_API_KEY,
      apidataurl: currenturl,
      sheetName: "PassBook",
      [tableHeaders.paymentId]: id,
      [tableHeaders.paymentName]: name,
      [tableHeaders.paymentCourse]: course,
      [tableHeaders.paymentFeeRecived]: fee,
      DATE: date,
    };
  
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify(payload),
    });
  
    // No .then/.catch because you won't get a visible response in no-cors mode.
    // console.log("Payment submission triggered (no-cors).");
  };
  
  //submit student details with try-catch and response handling
  export const submit_Student_Details = async (name, phone, address, course, university) => {
    const url = import.meta.env.VITE_API_STUDENTURL + "/createStudentProfile";
    console.log("Submitting student details to:", url);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": import.meta.env.VITE_API_admintoken
        },
        body: JSON.stringify({
         
          
          [tableHeaders.headerName]: name,
          [tableHeaders.headerPhone]: phone,
          [tableHeaders.headerEmail]: "abc@gmail.com", //**** to be MODIFIED
          [tableHeaders.headerAddress]: address,
          [tableHeaders.headerCourse]: course,
          [tableHeaders.headerId]: "TCAD001", //****  TO BE MODIFIED
          [tableHeaders.headerImg]: "https://example.com/image.jpg", //****  TO BE MODIFIED
          [tableHeaders.headerTotalFee]: "10000", //****  TO BE MODIFIED
          // [tableHeaders.headerFeeStatus]:"unpaid", //will set by default automatically in backend
          [tableHeaders.headerAdmissionDate]: setToday(), //****  TO BE MODIFIED for past date
          [tableHeaders.headerUniversity]: university,
          [tableHeaders.headerCourseDuration]: "6 Months", //****  TO BE MODIFIED
          [tableHeaders.headerFeePaid]: "2000", //****  TO BE MODIFIED
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
      console.log("Response:", data);
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
