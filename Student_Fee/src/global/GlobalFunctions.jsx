//creating global functions to be accessible in all components
//database table headers
export const tableHeaders = {  
                                  Title:"LOGO", //title of the page
                                  headerId:"STUDENT ID", 
                                  headerImg:"IMAGE", 
                                  headerName:"NAME",
                                  headerDate:"DATE", 
                                  headerAmount:"AMOUNT",          
                                  headerCourse:"COURSE", 
                                  headerPhone:"MOBILE NO", 
                                  headerUniversity:"UNIVERSITY", 
                                  headerTotalFee:"TOTAL FEE", 
                                  headerFeePaid:"FEE PAID", 
                                  headerBalance:"BALANCE",
                                  headerAddress:"VILLAGE",
                              paymentId:"STUDENT_ID",
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

  

   //submit payment details (removed async await)
 export const submit_Payment=(id,name,course,fee,date)=>{
  const url = import.meta.env.VITE_API_URL;

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey:import.meta.env.VITE_API_KEY,sheetName: "PassBook",STUDENT_ID:id, STUDENT_NAME: name, COURSE: course,FEE_RECIVED:fee,DATE:date })

  })
  .then(() => {
    console.log("Data sent successfully!");
  })
  .catch(error => {
    console.error("Error:", error);
  });
}
   //submit student details (removed async await)
 export const submit_Student_Details=(name,phone,address,course,university)=>{
  const url =import.meta.env.VITE_API_URL;

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    // eslint-disable-next-line
    body: JSON.stringify({apiKey:import.meta.env.VITE_API_KEY,sheetName: course, [tableHeaders.headerId]: "=LEFT(INDEX(A:A,ROW()-1,1),LEN(INDEX(A:A,ROW()-1,1))-2)&INT(RIGHT(INDEX(A:A,ROW()-1,1),2))+1",
          [tableHeaders.headerName]: name,
          [tableHeaders.headerPhone]:phone,
          [tableHeaders.headerAddress]:`=CONCATENATE("${address}","")`, 
          [tableHeaders.headerCourse]: course,
          [tableHeaders.headerUniversity]:`=CONCATENATE("${university}","")`,
          [tableHeaders.headerFeePaid]:"=SUMIF(PassBook!A:A,INDEX(A:A,ROW()),PassBook!D:D)",
          [tableHeaders.headerBalance]:"=INDEX(I:I,ROW())-INDEX(J:J,ROW())",
          
          [tableHeaders.headerTotalFee]:(course=="DCA" || course=="PGDCA")?"=if(INDEX(H:H,ROW())=\"\",\"\",ifs(INDEX(H:H,ROW())=\"C.V. RAMAN\",13500,INDEX(H:H,ROW())=\"ISBM\",12500))":"",
      })
  })
  .then(() => {
    console.log("Data sent successfully!");
  })
  .catch(error => {
    console.error("Error:", error);
  });
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
