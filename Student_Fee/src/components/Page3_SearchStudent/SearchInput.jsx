import React from 'react'
import { useMyContext } from '../../global/MyContext.jsx';
import {tableHeaders} from '../../global/GlobalFunctions.jsx';
const SearchInput = (props) => {
    //values passed by props (placeholder,element(Name or Id),width(for input box className ex: w-full))

const {Input, setInput, filteredData} = useMyContext();

const fillblank=()=>{
    setInput(prevState => ({ ...prevState, 
        
        //Id: "",
      // Name: "", 
     Course: "",
      
      Phone: "",
      University: "",
      TotalFee: "0",
      FeePaid: "0",
      Balance:"0"
      }));
      if (props.element === "Name") {
        setInput(prevState => ({ ...prevState,Id: ""  }));
      } else if (props.element === "Id") {
        setInput(prevState => ({ ...prevState,Name: ""  }));
      }
}
//select first list item on enter
const handleKeyDown = (e) => {
  
    if (e.key === 'Enter' && filteredData.length > 0) {
      e.preventDefault();
      
      if (props.element === "Name") {
        if(Input.Name!==""){ autofill(0);}
      } else if (props.element === "Id") {
        if(Input.Id!==""){ autofill(0);}
      }
    }
  };
//autofill input boxes
const autofill=(index)=>{
    if (filteredData.length > 0) {
     setInput(prevState => ({ ...prevState, Id: filteredData[index][tableHeaders.headerId],
                                          Name: filteredData[index][tableHeaders.headerName], 
                                           Course: filteredData[index][tableHeaders.headerCourse],
                                           Phone: filteredData[index][tableHeaders.headerPhone],
                                           University: filteredData[index][tableHeaders.headerUniversity],
                                           TotalFee: filteredData[index][tableHeaders.headerTotalFee],
                                           FeePaid: filteredData[index][tableHeaders.headerFeePaid],
                                          Balance:filteredData[index][tableHeaders.headerBalance]
                                          }));
                                          
   }}
   

  const handleOnChange = (e) => {
    if (props.element === "Name") {
      setInput(prevState => ({...prevState,Name: e.target.value }));

    } else if (props.element === "Id") {
      setInput(prevState => ({...prevState,Id: e.target.value }));
    }
    fillblank(); 
   

   
  }
  return (
    <>
      <div>
  <input type="text" value={(props.element==="Name")?Input.Name:( (props.element==="Id")?Input.Id:"")} 
    className={`!rounded-button ${props.width} border-gray-300 border p-2 drop-shadow-sm`}
    placeholder={props.placeholder} 
    onChange={(e)=>{handleOnChange(e);}} // Reset highlight to the first item while typing 
    onKeyDown={(e)=>{handleKeyDown(e); if(e.target.value===""){fillblank();}}}
    />
  {/* //dropdown for name input box */}
  
  
</div>
    </>
  )
}

export default SearchInput
