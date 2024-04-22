
import React, { useRef, useState } from "react";
import { useAuth } from "../../contextApi/Auth";
import { Link,useNavigate } from "react-router-dom";
import CenteredContainer from "./Container";


export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
  
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (err) {
        setError("Failed to create an account: " + err.message);
        console.log(err);
    }
  
    setLoading(false);
  }
  

  return (
    <CenteredContainer>
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-center mb-4 text-xl font-semibold">Sign Up</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password-confirm">Password Confirmation</label>
          <input
            type="password"
            id="password-confirm"
            ref={passwordConfirmRef}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white rounded-lg px-4 py-2"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <div className="text-center mt-2">
        Already have an account? <Link to="/login" className="text-blue-500">Log In</Link>
      </div>
    </div>
    </CenteredContainer>
  );
}
