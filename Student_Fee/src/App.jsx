import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useMyContext } from './global/MyContext.jsx';

import SideNavBar from './components/SideNavBar.jsx';
import TopHeaderBar from './components/TopHeaderBar.jsx';
import TopBtns from './components/TopBtns.jsx';
import DashboardFeeEntry from './components/Page1_deshboard/DashboardFeeEntry.jsx';
import AddStudent from './components/Page2_AddStudent/AddStudent.jsx';
import PaymentHistory from './components/Page4_PaymentHistory/PaymentHistory.jsx';
import SearchStudent from './components/Page3_SearchStudent/SearchStudent.jsx';
import Loadingoverlay from './components/LoadingScreen.jsx';
import LoginSignup  from './components/Authantication_Page/login.jsx';
import PrivateRoute from './global/PrivetRout.jsx';

function App() {
  const { setDeshboardTitle, loadingoverlystate } = useMyContext();

  return (
    <Router>
      {loadingoverlystate && <Loadingoverlay message="Loading, please wait..." />}

      <Routes>
        <Route path="/login" element={<LoginSignup  />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="min-h-screen flex">
                <div className="collapse lg:visible">
                  <SideNavBar />
                </div>
                <div className="flex-1 lg:ml-64">
                  <TopHeaderBar />
                  <main className="p-6">
                    <TopBtns />
                    <Routes>
                      <Route
                        path="/"
                        element={<DashboardFeeEntry setTitle={setDeshboardTitle} />}
                      />
                      <Route
                        path="/add-student"
                        element={<AddStudent setTitle={setDeshboardTitle} />}
                      />
                      <Route
                        path="/payment-history"
                        element={<PaymentHistory setTitle={setDeshboardTitle} />}
                      />
                      <Route
                        path="/search-student"
                        element={<SearchStudent setTitle={setDeshboardTitle} />}
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
