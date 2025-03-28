  //get data from server
  async function get_student_data() {
    const url = "https://script.google.com/macros/s/AKfycbxpzloOf5uY3hrlCiCqFo-OdqwlEDuRzUGYjHQcsJEYhSoa-JPct9voSW8Igjte07a7Kw/exec";
  
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      console.log("GET Response:", data);
      // document.getElementById("app").textContent = JSON.stringify(data[0].data[0].name);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  //send data to server
  async function send_student_data() {
    const url = "https://script.google.com/macros/s/AKfycbxpzloOf5uY3hrlCiCqFo-OdqwlEDuRzUGYjHQcsJEYhSoa-JPct9voSW8Igjte07a7Kw/exec";
  
    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
                              sheetName: "PassBook", // Change to the sheet name where you want to store data
                              Name: "John Doe",
                              Amount: 500,
                              Date: "2025-03-16"
                            })
      });
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  }

 

  // Get all keys dynamically
const keys = Object.keys(jsonData);