import React from "react";
import Signup from "./components/Auth/SignUp";
import { AuthProvider } from "./contextApi/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Auth/userProfile";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ForgotPassword from "./components/Auth/Password";
import UpdateProfile from "./components/Auth/Profile";
import Dashboard from "./components/google_drive/DashBoard"

function App() {
  return (
   
        <Router>
          <AuthProvider>
            <Routes>
              
              <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
             
              
              {/* {Profile} */}

              <Route path="/user" element={<PrivateRoute><Profile/></PrivateRoute>} />
              <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
              {/* {Auth} */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
    
  );
}

export default App;
