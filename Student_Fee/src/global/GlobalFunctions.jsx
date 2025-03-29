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
    body: JSON.stringify({sheetName: "PassBook",STUDENT_ID:id, STUDENT_NAME: name, COURSE: course,FEE_RECIVED:fee,DATE:date })

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
    body: JSON.stringify({sheetName: course, ['STUDENT ID']: "100", NAME: name,['MOBILE NO']:phone,VILLAGE:`=CONCATENATE("${address}","")`, COURSE: course,UNIVERSITY:university,})
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

