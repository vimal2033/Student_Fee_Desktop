import React,{useEffect,useRef,useState} from 'react'
import { useMyContext } from '../../global/MyContext.jsx';
import profileImg from '/images/corporate-user-icon.png'; //import image

const InputSuggestion = (props) => {
    //values passed by props (label,placeholder,element(Name or Id),width(for input box className ex: w-full))

const [highlightedIndex, setHighlightedIndex] = useState(0);
const inputRef = useRef(null);
const dropdownRef = useRef(null);
const [dropdownVisible, setDropdownVisible] = useState(false);//name dropdown visibility
const {Input, setInput, filteredData} = useMyContext();
const profileImgUrl = new URL(profileImg, import.meta.url).href;

const fillblank=()=>{
    setInput(prevState => ({ ...prevState, 
        
        //Id: "",
      // Name: "", 
      ImgLink:profileImgUrl,
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
      setDropdownVisible(false);
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
     setInput(prevState => ({ ...prevState, Id: filteredData[index]['STUDENT ID'],
                                          ImgLink:filteredData[index].ImageLink,
                                          Name: filteredData[index].NAME, 
                                           Course: filteredData[index].COURSE,
                                           Phone: filteredData[index]['MOBILE NO'],
                                           University: filteredData[index].UNIVERSITY,
                                           TotalFee: filteredData[index]['TOTAL FEE'],
                                           FeePaid: filteredData[index]['FEE PAID'],
                                          Balance:filteredData[index].BALANCE
                                          }));
                                          
   }}
   useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  //hide dropdown on cliking outside ofinput box and dropdown
const handleClickOutside = (event) => {
    if (
      inputRef.current && !inputRef.current.contains(event.target) &&
      dropdownRef.current && !dropdownRef.current.contains(event.target) 
    ) {
     setDropdownVisible(false);
    }
  };

  const handleOnChange = (e) => {
    if (props.element === "Name") {
      setInput(prevState => ({...prevState,Name: e.target.value }));

    } else if (props.element === "Id") {
      setInput(prevState => ({...prevState,Id: e.target.value }));
    }
    if(e.target.value!=="")setDropdownVisible(true);else setDropdownVisible(false);
    fillblank(); 
    setHighlightedIndex(0);

   
  }
  return (
    <>
      <div className="relative">
  <label className="block text-sm font-medium text-gray-500 mb-1">{props.label}</label>
  <input type="text" value={(props.element==="Name")?Input.Name:( (props.element==="Id")?Input.Id:"")} 
    className={`!rounded-button ${props.width} border-gray-300 border p-2 drop-shadow-sm`}
    placeholder={props.placeholder} 
    onChange={(e)=>{handleOnChange(e);}} // Reset highlight to the first item while typing 
    onKeyDown={(e)=>{handleKeyDown(e); if(e.target.value===""){fillblank();}}}
    ref={inputRef}
    />
  {/* //dropdown for name input box */}
  {dropdownVisible &&(
  <div className={`!rounded-button border border-gray-300 absolute top-full left-0 ${props.width} bg-white z-50 text-gray-700 mb-1 drop-shadow-md`}
  ref={dropdownRef}
  >
     {/* Display filtered data search by name */}
      {filteredData.length > 0 ? (
        <ul >
          {filteredData.slice(0, 5).map((item, index) => (
            <li className={`cursor-pointer p-2 ${index === highlightedIndex ? 'bg-indigo-50' : ''}`} 
            key={index}
            onClick={(e)=>{
            setDropdownVisible(false);
           autofill(index);
          } }
            onMouseEnter={() => setHighlightedIndex(index)}>{item.NAME} - {item['STUDENT ID']}</li>
          ))}
        </ul>) : ( <div className="alert-container">
      <p className="p-2 alert-message">
      <i className="fas fa-exclamation-circle text-red-600 text-xl"/> No data found for the name: {Input.Name}
      </p>
    </div>)}
  
</div>)}
</div>
    </>
  )
}

export default InputSuggestion
