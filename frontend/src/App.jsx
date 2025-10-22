// import { useState } from "react";
// import "./App.css";
// import { Link } from "react-router-dom";


// function App() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (form.username && form.password) {
//       setMessage(`Welcome back, ${form.username}!`);
//     } else {
//       setMessage("Please enter both username and password");
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
//             type="text"
//             name="username"
//             placeholder="Phone number, username or email"
//             value={form.username}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <button type="submit">Log in</button>
//         </form>
//         <div>
//           {message && <div className="message">{message}</div>}
//         </div>
//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>

//         <p className="forgot">Forgotten your password?</p>
//       </div>

//       <div className="signup-box">
//         <p>
//           Don’t have an account? <Link to="/signup" style={{ color: "#48854f", fontWeight: "600" }}>
//     Sign Up
//   </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;





// import { useState } from "react";
// import "./App.css";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";

// function App() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // ✅ Login API call
//       const res = await api.post("/auth/login", form);
//       localStorage.setItem("token", res.data); // ✅ save JWT
//       setMessage("Login successful! Redirecting...");
//       setTimeout(() => navigate("/home"), 1000);
//     } catch (err) {
//       setMessage("Invalid username or password");
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
//             type="text"
//             name="username"
//             placeholder="Phone number, username or email"
//             value={form.username}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <button type="submit">Log in</button>
//         </form>

//         {message && <div className="message">{message}</div>}

//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>

//         <p className="forgot">Forgotten your password?</p>
//       </div>

//       <div className="signup-box">
//         <p>
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             style={{ color: "#48854f", fontWeight: "600" }}
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
// import "./App.css";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";
// import { Eye, EyeOff } from "lucide-react"; 


// export default function App() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false); 


//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", form);
//       localStorage.setItem("token", res.data);
//       setMessage("Login successful!");
//       setTimeout(() => navigate("/home"), 1000);
//     } catch (err) {
//       setMessage("Invalid username or password");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-box">
//         <div className="logo-container">
//           <img src="/vite.svg" alt="App Logo" className="app-logo" />
//           <h1 className="logo-text">JupIter</h1>
// <span className="inline-block mt-2 text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-blue-500 shadow-lg">
//    ⚡ AI Adoption Analyzer ⚡
//   </span>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="username or email"
//             value={form.username}
//             onChange={handleChange}
//             required
//           />
          
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
          
//           <button type="submit">Log in</button>
//         </form>

//         {message && <div className="message">{message}</div>}

//         <div className="divider">
//           <div className="line"></div>
//           <p>OR</p>
//           <div className="line"></div>
//         </div>

//         <Link
//             className="forgot"
//             to="/forgotpassword"
//             style={{ color: "#48854f", fontWeight: "600" }}
//           >
//             Forgotten your password?
//           </Link>
//       </div>

//       <div className="signup-box">
//         <p>
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             style={{ color: "#48854f", fontWeight: "600" }}
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//       <footer className="footer">
//         <p>Built with ❤️ by Aditya Ashok Goli</p>
//       </footer>
//     </div>
//   );
// }


// import { useState } from "react";
// import "./App.css";
// import { Link, useNavigate } from "react-router-dom";
// import api from "./api/axios";
// import { Eye, EyeOff } from "lucide-react";

// export default function App() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", form);
//       localStorage.setItem("token", res.data);
//       setMessage("Login successful!");
//       setTimeout(() => navigate("/home"), 1000);
//     } catch (err) {
//       setMessage("Invalid username or password");
//     }
//   };

//   return (
    
//     <div className="app-bg">
//       <div className="container">
//         <div className="login-box">
//           <div className="logo-container">
//             <img src="/vite.svg" alt="App Logo" className="app-logo" />
//             <h1 className="logo-text">JupIter</h1>
//             <span className="inline-block mt-2 text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-blue-500 shadow-lg">
//               ⚡ AI Adoption Analyzer ⚡
//             </span>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="username"
//               placeholder="username or email"
//               value={form.username}
//               onChange={handleChange}
//               required
//             />

//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />

//             <button type="submit">Log in</button>
//           </form>

//           {message && <div className="message">{message}</div>}

//           <div className="divider">
//             <div className="line"></div>
//             <p>OR</p>
//             <div className="line"></div>
//           </div>

//           <Link
//             className="forgot"
//             to="/forgotpassword"
//             style={{ color: "#48854f", fontWeight: "600" }}
//           >
//             Forgotten your password?
//           </Link>
//         </div>

//         <div className="signup-box">
//           <p>
//             Don’t have an account?{" "}
//             <Link to="/signup" style={{ color: "#48854f", fontWeight: "600" }}>
//               Sign Up
//             </Link>
//           </p>
//         </div>

//         <footer className="footer">
//           <p>Built with ❤️ by Aditya Ashok Goli</p>
//         </footer>
//         <div className="deer-container">
//   <img src="/deer-svgrepo-com.svg" alt="Deer walking" className="deer" /> </div>
//       </div>
//     </div>
    
//   );
// }


import { useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import api from "./api/axios";
import { Eye, EyeOff } from "lucide-react";

export default function App() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data);
      setMessage("Login successful!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      setMessage("Invalid username or password");
    }
  };

  return (
    <div className="app-bg">
      <div className="container">
        <div className="login-box">
          <div className="logo-container">
            <img src="/vite.svg" alt="App Logo" className="app-logo" />
            <h1 className="logo-text">JupIter</h1>
            <span className="inline-block mt-2 text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-blue-500 shadow-lg">
              ⚡ AI Adoption Analyzer ⚡
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="username or email"
              value={form.username}
              onChange={handleChange}
              required
            />

            {/* ==== Password field with eye toggle ==== */}
<div style={{ position: "relative", display: "flex", alignItems: "center" }}>
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    required
    style={{
      flex: 1,
      borderRadius: "35px",
      border: "1px solid #ccc",
      padding: "10px 40px 10px 10px",
      backgroundColor: "#fff",
      color: "#000",
    }}
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "15px",
      cursor: "pointer",
      color: showPassword ? "#2e7d32" : "#555",
      transition: "color 0.3s ease",
    }}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </span>
</div>


            <button type="submit">Log in</button>
          </form>

          {message && <div className="message">{message}</div>}

          <div className="divider">
            <div className="line"></div>
            <p>OR</p>
            <div className="line"></div>
          </div>

          <Link
            className="forgot"
            to="/forgotpassword"
            style={{ color: "#48854f", fontWeight: "600" }}
          >
            Forgotten your password?
          </Link>
        </div>

        <div className="signup-box">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#48854f", fontWeight: "600" }}>
              Sign Up
            </Link>
          </p>
        </div>

        <footer className="footer">
          <p>Built with ❤️ by Aditya Ashok Goli</p>
        </footer>

        <div className="deer-container">
          <img src="/deer-svgrepo-com.svg" alt="Deer walking" className="deer" />
        </div>
      </div>
    </div>
  );
}

