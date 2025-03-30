//creating global functions to be accessible in all components


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
    body: JSON.stringify({apiKey:import.meta.env.VITE_API_KEY,sheetName: course, ['STUDENT ID']: "=LEFT(INDEX(A:A,ROW()-1,1),LEN(INDEX(A:A,ROW()-1,1))-2)&INT(RIGHT(INDEX(A:A,ROW()-1,1),2))+1",
          NAME: name,
          ['MOBILE NO']:phone,
          VILLAGE:`=CONCATENATE("${address}","")`, 
          COURSE: course,
          UNIVERSITY:`=CONCATENATE("${university}","")`,
          ['FEE PAID']:"=SUMIF(PassBook!A:A,INDEX(DCA!A:A,ROW()),PassBook!D:D)",
          BALANCE:"=INDEX(I:I,ROW())-INDEX(J:J,ROW())",
          
          ['TOTAL FEE']:(course=="DCA" || course=="PGDCA")?"=if(INDEX(H:H,ROW())=\"\",\"\",ifs(INDEX(H:H,ROW())=\"C.V. RAMAN\",13500,INDEX(H:H,ROW())=\"ISBM\",12500))":"",
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

