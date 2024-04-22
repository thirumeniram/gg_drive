
import React, { useState } from "react";
import { useAuth } from "../../contextApi/Auth";
import { Link,useNavigate } from "react-router-dom";
import CenteredContainer from "./Container";


export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate ();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <CenteredContainer>
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-center mb-4 text-xl font-semibold">Profile</h2>
      {error && <div className="text-red-500">{error}</div>}
      <p className="mb-4"><strong>Email:</strong> {currentUser.email}</p>
      <Link
        to="/update-profile"
        className="block bg-blue-500 text-white rounded-lg px-4 py-2 text-center"
      >
        Update Profile
      </Link>
      <div className="text-center mt-4">
        <button
          className="text-blue-500 underline"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
    </CenteredContainer>
  );
}
