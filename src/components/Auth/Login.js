import React, { useRef, useState } from "react";
import { useAuth } from "../../contextApi/Auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (err) {
        setError("Failed to log in " + err.message);
        console.log(err);
      
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-center mb-4 text-xl font-semibold">Log In</h2>
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
        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white rounded-lg px-4 py-2"
          type="submit"
        >
          Log In
        </button>
      </form>
      <div className="text-center mt-3">
        <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
      </div>
      <div className="text-center mt-2">
        Need an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
      </div>
    </div>
  );
}


// import React, { useRef, useState } from "react";
// import { useAuth } from "../ContextApi/Auth";
// import { Link,useNavigate } from "react-router-dom";


// export default function Login() {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const { login } = useAuth();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const history = useNavigate ();

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       setError("");
//       setLoading(true);
//       await login(emailRef.current.value, passwordRef.current.value);
//       history.push("/");
//     } catch {
//       setError("Failed to log in");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
//       <h2 className="text-center mb-4 text-xl font-semibold">Log In</h2>
//       {error && <div className="text-red-500">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-2" htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             ref={emailRef}
//             className="w-full border rounded-lg px-3 py-2"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2" htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             ref={passwordRef}
//             className="w-full border rounded-lg px-3 py-2"
//             required
//           />
//         </div>
//         <button
//           disabled={loading}
//           className="w-full bg-blue-500 text-white rounded-lg px-4 py-2"
//           type="submit"
//         >
//           Log In
//         </button>
//       </form>
//       <div className="text-center mt-3">
//         <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
//       </div>
//       <div className="text-center mt-2">
//         Need an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
//       </div>
//     </div>
//   );
// }
