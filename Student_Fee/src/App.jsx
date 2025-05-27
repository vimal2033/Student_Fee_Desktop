
import './App.css';
import { useEffect} from 'react';
import SideNavBar from './components/SideNavBar.jsx';
import TopHeaderBar from './components/TopHeaderBar.jsx';
import TopBtns from './components/TopBtns.jsx';
import DashboardFeeEntry from './components/Page1_deshboard/DashboardFeeEntry.jsx';
import AddStudent from './components/Page2_AddStudent/AddStudent.jsx';
import PaymentHistory from './components/Page4_PaymentHistory/PaymentHistory.jsx';
import SearchStudent from './components/Page3_SearchStudent/SearchStudent.jsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useMyContext } from './global/MyContext.jsx';
import Loadingoverlay from './components/LoadingScreen.jsx';
function App() {
  
  const {setDeshboardTitle,loadingoverlystate}=useMyContext();

  return (
    <>
   
    <Router>
      {loadingoverlystate && <Loadingoverlay message="Loading, please wait..." />}
      {!loadingoverlystate &&
      <div className="min-h-screen flex">
        {/* <div className="collapse lg:visible "> */}
        <div className="collapse lg:visible " >
          {/* <!-- side navigation bar --> */}
          <SideNavBar />
        </div>
      
        <div className="flex-1  lg:ml-64 ">
          {/* <!-- header of the web page --> */}
          <TopHeaderBar />
          

          {/* <!-- main content of the web page -->    */}
          <main className="p-6 ">
            
            {/* <!-- creating buttons for add new student, record payment, generate receipt and search student --> */}
            <TopBtns />
 
              <Routes>
                {/* //adding deshboard component with free entry as default page */}
                <Route path="/" element={<DashboardFeeEntry setTitle={setDeshboardTitle}/>} />
                {/* //adding add new student page  */}
                <Route path="/add-student" element={<AddStudent  setTitle={setDeshboardTitle}/>} />
                {/* //adding Payment history page  */}
                <Route path="/payment-history" element={<PaymentHistory setTitle={setDeshboardTitle}/>} />
                {/* //adding Payment history page  */}
                <Route path="/search-student" element={<SearchStudent setTitle={setDeshboardTitle}/>} />
              </Routes>
              
          </main>
        </div>
      </div>
}
      </Router>
     
    </>
    
  );
}

export default App;
