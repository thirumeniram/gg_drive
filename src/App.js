import React from "react";
import Signup from "./components/Auth/SignUp";
import { AuthProvider } from "./contextApi/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Auth/DashBoard";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ForgotPassword from "./components/Auth/Password";
import UpdateProfile from "./components/Auth/Profile";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full">
        <Router>
          <AuthProvider>
            <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
