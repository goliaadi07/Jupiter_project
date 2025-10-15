// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   // ✅ Email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       setMessage("⚠️ Email is required");
//       return;
//     }

//     if (!emailRegex.test(email)) {
//       setMessage("⚠️ Please enter a valid email address (e.g. user@example.com)");
//       return;
//     }

//     // ✅ Simulate backend call
//     setTimeout(() => {
//       setMessage("OTP sent to your email!");
//     }, 1000);

//     // Later you can integrate your backend endpoint:
//     // await api.post("/auth/forgot-password", { email });
//   };

//   return (
//     <div className="container">
//       <div className="login-box">
//         <div className="logo-container">
//           <img src="/vite.svg" alt="App Logo" className="app-logo" />
//           <h1 className="logo-text">JupIter</h1>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="email"
//             placeholder="Enter your registered email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <button type="submit">Get OTP</button>

//           {message && (
//             <div className="message" style={{ marginTop: "10px" }}>
//               {message}
//             </div>
//           )}
//         </form>

//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>

//         <p className="forgot">
//           <Link to="/" style={{ color: "#3f943fff", textDecoration: "none" }}>
//             ← Back to Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!email.trim()) {
//       setMessage("⚠️ Email is required");
//       return;
//     }
//     if (!emailRegex.test(email)) {
//       setMessage("⚠️ Enter a valid email (e.g. user@example.com)");
//       return;
//     }

//     try {
//       await api.post("/auth/forgot-password", { email });

//       // Temporary simulation for UI feedback
//       setMessage("✅ Reset link sent to your email!");
//       setTimeout(() => {
//         navigate("/reset-password?token=dummytoken123"); // simulate email link click
//       }, 2000);
//     } catch (err) {
//       setMessage("❌ Failed to send reset link. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-box">
//         <div className="logo-container">
//           <img src="/vite.svg" alt="App Logo" className="app-logo" />
//           <h1 className="logo-text">JupIter</h1>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your registered email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button type="submit">Send Reset Link</button>

//           {message && (
//             <div
//               className="message"
//               style={{
//                 marginTop: "10px",
//                 fontSize: "14px",
//                 color: message.includes("✅") ? "green" : "red",
//                 transition: "0.3s",
//               }}
//             >
//               {message}
//             </div>
//           )}
//         </form>

//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>

//         <p className="forgot">
//           <Link to="/" style={{ color: "#48854f", textDecoration: "none" }}>
//             ← Back to Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "./api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSent(false);

    if (!email.trim()) {
      setMessage("⚠️ Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setMessage("⚠️ Enter a valid email (e.g. user@example.com)");
      return;
    }

    try {
      await api.post("/auth/forgot-password", { email });
      setMessage("✅ Password reset link has been sent to your email!");
      setIsSent(true);
    } catch (err) {
      setMessage("❌ Failed to send reset link or Invalid Email. Please try again.");
      setIsSent(false);
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="logo-container">
          <img src="/vite.svg" alt="App Logo" className="app-logo" />
          <h1 className="logo-text">JupIter</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSent} // disable input after sending
          />

          <button type="submit" disabled={isSent}>
            {isSent ? "Link Sent ✓" : "Send Reset Link"}
          </button>

          {message && (
            <div
              className="message"
              style={{
                marginTop: "12px",
                fontSize: "14px",
                color: message.includes("✅") ? "#2e7d32" : "#c62828",
                fontWeight: "500",
                transition: "0.3s ease",
              }}
            >
              {message}
            </div>
          )}
        </form>

        <div className="divider">
          <div className="line"></div>
          <p>OR</p>
          <div className="line"></div>
        </div>

        <p className="forgot">
          <Link to="/" style={{ color: "#48854f", textDecoration: "none" }}>
            ← Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
